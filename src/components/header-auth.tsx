
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, Search, Bell, ArrowLeftRight, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { HeaderDropdown } from '@/components/header-dropdown';

export function HeaderAuth() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const desktopProfileRef = useRef<HTMLDivElement>(null);
  const mobileProfileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const inDesktop = desktopProfileRef.current?.contains(e.target as Node);
      const inMobile = mobileProfileRef.current?.contains(e.target as Node);
      if (!inDesktop && !inMobile) setIsProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="w-full border-b">
      <div className="mx-auto max-w-full w-auto py-4 px-4">

        {/* ── Desktop ── */}
        <div className="hidden md:flex h-16 items-center justify-between gap-6">
          <div className="flex items-center gap-4 shrink-0">
            <Image src="/vector1.png" alt="Storlo Logo" width={80} height={40} priority />
          </div>

          <div className="flex w-full max-w-160 items-center overflow-hidden rounded-full border">
            <button className="flex items-center gap-2 border-r px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <MapPin className="h-4 w-4" />
              Garki, Abuja
            </button>
            <div className="relative flex flex-1 items-center">
              <input type="text" placeholder="I want..." className="w-full px-4 py-2 text-sm outline-none" />
              <Search className="absolute right-4 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/sell')}
              className="text-sm font-bold text-gray-900"
            >
              Sell
            </button>

            <div className="bg-[#f7f7f7] rounded-full px-2 py-1 shadow-md">
              <button onClick={() => router.push('/notifications')} className="p-1 hover:text-black text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
            </div>

            <div className="relative" ref={desktopProfileRef}>
              <div className="flex items-center gap-2 bg-[#f7f7f7] px-3 py-2 rounded-3xl shadow-md">
                <button
                  onClick={() => setIsProfileOpen(p => !p)}
                  className="flex items-center gap-1 hover:text-black text-gray-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {isProfileOpen && <HeaderDropdown onClose={() => setIsProfileOpen(false)} />}
            </div>
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="md:hidden flex flex-col py-3">
          <div className="flex items-center justify-between mb-4">

            {/* Logo only */}
            <div className="flex items-center gap-2">
              <Image src="/vector1.png" alt="Storlo Logo" width={60} height={30} priority />
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeftRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Location pill */}
           

            {/* Bell + Profile pill — Sell is inside HeaderDropdown */}
            <div className="relative flex items-center gap-2 px-3 py-2 bg-[#f7f7f7] border rounded-3xl shadow-md" ref={mobileProfileRef}>
              <button onClick={() => router.push('/notifications')} className="p-1 text-gray-600 hover:text-black transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="w-px h-5 bg-gray-300" />
              <button
                onClick={() => setIsProfileOpen(p => !p)}
                className="flex items-center gap-1 p-1 text-gray-600 hover:text-black transition-colors"
              >
                <User className="h-5 w-5" />
                <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProfileOpen && <HeaderDropdown onClose={() => setIsProfileOpen(false)} showSell />}
            </div>
          </div>

          <div className="relative">
            <input type="text" placeholder="I want..." className="w-full px-4 py-3 text-sm border border-gray-300 rounded-full outline-none" />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

      </div>
    </header>
  );
}