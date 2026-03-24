'use client';
import React, { useState } from 'react';
import { CheckCircle, FileText, Calendar, ShoppingBag, Hash, User, Phone, Mail } from 'lucide-react';
import { Product } from '@/app/types';
import { CheckoutProductCard } from '@/app/checkout/components/checkout-product-card';
import { WalletCard } from '@/components/wallet-card';
import { TableRow } from '@/app/checkout/components/table-row';
import { EscrowNotice } from '@/app/checkout/components/escrow-notice';

const MOCK_SELLER = {
  name: 'Emeka Okafor',
  phone: '+234 801 234 5678',
  email: 'emeka.okafor@gmail.com',
};

interface PurchaseViewProps {
  product: Product;
  walletBalance: number;
  formatNaira: (n: number) => string;
  onTopUp: () => void;
}

export function PurchaseView({ product, walletBalance, formatNaira, onTopUp }: PurchaseViewProps) {
  const [confirmed, setConfirmed] = useState(false);
  const productPrice = Number(product.price.replace(/[₦,]/g, ''));
  const hasSufficientFunds = walletBalance >= productPrice;
  const orderId = `STL-${product.id}-${Date.now().toString().slice(-6)}`;
  const orderDate = new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });

  if (confirmed) {
    return (
      <>
        <div className="flex flex-col items-center gap-3 pt-4 pb-2">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-9 h-9 text-green-500 stroke-[1.5]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Order Confirmed</h2>
        </div>

        <CheckoutProductCard product={product} showMeta={false} />

        <EscrowNotice message="Your payment stays in your escrow wallet until the seller accepts your offer and confirms receipt of item." />

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <TableRow icon={FileText}    label="Description" value={product.name} />
          <TableRow icon={Calendar}    label="Date"        value={orderDate} />
          <TableRow icon={ShoppingBag} label="Sale Type"   value="Instant Sale" />
          <TableRow icon={Hash}        label="Amount"      value={formatNaira(productPrice)} />
          <TableRow icon={User}        label="Seller"      value={MOCK_SELLER.name} />
          <TableRow icon={Hash}        label="Order ID"    value={orderId} isLast />
        </div>

        <h3 className="font-semibold text-gray-900">Seller Contact Details</h3>

        <EscrowNotice message="The seller's contact details are now available so you can arrange delivery directly. Funds will only be released after you confirm that you have received the item." />

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <TableRow icon={User}  label="Name"  value={MOCK_SELLER.name} />
          <TableRow icon={Phone} label="Phone" value={MOCK_SELLER.phone} />
          <TableRow icon={Mail}  label="Email" value={MOCK_SELLER.email} isLast />
        </div>

        <button disabled className="w-full py-3.5 rounded-3xl text-sm font-semibold bg-gray-200 text-gray-400 cursor-not-allowed">
          Confirm Item Received
        </button>
      </>
    );
  }

  return (
    <>
      <CheckoutProductCard product={product} />

      <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-sm text-gray-500">Items</span>
          <span className="text-sm font-medium text-gray-900">1</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-sm font-semibold text-gray-900">Total</span>
          <span className="text-sm font-bold text-gray-900">{formatNaira(productPrice)}</span>
        </div>
      </div>

      <WalletCard
        balance={walletBalance}
        hasSufficientFunds={hasSufficientFunds}
        formatNaira={formatNaira}
        onTopUp={onTopUp}
      />

      <button
        disabled={!hasSufficientFunds}
        onClick={() => setConfirmed(true)}
        className={`w-full py-3.5 rounded-3xl text-sm font-semibold transition-colors
          ${hasSufficientFunds ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
      >
        Make Payment
      </button>
    </>
  );
}