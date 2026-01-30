'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, Search, ShoppingCart, Bell, ArrowLeftRight } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
 const router = useRouter();


    return (
    <header className="w-full border-b">
        <div className="mx-auto max-w-full w-auto py-4 px-4">
          {/* Desktop View */}
          <div className="hidden md:flex h-16 items-center justify-between gap-6">

            {/* Left: Logo */}
            <div className="flex items-center gap-4 shrink-0">
              <Image 
                src="/vector1.png" 
                alt="Storlo Logo" 
                width={80} 
                height={40}
                priority
              />
            </div>

            {/* Center: Location + Search */}
            <div className="flex w-full max-w-160 items-center overflow-hidden rounded-full border">

              {/* Location */}
              <button className="flex items-center gap-2 border-r px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <MapPin className="h-4 w-4" />
                Garki, Abuja
              </button>

              {/* Search */}
              <div className="relative flex flex-1 items-center">
                <input
                  type="text"
                  placeholder="I want..."
                  className="w-full px-4 py-2 text-sm outline-none"
                />
                <Search className="absolute right-4 h-4 w-4 text-gray-500" />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium text-gray-700 hover:text-black">
                Sell
              </button>
             <Button 
                onClick={() => router.push('/authentication/signup')}
                className="rounded-full px-6 py-2 text-sm"
              >
                Login
              </Button>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex flex-col py-3">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-4">
              {/* Left: Logo + Exchange Icon */}
              <div className="flex items-center gap-2">
                <Image 
                  src="/vector1.png" 
                  alt="Storlo Logo" 
                  width={60} 
                  height={30}
                  priority
                />
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ArrowLeftRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              {/* Center: Location Dropdown */}
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-full hover:bg-gray-50">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-400">Garki, Abuja</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Right: Cart & Notifications */}
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ShoppingCart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Bell className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="I want..."
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-full outline-none focus:border-primary"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
    </header>
    );
}
