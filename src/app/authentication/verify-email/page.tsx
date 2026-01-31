'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface VerifyEmailFormData {
  code: string;
}

export default function VerifyEmailPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<VerifyEmailFormData>({
    code: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Placeholder email - in real app, fetch from previous form
  const placeholderEmail = 'user@example.com';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setFormData({ code: value });
    setError('');
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setLoading(true);
 
     try {
       // Simulate API call
       await new Promise((resolve) => setTimeout(resolve, 1000));
       
       console.log('Signup data:', formData.code);
       
       
       router.push('/authentication/verify-email-password');
     } catch (error) {
       console.error('Signup error:', error);
       setLoading(false);
     }
   };

  const handleResendCode = () => {
    console.log('Resending code to', placeholderEmail);
    // Implement resend logic here
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
            <p className="text-sm text-gray-500 font-medium">Step 2 of 3</p>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Email</h1>
            <p className="text-gray-600 text-sm">
              We have sent a 6-digit verification code to{' '}
              <span className="font-semibold text-gray-900">{placeholderEmail}</span>. Enter the code to continue.
            </p>
          </div>

        
          <form onSubmit={handleSubmit} className="space-y-5">
          
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                6-Digit Code
              </label>
              <input
                ref={inputRef}
                id="code"
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder=""
                maxLength={6}
                inputMode="numeric"
                required
                className={`w-full px-3 py-2 text-center text-2xl bg-gray-100  border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || formData.code.length !== 6}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600 text-white font-semibold py-2.5 rounded-3xl transition-all duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>
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
