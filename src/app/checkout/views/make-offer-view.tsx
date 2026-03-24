'use client';
import React, { useState } from 'react';
import {
  CheckCircle, XCircle, FileText, Calendar,
  ShoppingBag, Hash, User, Phone, Mail, Wallet,
} from 'lucide-react';
import { Product } from '@/app/types';
import { CheckoutProductCard } from '@/app/checkout/components/checkout-product-card';
import { TableRow } from '@/app/checkout/components/table-row';
import { EscrowNotice } from '@/app/checkout/components/escrow-notice';
import { Confetti } from '@/app/checkout/components/confetti';

type OfferState = 'select' | 'sent' | 'accepted' | 'declined' | 'negotiated';

const MOCK_SELLER = { name: 'Emeka Okafor', phone: '+234 801 234 5678', email: 'emeka.okafor@gmail.com' };

function generateOfferPrices(productPrice: number): number[] {
  const prices: number[] = [];
  for (let pct = 0.75; pct >= 0.50; pct -= 0.05) {
    prices.push(Math.round((productPrice * pct) / 1000) * 1000);
  }
  return [...new Set(prices)].filter(p => p > 0);
}

interface MakeOfferViewProps {
  product: Product;
  walletBalance: number;
  formatNaira: (n: number) => string;
  onTopUp: () => void;
}

