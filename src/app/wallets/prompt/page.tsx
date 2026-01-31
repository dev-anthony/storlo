'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { error } from 'console';

interface VerifyEmailFormData {
  code: string;
}

export default function Promt() {
  const router = useRouter();

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

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Created Successfully</h1>
            <p className="text-gray-600 leading-relaxed text-sm">
           <span className="font-semibold text-sm"> Welcome to Storlo. Your account is ready!.</span> <br></br>
                To buy products, make offers, and place bids, you'll need a Storlo wallet. Creating your wallet takes less than a minute.
            </p>
          </div>

        
        
          
            <div className='flex flex-col gap-4'>
             
              <button onClick={() => router.push('/wallets/create')} className='w-full hover:bg-blue-800 px-5 py-3 text-white text-center text-sm bg-blue-600 rounded-3xl transition-all'>
                Continue to Wallet Setup
              </button>

              <button className='w-full px-5 py-3 text-blue-600 text-center border border-blue-600 text-sm bg-white rounded-3xl transition-all'>
                Skip Setup
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
