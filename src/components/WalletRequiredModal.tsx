'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface WalletRequiredModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function WalletRequiredModal({ isOpen, onClose }: WalletRequiredModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleCreateWallet = () => {
    if (onClose) onClose();
    router.push('/wallets/create');
  };

  const handleExplore = () => {
    if (onClose) onClose();
    // router.push('/app');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      
   
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 z-10">
        
    
        <div className="text-center mb-6">
         
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-blue-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 2H16L22 8V16L16 22H8L2 16V8L8 2M12 9V13M12 17V18" 
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Wallet Required</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            No offers, purchase product, or place bids. Please create your wallet by verifying your BVN. It takes less than a minute.
          </p>
        </div>

     
        <div className="flex flex-col gap-3">
          <button
            onClick={handleCreateWallet}
            className="w-full px-5 py-3 text-white text-center text-sm font-medium bg-blue-600 rounded-3xl hover:bg-blue-700 transition-colors"
          >
            Create Wallet
          </button>
          
          <button
            onClick={handleExplore}
            className="w-full px-5 py-3 text-blue-600 text-center text-sm font-medium bg-white border-2 border-blue-600 rounded-3xl hover:bg-blue-50 transition-colors"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
}
