'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, User } from 'lucide-react';
import AuthModal from '@/components/Modal';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  agreeToTerms: boolean;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log('Signup data:', formData);
      router.push('/authentication/verify-email');
     
    }, 1000);
  };

 

  return (
    <>
      <AuthModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSubmit={(data) => console.log(data)}
      />

      <div className="flex min-h-screen bg-white">
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between  gap-2">
              <Image
                src="/vector1.png"
                alt="Storlo"
                width={100}
                height={50}
                priority
              />
              <p className="text-sm text-gray-500 font-medium mb-2">Step 1 of 3</p>
            </div>

            <div className="mb-8">
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">
                Start shopping internationally and receive your items in Nigeria with ease
              </p>
            </div>

           
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name and Last Name - Side by Side */}
              <div className="grid grid-cols-2 gap-4">
                <div className='relative'>
                  <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div className='relative'>
                  <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

            
              <div className='relative'>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border bg-gray-100 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

             
              <div className="flex items-start gap-3">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded-3xl cursor-pointer mt-1"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-700 cursor-pointer">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms and Conditions
                  </a>
                </label>
              </div>

            
              <button
                type="submit"
                disabled={loading || !formData.agreeToTerms}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600 text-white font-semibold py-2.5 rounded-4xl transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating Account...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            {/* Already have account */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Login
                </button>
              </p>
            </div>

           
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-600">OR</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#4285F4"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-medium">Sign up with Google</span>
            </button>
          </div>
        </div>

    <div className="relative hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center overflow-hidden">
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
    </>
  );
}

   
