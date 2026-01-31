'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SuccessWalletModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function SuccessWalletModal({ isOpen, onClose }: SuccessWalletModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleExplore = () => {
    if (onClose) onClose();
    // router.push('/app');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
     
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
    
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 z-10">
        
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Wallet created successfully</h2>
          <p className="text-gray-600 text-sm">Your <span className="font-semibold text-black">Sterlo wallet</span> is now ready</p>
        </div>

       
        <div className="px-4 py-3 mb-6 flex flex-col gap-3 bg-blue-100 border-2 border-blue-700 rounded-2xl">
          <p className="text-sm font-medium text-blue-700">You can now:</p>
          <ul className="list-disc list-inside pl-2 text-sm text-blue-700 space-y-1">
            <li>Buy products</li>
            <li>Make offers</li>
            <li>Place bids</li>
            <li>Receive refunds and payouts</li>
          </ul>
        </div>
        <button
          onClick={handleExplore}
          className="w-full px-5 py-3 text-white text-center text-sm font-medium bg-blue-600 rounded-3xl hover:bg-blue-700 transition-colors"
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
}
