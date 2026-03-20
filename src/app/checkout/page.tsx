// // import React from 'react'
// // import {HeaderAuth} from '@/components/header-auth'

// // function page() {
// //   return (
// //     <div className='min-h-screen w-full overflow-x-hidden'>
// //         <HeaderAuth />
// //       <div className='w-full h-30 bg-gray-100 flex justify-center items-center'>
// //             <h2 className='text-3xl font-semibold tracking-wide text-gray-900'>
// //                 Checkout
// //             </h2>
// //         </div>
// //     </div>
// //   )
// // }

// // export default page
// 'use client';

// import React from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Image from 'next/image';
// import { Wallet } from 'lucide-react';
// import { HeaderAuth } from '@/components/header-auth';
// import { Footer } from '@/components/footer';
// import { allProducts } from '@/app/data/products';

// // mock wallet balance — swap with real auth/wallet data later
// const WALLET_BALANCE = 50000;

// export default function CheckoutPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const productId = Number(searchParams.get('productId'));
//   const product = allProducts.find(p => p.id === productId);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-sm">Product not found.</p>
//       </div>
//     );
//   }

//   // strip ₦ and commas to compare numerically
//   const productPrice = Number(product.price.replace(/[₦,]/g, ''));
//   const itemCount = 1;
//   const total = productPrice * itemCount;
//   const hasSufficientFunds = WALLET_BALANCE >= total;

//   const formatNaira = (amount: number) =>
//     `₦${amount.toLocaleString('en-NG')}`;

//   return (
//     <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
//       <HeaderAuth />

//       {/* Page title bar */}
//       <div className="w-full h-20 bg-gray-100 flex justify-center items-center shrink-0">
//         <h2 className="text-2xl font-semibold tracking-wide text-gray-900">Checkout</h2>
//       </div>

//       {/* Center content */}
//       <div className="flex-1 flex items-start justify-center px-4 py-10">
//         <div className="w-full max-w-2xl flex flex-col gap-6">

//           {/* ── Product card ─────────────────────────────────────── */}
//           <div className="w-full h-auto min-h-[168px] bg-white border border-gray-100 rounded-2xl shadow-sm flex overflow-hidden">
//             {/* Image */}
//             <div className="relative w-40 shrink-0">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             {/* Details */}
//             <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
//               <div>
//                 <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">
//                   {product.name}
//                 </h3>
//                 <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
//                   {product.description}
//                 </p>
//               </div>
//               <div className="flex flex-wrap gap-4 mt-3">
//                 <span className="text-xs text-gray-400">
//                   Condition: <span className="text-gray-600 font-medium">{product.condition}</span>
//                 </span>
//                 <span className="text-xs text-gray-400">
//                   Size: <span className="text-gray-600 font-medium">{product.size}</span>
//                 </span>
//                 <span className="text-xs text-gray-400">
//                   Quality: <span className="text-gray-600 font-medium">{product.quality}</span>
//                 </span>
//               </div>
//               <p className="font-bold text-gray-900 text-base mt-3">{product.price}</p>
//             </div>
//           </div>

//           {/* ── Order summary ─────────────────────────────────────── */}
//           <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
//             <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center justify-between py-2 border-b border-gray-100">
//                 <span className="text-sm text-gray-500">Items</span>
//                 <span className="text-sm font-medium text-gray-900">{itemCount}</span>
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span className="text-sm font-semibold text-gray-900">Total</span>
//                 <span className="text-sm font-bold text-gray-900">{formatNaira(total)}</span>
//               </div>
//             </div>
//           </div>

//           {/* ── Wallet balance card ───────────────────────────────── */}
//           <div className={`w-full rounded-2xl border-2 p-5 flex items-center justify-between
//             ${hasSufficientFunds ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-300'}`}
//           >
//             <div className="flex items-center gap-3">
//               <div className={`w-9 h-9 rounded-full flex items-center justify-center
//                 ${hasSufficientFunds ? 'bg-blue-100' : 'bg-red-100'}`}
//               >
//                 <Wallet className={`w-5 h-5 ${hasSufficientFunds ? 'text-blue-600' : 'text-red-500'}`} />
//               </div>
//               <span className={`text-sm font-semibold ${hasSufficientFunds ? 'text-blue-700' : 'text-red-600'}`}>
//                 Wallet Balance
//               </span>
//             </div>
//             <span className={`text-sm font-bold ${hasSufficientFunds ? 'text-blue-700' : 'text-red-600'}`}>
//               {formatNaira(WALLET_BALANCE)}
//             </span>
//           </div>

