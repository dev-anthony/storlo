'use client';

import React, { useState, useRef } from 'react';
import { Lock, Eye, EyeOff, AlertOctagon  } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


interface VerifyEmailFormData {
  code: string;
  password: string;
  confirmPassword: string;
}

export default function VerifyEmailPassordPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<VerifyEmailFormData>({
    code: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const placeholderEmail = 'user@example.com';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'code') {
      const numValue = value.replace(/\D/g, '').slice(0, 6);
      setFormData(prev => ({ ...prev, code: numValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    if (!formData.password) {
      setError('Please enter a password');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log('Verification code:', formData.code);
      console.log('Password:', formData.password);
   
      setLoading(false);
      router.push('/wallets/prompt');
    }, 1000);
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
            <p className="text-sm text-gray-500 font-medium">Step 3 of 3</p>
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 border bg-gray-100 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="px-4 py-3 flex items-center gap-3 bg-blue-100 border-2 border-blue-700 rounded-2xl mt-10 mb-10">
              <div className="flex-shrink-0 w-12 h-12 bg-white   rounded-full flex items-center justify-center">
                <AlertOctagon size={30} className="text-blue-600" />
              </div>
              <p className="text-sm text-blue-600">
                Use atleast <span className="font-semibold text-blue-700">8 characters</span>, with <span className="font-semibold text-blue-700">one uppercase</span> <span className="font-semibold text-blue-700">letter</span>, <span className="font-semibold text-blue-700">one number</span> and <span className="font-semibold text-blue-700">one special symbol</span>.
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 border bg-gray-100 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

           

            <button
              type="submit"
              disabled={loading || formData.code.length !== 6 || !formData.password || !formData.confirmPassword}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600 text-white font-semibold py-2.5 rounded-3xl transition-all duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                'Create Account'
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
