// 'use client';

// import { useRouter } from 'next/navigation';
// import { Wallet, Plus, Eye, EyeOff, User, ShoppingCart, Settings, LogOut } from 'lucide-react';
// import { useState } from 'react';

// export function WalletDropdown({ onClose }: { onClose: () => void }) {
//   const router = useRouter();
//   const [showBalance, setShowBalance] = useState(false);

//   return (
//     <div className="absolute right-4 top-20 bg-white border border-gray-200 rounded-2xl shadow-lg w-80 z-50 overflow-hidden">

//       {/* Section 1 — Wallet header */}
//       <div className="bg-[#dbdefe] px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center p-2">
//             <Wallet className="h-5 w-5 text-white" />
//           </div>
//           <span className="text-sm font-semibold text-blue-400">Wallet Balance</span>
//         </div>
//         <button className="flex items-center gap-1 text-xs font-medium text-blue-600 border border-blue-500 rounded-full px-3 py-1 hover:bg-blue-50 transition-colors">
//           <Plus className="h-3 w-3" />
//           Add Money
//         </button>
//       </div>

//       {/* Section 2 — Balance display */}
//       <div className="bg-[#eef0ff] px-4 py-3 flex items-center justify-between">
//         <span className="text-base font-bold text-gray-800">
//           {showBalance ? '₦ 24,500.00' : '₦ ••••••••'}
//         </span>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             setShowBalance((prev) => !prev);
//           }}
//           className="text-blue-400 hover:text-blue-600 transition-colors"
//           aria-label={showBalance ? 'Hide balance' : 'Show balance'}
//         >
//           {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//         </button>
//       </div>

//       {/* Section 3 — Nav links */}
//       <div className="bg-white py-1">
//         {[
//           { label: 'Profile', href: '/profile', icon: User },
//           { label: 'Orders', href: '/orders', icon: ShoppingCart },
//           { label: 'Settings', href: '/settings', icon: Settings },
//           { label: 'Logout', href: '/authentication/signin', icon: LogOut },
//         ].map((item, index) => {
//           const IconComponent = item.icon;
//           return (
//             <button
//               key={index}
//               onClick={() => { router.push(item.href); onClose(); }}
//               className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${
//                 item.label === 'Logout' ? 'text-red-500 hover:bg-red-50' : 'text-gray-700'
//               } ${index !== 3 ? 'border-b border-gray-100' : ''}`}
//             >
//               <IconComponent className="h-4 w-4 flex-shrink-0" />
//               {item.label}
//             </button>
//           );
//         })}
//       </div>

//     </div>
//   );
// }
'use client';

import { useRouter } from 'next/navigation';
import { ShoppingCart, User, Wallet, Settings, LogOut, Eye, EyeOff, Plus } from 'lucide-react';
import { useState } from 'react';

interface HeaderDropdownProps {
  onClose: () => void;
}

export function HeaderDropdown({ onClose }: HeaderDropdownProps) {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(false);

  const navItems = [
    { label: 'Profile',  href: '/profile',               icon: User },
    { label: 'Orders',   href: '/orders',                icon: ShoppingCart },
    { label: 'Settings', href: '/settings',              icon: Settings },
    { label: 'Logout',   href: '/authentication/signin', icon: LogOut },
  ];

  return (
    <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-2xl shadow-lg w-80 z-50 overflow-hidden">

      {/* Section 1 — Wallet header */}
      <div className="bg-[#dbdefe] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center p-2">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-semibold text-blue-400">Wallet Balance</span>
        </div>
        <button className="flex items-center gap-1 text-xs font-medium text-blue-600 border border-blue-500 rounded-full px-3 py-1 hover:bg-blue-50 transition-colors">
          <Plus className="h-3 w-3" />
          Add Money
        </button>
      </div>

      {/* Section 2 — Balance display */}
      <div className="bg-[#eef0ff] px-4 py-3 flex items-center justify-between">
        <span className="text-base font-bold text-gray-800">
          {showBalance ? '₦ 24,500.00' : '₦ ••••••••'}
        </span>
        <button
          onClick={() => setShowBalance((prev) => !prev)}
          className="text-blue-400 hover:text-blue-600 transition-colors"
          aria-label={showBalance ? 'Hide balance' : 'Show balance'}
        >
          {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {/* Section 3 — Nav links */}
      <div className="bg-white py-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => { router.push(item.href); onClose(); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-gray-50
                ${item.label === 'Logout' ? 'text-red-500 hover:bg-red-50' : 'text-gray-700'}
                ${index !== navItems.length - 1 ? 'border-b border-gray-100' : ''}
              `}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}