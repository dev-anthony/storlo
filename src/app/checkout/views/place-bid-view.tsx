'use client';
import React, { useState } from 'react';
import {
  CheckCircle, FileText, Calendar, ShoppingBag,
  Hash, User, Phone, Mail, Wallet,
} from 'lucide-react';
import { Product } from '@/app/types';
import { Input } from '@/components/ui/input';
import { CheckoutProductCard } from '@/app/checkout/components/checkout-product-card';
import { TableRow } from '@/app/checkout/components/table-row';
import { EscrowNotice } from '@/app/checkout/components/escrow-notice';
import { Confetti } from '@/app/checkout/components/confetti';

type BidState = 'bidding' | 'placed' | 'won';

const MOCK_SELLER = { name: 'Emeka Okafor', phone: '+234 801 234 5678', email: 'emeka.okafor@gmail.com' };

interface PlaceBidViewProps {
  product: Product;
  walletBalance: number;
  formatNaira: (n: number) => string;
  onTopUp: () => void;
}

export function PlaceBidView({ product, walletBalance, formatNaira, onTopUp }: PlaceBidViewProps) {
  const productPrice = Number(product.price.replace(/[₦,]/g, ''));
  const startingBid = productPrice;
  const currentHighestBid = Math.round(productPrice * 1.2 / 1000) * 1000;

  const [bidState, setBidState] = useState<BidState>('bidding');
  const [bidInput, setBidInput] = useState('');

  const bidAmount = Number(bidInput.replace(/[^0-9]/g, '')) || 0;
  const isBidValid = bidAmount > currentHighestBid;
  const isSufficient = walletBalance >= bidAmount && bidAmount > 0;
  const canBid = isBidValid && isSufficient;
  const isWinningBid = bidAmount > currentHighestBid * 1.3;

  const orderId = `STL-${product.id}-${Date.now().toString().slice(-6)}`;
  const orderDate = new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' });

  const renderBidDetailsTable = () => (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
      <TableRow icon={FileText}    label="Description" value={product.name} />
      <TableRow icon={Calendar}    label="Date"        value={orderDate} />
      <TableRow icon={ShoppingBag} label="Sale Type"   value="Auction Bid" />
      <TableRow icon={Hash}        label="Your Bid"    value={formatNaira(bidAmount)} />
      <TableRow icon={User}        label="Seller"      value={MOCK_SELLER.name} />
      <TableRow icon={Hash}        label="Order ID"    value={orderId} isLast />
    </div>
  );

  // ── BID PLACED ────────────────────────────────────────────────
  if (bidState === 'placed') {
    return (
      <>
        <div className="flex flex-col items-center gap-3 pt-4 pb-2">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-9 h-9 text-green-500 stroke-[1.5]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Bid Placed Successfully</h2>
          <p className="text-sm text-gray-500 text-center">
            Your bid of <span className="font-semibold text-gray-900">{formatNaira(bidAmount)}</span> has been placed.
          </p>
        </div>
        <CheckoutProductCard product={product} showMeta={false} />
        <EscrowNotice message="Your bid has been placed. You'll be notified if you win the auction." />
        {renderBidDetailsTable()}
        <button
          onClick={() => { setBidState('bidding'); setBidInput(''); }}
          className="w-full py-3.5 rounded-3xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          Place Another Bid
        </button>
      </>
    );
  }

  // ── AUCTION WON ───────────────────────────────────────────────
  if (bidState === 'won') {
    return (
      <>
        <Confetti />
        <div className="flex flex-col items-center gap-3 text-center pb-2">
          <div className="text-5xl">🏆</div>
          <h2 className="text-2xl font-bold text-gray-900">You Won the Auction!</h2>
          <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
            Your bid of <span className="font-semibold text-gray-900">{formatNaira(bidAmount)}</span> was the highest bid.
          </p>
        </div>
        <CheckoutProductCard product={product} showMeta={false} />
        <EscrowNotice message="Congratulations! Your payment stays in escrow until the seller confirms dispatch of the item." />
        {renderBidDetailsTable()}
        <h3 className="font-semibold text-gray-900">Seller Contact Details</h3>
        <EscrowNotice message="The seller's contact details are now available so you can arrange delivery. Funds will only be released after you confirm receipt." />
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

  // ── BIDDING (main) ────────────────────────────────────────────
  return (
    <div className="flex flex-col lg:flex-row gap-6">

      {/* LEFT: Bid input + action */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-4">
          <h3 className="font-semibold text-gray-900">Place Your Bid</h3>

          <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">Starting Bid</span>
              <span className="text-sm font-semibold text-gray-900">{formatNaira(startingBid)}</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-gray-500">Current Highest Bid</span>
              <span className="text-sm font-bold text-blue-600">{formatNaira(currentHighestBid)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Enter Your Bid</label>
            <Input
              value={bidInput}
              onChange={e => setBidInput(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder={`e.g. ${formatNaira(currentHighestBid + 1000)}`}
              className="bg-gray-100 border-2 border-transparent rounded-2xl focus-visible:border-gray-900 focus-visible:ring-0 shadow-none h-auto py-2.5"
            />
            <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
              ℹ Bid must be higher than {formatNaira(currentHighestBid)}
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-gray-500">Your Bid</span>
            <span className="text-sm font-semibold text-gray-900">
              {bidAmount > 0 ? formatNaira(bidAmount) : '—'}
            </span>
          </div>
        </div>

        {bidAmount > 0 && !isSufficient && (
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-red-500">Insufficient funds.</p>
            <button onClick={onTopUp} className="text-xs text-blue-600 font-semibold hover:underline">
              Top Up
            </button>
          </div>
        )}

        <button
          onClick={() => canBid && setBidState(isWinningBid ? 'won' : 'placed')}
          disabled={!canBid}
          className={`w-full py-3.5 rounded-3xl text-sm font-semibold transition-colors
            ${canBid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          Place Bid
        </button>
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
          <div className={`flex items-center justify-between pt-3`}>
            <div className="flex items-center gap-2">
              <Wallet className={`w-4 h-4 ${bidAmount > 0 && !isSufficient ? 'text-red-400' : 'text-blue-500'}`} />
              <span className={`text-sm font-semibold ${bidAmount > 0 && !isSufficient ? 'text-red-600' : 'text-blue-700'}`}>
                Wallet Balance
              </span>
            </div>
            <span className={`text-sm font-bold ${bidAmount > 0 && !isSufficient ? 'text-red-600' : 'text-blue-700'}`}>
              {formatNaira(walletBalance)}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}