'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, Building2, Hash, Copy, Check, X, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type ModalState = 'form' | 'loading' | 'success';

const BANK_DETAILS = {
  bankName: 'Guaranty Trust Bank',
  accountNumber: '0123456789',
  accountName: 'STORLO NIGERIA LIMITED',
  minimumTopUp: '₦1,000',
};

export function TopUpModal({ isOpen, onClose, onSuccess }: TopUpModalProps) {
  const [state, setState] = useState<ModalState>('form');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // countdown timer
  useEffect(() => {
    if (!isOpen || state !== 'form') return;
    setTimeLeft(300);
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, state]);

  // reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setState('form');
        setCopied(false);
        setTimeLeft(300);
      }, 300);
    }
  }, [isOpen]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSentMoney = () => {
    setState('loading');
    // simulate processing
    setTimeout(() => setState('success'), 2500);
  };

  const handleGoBack = () => {
    onSuccess();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={state === 'form' ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl overflow-hidden z-10">

        {/* ── LOADING STATE ──────────────────────────────────────── */}
        {state === 'loading' && (
          <div className="flex flex-col items-center justify-center py-16 px-8 gap-4">
            <Loader2 className="w-10 h-10 text-gray-900 animate-spin" />
            <p className="text-sm font-medium text-gray-700">Processing top up...</p>
          </div>
        )}

        {/* ── SUCCESS STATE ──────────────────────────────────────── */}
        {state === 'success' && (
          <div className="flex flex-col items-center justify-center py-14 px-8 gap-3">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <Check className="w-8 h-8 text-green-600 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Top Up Successful</h3>
            <p className="text-sm text-gray-400 text-center">
              Your top up has been successfully processed.
            </p>
            <button
              onClick={handleGoBack}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-3xl transition-colors"
            >
              Go Back to Checkout
            </button>
          </div>
        )}

        {/* ── FORM STATE ─────────────────────────────────────────── */}
        {state === 'form' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-white border-2 mb-2 border-blue-400 rounded-2xl">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-900">Pay with Bank Transfer</span>
              </div>
              <div className="flex items-center gap-3">
                {/* Placeholder logo */}
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                  <Building2 className="w-5 h-5 text-gray-400" />
                </div>
                {/* <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button> */}
              </div>
            </div>

            {/* Body */}
            <div className="bg-gray-100 px-5 py-5">
              <p className="text-[10px] text-gray-500 mb-1">Please make a transfer to 
                <span className="text-[10px] font-bold text-gray-900 mb-4"> {BANK_DETAILS.accountName}</span></p>

              {/* Details table */}
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                {/* Bank name */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span className="text-xs">Bank Name</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">{BANK_DETAILS.bankName}</span>
                </div>

                {/* Account number */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Hash className="w-4 h-4 shrink-0" />
                    <span className="text-xs">Account Number</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-900 tracking-wider">
                      {BANK_DETAILS.accountNumber}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      {copied
                        ? <Check className="w-4 h-4 text-green-500" />
                        : <Copy className="w-4 h-4" />
                      }
                    </button>
                  </div>
                </div>

                {/* Minimum top up */}
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Hash className="w-4 h-4 shrink-0" />
                    <span className="text-xs">Minimum Top Up</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-900">{BANK_DETAILS.minimumTopUp}</span>
                </div>
              </div>

              {/* Timer */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  This account is valid for{' '}
                  <span className={`font-semibold ${timeLeft < 60 ? 'text-red-400' : 'text-gray-800'}`}>
                    {formatTime(timeLeft)}
                  </span>
                </p>
                {timeLeft === 0 && (
                  <span className="text-xs text-red-500 font-medium">Expired</span>
                )}
              </div>
            </div>

            {/* Footer button */}
            <div className="bg-white px-5 py-4">
              <button
                onClick={handleSentMoney}
                disabled={timeLeft === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-3xl transition-colors"
              >
                I've Sent the Money
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}