'use client';
import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletCardProps {
  balance: number;
  hasSufficientFunds: boolean;
  formatNaira: (n: number) => string;
  onTopUp: () => void;
}

export function WalletCard({ balance, hasSufficientFunds, formatNaira, onTopUp }: WalletCardProps) {
  return (
    <>
      <div className={`w-full rounded-2xl border-2 p-5 flex items-center justify-between
        ${hasSufficientFunds ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-300'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center
            ${hasSufficientFunds ? 'bg-blue-100' : 'bg-red-100'}`}>
            <Wallet className={`w-5 h-5 ${hasSufficientFunds ? 'text-blue-600' : 'text-red-500'}`} />
          </div>
          <span className={`text-sm font-semibold ${hasSufficientFunds ? 'text-blue-700' : 'text-red-600'}`}>
            Wallet Balance
          </span>
        </div>
        <span className={`text-sm font-bold ${hasSufficientFunds ? 'text-blue-700' : 'text-red-600'}`}>
          {formatNaira(balance)}
        </span>
      </div>
      {!hasSufficientFunds && (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-red-500 leading-relaxed">
            Insufficient funds. Please top up your wallet to continue.
          </p>
          <button onClick={onTopUp}
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-3xl transition-colors">
            Top Up
          </button>
        </div>
      )}
    </>
  );
}