export function MakeOfferView({ product, walletBalance, formatNaira, onTopUp }: MakeOfferViewProps) {
  const productPrice = Number(product.price.replace(/[₦,]/g, ''));
  const offerPrices = generateOfferPrices(productPrice);

  const [offerState, setOfferState] = useState<OfferState>('select');
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);
  const [pendingPrice, setPendingPrice] = useState<number | null>(null);

  const orderId = `STL-${product.id}-${Date.now().toString().slice(-6)}`;
  const orderDate = new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });
  const negotiatedPrice = selectedOffer ? Math.round(selectedOffer * 1.15 / 1000) * 1000 : 0;

  const handleSelectOffer = (price: number) => {
    setPendingPrice(price);
    setTimeout(() => {
      setSelectedOffer(price);
      setOfferState('sent');
      setPendingPrice(null);
    }, 300);
  };

  const handleViewOrder = () => {
    const outcomes: OfferState[] = ['accepted', 'declined', 'negotiated'];
    setOfferState(outcomes[Math.floor(Math.random() * outcomes.length)]);
  };

  const renderOfferDetailsTable = () => (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <TableRow icon={FileText}    label="Description"  value={product.name} />
      <TableRow icon={Calendar}    label="Date"         value={orderDate} />
      <TableRow icon={ShoppingBag} label="Sale Type"    value="Make Offer" />
      <TableRow icon={Hash}        label="Offer Amount" value={formatNaira(selectedOffer!)} />
      <TableRow icon={User}        label="Seller"       value={MOCK_SELLER.name} />
      <TableRow icon={Hash}        label="Order ID"     value={orderId} isLast />
    </div>
  );

  const renderRefundCard = () => (
    <div className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-500">
        <Hash className="w-4 h-4 shrink-0" />
        <span className="text-sm">Refunded Amount</span>
      </div>
      <span className="text-sm font-bold text-gray-900">{formatNaira(selectedOffer!)}</span>
    </div>
  );

  // ── SELECT ────────────────────────────────────────────────────
  if (offerState === 'select') {
    return (
      <div className="flex flex-col lg:flex-row gap-6">

        {/* LEFT: Offer selection */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-1">Select Your Offer Price</h3>
            <p className="text-xs text-gray-400 mb-4">
              Max offer: {formatNaira(offerPrices[0])} — choose a price to send to the seller.
            </p>
            <div className="flex flex-col gap-3">
              {offerPrices.map(price => {
                const isSelected = pendingPrice === price;
                return (
                  <button
                    key={price}
                    onClick={() => handleSelectOffer(price)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all text-left
                      ${isSelected ? 'border-blue-400 bg-blue-100' : 'border-gray-100 hover:border-blue-300 hover:bg-blue-50'}`}
                  >
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                      ${isSelected ? 'border-blue-400 bg-blue-100' : 'border-gray-300 bg-white'}`}>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-blue-400" />}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{formatNaira(price)}</span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {Math.round((price / productPrice) * 100)}% of listing
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Product Card + Order Summary + Wallet */}
        <div className="flex flex-col gap-4 lg:w-80 xl:w-96">
          <CheckoutProductCard product={product} />

          <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Items</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-900">Total</span>
              <span className="text-sm font-bold text-gray-900">{formatNaira(productPrice)}</span>
            </div>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-semibold text-blue-700">Wallet Balance</span>
              </div>
              <span className="text-sm font-bold text-blue-700">{formatNaira(walletBalance)}</span>
            </div>
          </div>
        </div>

      </div>
    );
  }

  // ── SENT ──────────────────────────────────────────────────────
  if (offerState === 'sent') {
    return (
      <>
        <Confetti />
        <div className="flex flex-col items-center gap-2 text-center pb-2">
          <h2 className="text-2xl font-bold text-gray-900">Offer Sent Successfully!</h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
            Your offer of <span className="font-semibold text-gray-900">{formatNaira(selectedOffer!)}</span>{' '}
            has been sent to <span className="font-semibold text-gray-900">{MOCK_SELLER.name}</span>. We'll let you
            know as soon as the seller, {MOCK_SELLER.name} responds.
          </p>
        </div>
        <CheckoutProductCard product={product} showMeta={false} />
        <EscrowNotice message="Your offer is pending seller response. No funds have been deducted yet." />
        {renderOfferDetailsTable()}
        <button
          onClick={handleViewOrder}
          className="w-full py-3.5 rounded-3xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          View Order
        </button>
      </>
    );
  }

  // ── ACCEPTED ──────────────────────────────────────────────────
  if (offerState === 'accepted') {
    return (
      <>
        <div className="flex flex-col items-center gap-3 pt-4 pb-2">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-9 h-9 text-green-500 stroke-[1.5]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Offer Accepted</h2>
          <p className="text-sm text-gray-500 text-center">
            Your offer of <span className="font-semibold text-gray-900">{formatNaira(selectedOffer!)}</span> has been accepted.
          </p>
        </div>
        <CheckoutProductCard product={product} showMeta={false} />
        <EscrowNotice message="Your payment stays in escrow until the seller confirms dispatch of the item." />
        {renderOfferDetailsTable()}
        <h3 className="font-semibold text-gray-900">Seller Contact Details</h3>
        <EscrowNotice message="The seller's contact details are now available so you can arrange delivery. Funds will only be released after you confirm receipt of item." />
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

  // ── DECLINED ──────────────────────────────────────────────────
  if (offerState === 'declined') {
    return (
      <>
        <div className="flex flex-col items-center gap-3 pt-4 pb-2">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <XCircle className="w-9 h-9 text-red-500 stroke-[1.5]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Offer Declined</h2>
          <p className="text-sm text-gray-500 text-center leading-relaxed max-w-sm">
            Your offer of <span className="font-semibold text-gray-900">{formatNaira(selectedOffer!)}</span> has been declined.
            Any funds held for this offer have been refunded to your wallet.
          </p>
        </div>
        <CheckoutProductCard product={product} showMeta={false} />
        {renderOfferDetailsTable()}
        {renderRefundCard()}
        <button
          onClick={() => { setOfferState('select'); setSelectedOffer(null); }}
          className="w-full py-3.5 rounded-3xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          Make New Offer
        </button>
      </>
    );
  }

  // ── NEGOTIATED ────────────────────────────────────────────────
  if (offerState === 'negotiated') {
    return (
      <>
        <div className="flex flex-col items-center gap-3 pt-4 pb-2">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <XCircle className="w-9 h-9 text-red-500 stroke-[1.5]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Offer Negotiated</h2>
          <p className="text-sm text-gray-500 text-center leading-relaxed max-w-sm">
            Your offer has been negotiated to{' '}
            <span className="font-semibold text-gray-900">{formatNaira(negotiatedPrice)}</span>.
            Any funds held for this offer have been refunded to your wallet.
          </p>
        </div>
        <CheckoutProductCard product={product} showMeta={false} />
        {renderOfferDetailsTable()}
        {renderRefundCard()}
        <div className="flex gap-3">
          <button
            onClick={() => setOfferState('accepted')}
            className="flex-1 py-3 rounded-3xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => { setOfferState('select'); setSelectedOffer(null); }}
            className="flex-1 py-3 rounded-3xl text-sm font-semibold bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
          >
            Negotiate
          </button>
          <button
            onClick={() => setOfferState('declined')}
            className="flex-1 py-3 rounded-3xl text-sm font-semibold bg-white border border-red-500 text-red-500 hover:bg-red-50 transition-colors"
          >
            Reject
          </button>
        </div>
      </>
    );
  }

  return null;
}