//           {/* ── Insufficient funds row ────────────────────────────── */}
//           {!hasSufficientFunds && (
//             <div className="flex items-center justify-between gap-4">
//               <p className="text-sm text-red-500 leading-relaxed">
//                 Insufficient funds. Please top up your wallet to continue.
//               </p>
//               <button
//                 onClick={() => router.push('/wallets/create')}
//                 className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-3xl transition-colors"
//               >
//                 Top Up
//               </button>
//             </div>
//           )}

//           {/* ── Make payment button ───────────────────────────────── */}
//           <button
//             disabled={!hasSufficientFunds}
//             className={`w-full py-3.5 rounded-3xl text-sm font-semibold transition-colors
//               ${hasSufficientFunds
//                 ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
//                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//               }`}
//           >
//             Make Payment
//           </button>

//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }
'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Wallet } from 'lucide-react';
import { HeaderAuth } from '@/components/header-auth';
import { Footer } from '@/components/footer';
import { TopUpModal } from '@/components/top-up-modal';
import { allProducts } from '@/app/data/products';

const INITIAL_WALLET_BALANCE = 50000;

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productId = Number(searchParams.get('productId'));
  const product = allProducts.find(p => p.id === productId);

  const [walletBalance, setWalletBalance] = useState(INITIAL_WALLET_BALANCE);
  const [showTopUp, setShowTopUp] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Product not found.</p>
      </div>
    );
  }

  const productPrice = Number(product.price.replace(/[₦,]/g, ''));
  const itemCount = 1;
  const total = productPrice * itemCount;
  const hasSufficientFunds = walletBalance >= total;

  const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;

  // simulate a top up adding enough funds
  const handleTopUpSuccess = () => {
    setWalletBalance(prev => prev + (total - prev + 10000));
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <HeaderAuth />

      {/* Page title bar */}
      <div className="w-full h-20 bg-gray-100 flex justify-center items-center shrink-0">
        <h2 className="text-2xl font-semibold tracking-wide text-gray-900">Checkout</h2>
      </div>

      {/* Center content */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl flex flex-col gap-6">

          {/* Product card */}
          <div className="w-full min-h-[168px] bg-white border border-gray-100 rounded-2xl shadow-sm flex overflow-hidden">
            <div className="relative w-40 shrink-0">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
              <div>
                <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{product.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{product.description}</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-3">
                <span className="text-xs text-gray-400">Condition: <span className="text-gray-600 font-medium">{product.condition}</span></span>
                <span className="text-xs text-gray-400">Size: <span className="text-gray-600 font-medium">{product.size}</span></span>
                <span className="text-xs text-gray-400">Quality: <span className="text-gray-600 font-medium">{product.quality}</span></span>
              </div>
              <p className="font-bold text-gray-900 text-base mt-3">{product.price}</p>
            </div>
          </div>

          {/* Order summary */}
          <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Items</span>
                <span className="text-sm font-medium text-gray-900">{itemCount}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-semibold text-gray-900">Total</span>
                <span className="text-sm font-bold text-gray-900">{formatNaira(total)}</span>
              </div>
            </div>
          </div>

          {/* Wallet balance card */}
          <div className={`w-full rounded-2xl border-2 p-5 flex items-center justify-between
            ${hasSufficientFunds ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-300'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center
                ${hasSufficientFunds ? 'bg-blue-100' : 'bg-red-100'}`}>
                <Wallet className={`w-5 h-5 ${hasSufficientFunds ? 'text-blue-600' : 'text-red-500'}`} />
              </div>
              <span className={`text-sm font-semibold ${hasSufficientFunds ? 'text-blue-700' : 'text-red-600'}`}>
                Wallet Balance
              </span>
            </div>
            <span className={`text-sm font-bold ${hasSufficientFunds ? 'text-blue-700' : 'text-red-600'}`}>
              {formatNaira(walletBalance)}
            </span>
          </div>

          {/* Insufficient funds */}
          {!hasSufficientFunds && (
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-red-500 leading-relaxed">
                Insufficient funds. Please top up your wallet to continue.
              </p>
              <button
                onClick={() => setShowTopUp(true)}
                className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-3xl transition-colors"
              >
                Top Up
              </button>
            </div>
          )}

          {/* Make payment */}
          <button
            disabled={!hasSufficientFunds}
            className={`w-full py-3.5 rounded-3xl text-sm font-semibold transition-colors
              ${hasSufficientFunds
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
          >
            Make Payment
          </button>

        </div>
      </div>

      <Footer />

      {/* Top up modal */}
      <TopUpModal
        isOpen={showTopUp}
        onClose={() => setShowTopUp(false)}
        onSuccess={handleTopUpSuccess}
      />
    </div>
  );
}