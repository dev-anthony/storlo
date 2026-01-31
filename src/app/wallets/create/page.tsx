'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CreateWalletFormData {
  code: string;
}

export default function Create() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<CreateWalletFormData>({ code: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateBVN = (bvn: string): boolean => {
    if (!bvn || bvn.length !== 11) {
      setError('BVN must be 11 digits');
      return false;
    }
    if (!/^\d+$/.test(bvn)) {
      setError('BVN must contain only numbers');
      return false;
    }
    return true;
  };


  const createWallet = async (bvn: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError('');

      const response = await new Promise<{ success: boolean; walletId: string; message: string }>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.05) {
            resolve({
              success: true,
              walletId: `WALLET_${Date.now()}`,
              message: 'Wallet created successfully'
            });
          } else {
            reject(new Error('Failed to create wallet. Please try again.'));
          }
        }, 1500);
      });

      if (response.success) {
        setSuccess(true);

        localStorage.setItem('walletId', response.walletId);
        
        setTimeout(() => {
          router.push('/wallets/prompt');
        }, 1500);
        return true;
      }
      return false;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateBVN(formData.code)) {
      return;
    }

    await createWallet(formData.code);
  };

  const handleSkip = () => {
    router.push('/app');
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-full md:w-1/2 flex  justify-center p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between gap-2">
            <Image
              src="/vector1.png"
              alt="Storlo"
              width={100}
              height={50}
              priority
            />
          </div>

        <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Storlo Wallet</h1>
        <p className="text-gray-600 leading-relaxed text-sm">
            Your wallet lets you buy products, make offers, and place bids.
        </p>
        </div>
        <div className="px-4 py-2 mb-8 flex flex-col gap-3 bg-blue-100 border-2 border-blue-700 rounded-2xl ">
            <p className="text-sm text-blue-600 leading-6">
                We use your BVN to create and secure your Sterolo wallet. <br></br>
                Your BVN helps us :
               
            </p>
             <ul className="list-disc list-inside pl-5 text-sm text-blue-600">
                <li>Verify your identity</li>
                <li>Prevent fraud and fake accounts</li>
                <li>Ensure secure payments and refunds</li>
                <li>Comply with financial regulations</li>
                </ul>
        </div>
        <form onSubmit={handleSubmit} action="">
               <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                BVN <span className='text-gray-500 test-xs'>(11-digit BVN)</span>
              </label>
              <input
                ref={inputRef}
                id="code"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder=""
                maxLength={11}
                inputMode="numeric"
                disabled={isLoading || success}
                required
                className={`w-full px-3 py-2 text-center text-2xl bg-gray-100  border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  error ? 'border-red-500' : 'border-gray-300'
                } ${isLoading || success ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && <p className="text-green-500 text-sm mt-2">Wallet created successfully! Redirecting...</p>}
            </div>
        </form>
          
        <div className='flex flex-col mt-4 gap-4'>
            
            <button 
              type="submit" 
              onClick={(e) => {
                const form = (e.currentTarget as HTMLElement).closest('form');
                if (form) form.dispatchEvent(new Event('submit', { bubbles: true }));
              }}
              disabled={isLoading || success}
              className='w-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 text-white text-center text-sm bg-blue-600 rounded-3xl transition-all'
            >
              {isLoading ? 'Creating Wallet...' : success ? 'Wallet Created!' : 'Create Wallet'}
            </button>

            <button 
              type="button"
              onClick={handleSkip}
              disabled={isLoading || success}
              className='w-full disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 text-blue-600 text-center border border-blue-600 text-sm bg-white rounded-3xl transition-all hover:bg-blue-50'
            >
            Skip For Now
            </button>
        </div>
        </div>
      </div>

   
        <div className="relative hidden rounded-3xl md:flex md:w-1/2 bg-blue-600 items-center justify-center overflow-hidden">
            <div className="relative w-full h-full max-w-2xl">
                <Image
                src="/hero.png"
                alt="Shopping Experience"
                fill
                priority
                className="object-cover object-[20%_center] scale-x-[-1] rounded-2xl"
                />
            </div>
        </div>
    </div>
  );
}
