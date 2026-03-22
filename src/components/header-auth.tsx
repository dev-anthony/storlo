
// 'use client';

// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import {
//   MapPin, Search, Bell, ArrowLeftRight,
//   User, ChevronDown,
// } from 'lucide-react';
// import { useState, useRef, useEffect } from 'react';
// import { HeaderDropdown } from '@/components/header-dropdown';

// export function HeaderAuth() {
//   const router = useRouter();
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const profileMenuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
//         setIsProfileOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <header className="w-full border-b">
//       <div className="mx-auto max-w-full w-auto py-4 px-4">

//         {/* Desktop View */}
//         <div className="hidden md:flex h-16 items-center justify-between gap-6">

//           <div className="flex items-center gap-4 shrink-0">
//             <Image src="/vector1.png" alt="Storlo Logo" width={80} height={40} priority />
//           </div>

//           <div className="flex w-full max-w-160 items-center overflow-hidden rounded-full border">
//             <button className="flex items-center gap-2 border-r px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//               <MapPin className="h-4 w-4" />
//               Garki, Abuja
//             </button>
//             <div className="relative flex flex-1 items-center">
//               <input
//                 type="text"
//                 placeholder="I want..."
//                 className="w-full px-4 py-2 text-sm outline-none"
//               />
//               <Search className="absolute right-4 h-4 w-4 text-gray-500" />
//             </div>
//           </div>

//           <div className="flex items-center gap-4" ref={profileMenuRef}>
//             <button className="text-sm font-bold text-gray-900">Sell</button>

//             <div className="bg-[#f7f7f7] rounded-full px-2 py-1 shadow-md">
//               <button
//                 onClick={() => router.push('/notifications')}
//                 className="p-1 hover:text-black text-gray-600 transition-colors"
//                 aria-label="Notifications"
//               >
//                 <Bell className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="relative">
//               <div className="flex items-center gap-2 bg-[#f7f7f7] px-3 py-2 rounded-3xl shadow-md">
//                 <button
//                   onClick={() => setIsProfileOpen((prev) => !prev)}
//                   className="flex items-center gap-1 hover:text-black text-gray-600 transition-colors"
//                   aria-label="Profile menu"
//                 >
//                   <User className="h-5 w-5" />
//                   <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
//                 </button>
//               </div>

//               {isProfileOpen && (
//                 <HeaderDropdown onClose={() => setIsProfileOpen(false)} />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Mobile View */}
//         <div className="md:hidden flex flex-col py-3">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center gap-2">
//               <Image src="/vector1.png" alt="Storlo Logo" width={60} height={30} priority />
//               <button className="p-2 hover:bg-gray-100 rounded-lg">
//                 <ArrowLeftRight className="h-5 w-5 text-gray-600" />
//               </button>
//             </div>

//             <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-full hover:bg-gray-50">
//               <MapPin className="h-4 w-4" />
//               <span className="text-gray-400">Garki, Abuja</span>
//               <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//               </svg>
//             </button>

//             <div className="relative flex items-center gap-2 px-3 py-2 bg-[#f7f7f7] border rounded-3xl shadow-md" ref={profileMenuRef}>
//               <button
//                 onClick={() => router.push('/notifications')}
//                 className="p-1 text-gray-600 hover:text-black transition-colors"
//                 aria-label="Notifications"
//               >
//                 <Bell className="h-5 w-5" />
//               </button>

//               <div className="w-px h-5 bg-gray-300" />

//               <button
//                 onClick={() => setIsProfileOpen((prev) => !prev)}
//                 className="flex items-center gap-1 p-1 text-gray-600 hover:text-black transition-colors"
//               >
//                 <User className="h-5 w-5" />
//                 <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
//               </button>

//               {isProfileOpen && (
//                 <HeaderDropdown onClose={() => setIsProfileOpen(false)} />
//               )}
//             </div>
//           </div>

//           <div className="relative">
//             <input
//               type="text"
//               placeholder="I want..."
//               className="w-full px-4 py-3 text-sm border border-gray-300 rounded-full outline-none focus:border-primary"
//             />
//             <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//           </div>
//         </div>

//       </div>
//     </header>
//   );
// }
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, Search, Bell, ArrowLeftRight, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { HeaderDropdown } from '@/components/header-dropdown';

export function HeaderAuth() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // ref now wraps the button + dropdown together
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

        {/* Desktop */}
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

            {/* ref wraps BOTH the toggle pill and the dropdown */}
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

        {/* Mobile */}
        <div className="md:hidden flex flex-col py-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image src="/vector1.png" alt="Storlo Logo" width={60} height={30} priority />
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeftRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-full hover:bg-gray-50">
              <MapPin className="h-4 w-4" />
              <span className="text-gray-400">Garki, Abuja</span>
            </button>

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
              {isProfileOpen && <HeaderDropdown onClose={() => setIsProfileOpen(false)} />}
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