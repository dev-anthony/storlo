
// 'use client';

// import React, { useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Image from 'next/image';
// import {
//   Wallet, CheckCircle, FileText, Calendar, ShoppingBag,
//   Hash, User, Phone, Mail, Shield
// } from 'lucide-react';
// import { HeaderAuth } from '@/components/header-auth';
// import { Footer } from '@/components/footer';
// import { TopUpModal } from '@/components/top-up-modal';
// import { allProducts } from '@/app/data/products';

// const INITIAL_WALLET_BALANCE = 50000;

// // mock seller — swap with real data later
// const MOCK_SELLER = {
//   name: 'Emeka Okafor',
//   phone: '+234 801 234 5678',
//   email: 'emeka.okafor@gmail.com',
// };

// export default function CheckoutPage() {
//   const searchParams = useSearchParams();
//   const productId = Number(searchParams.get('productId'));
//   const product = allProducts.find(p => p.id === productId);

//   const [walletBalance, setWalletBalance] = useState(INITIAL_WALLET_BALANCE);
//   const [showTopUp, setShowTopUp] = useState(false);
//   const [orderConfirmed, setOrderConfirmed] = useState(false);

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-sm">Product not found.</p>
//       </div>
//     );
//   }

//   const productPrice = Number(product.price.replace(/[₦,]/g, ''));
//   const total = productPrice;
//   const hasSufficientFunds = walletBalance >= total;
//   const formatNaira = (n: number) => `₦${n.toLocaleString('en-NG')}`;
//   const orderId = `STL-${product.id}-${Date.now().toString().slice(-6)}`;
//   const orderDate = new Date().toLocaleDateString('en-NG', {
//     day: 'numeric', month: 'long', year: 'numeric',
//   });

//   const handleTopUpSuccess = () => {
//     setWalletBalance(prev => prev + (total - prev + 10000));
//   };

//   const handleMakePayment = () => {
//     setOrderConfirmed(true);
//   };

//   // ── TABLE ROW helper ──────────────────────────────────────────
//   const TableRow = ({
//     icon: Icon,
//     label,
//     value,
//     isLast = false,
//   }: {
//     icon: React.ElementType;
//     label: string;
//     value: string;
//     isLast?: boolean;
//   }) => (
//     <div className={`flex items-center justify-between px-4 py-3 ${!isLast ? 'border-b border-gray-100' : ''}`}>
//       <div className="flex items-center gap-2 text-gray-400">
//         <Icon className="w-4 h-4 shrink-0" />
//         <span className="text-sm text-gray-500">{label}</span>
//       </div>
//       <span className="text-sm font-semibold text-gray-900 text-right">{value}</span>
//     </div>
//   );

//   return (
//     <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
//       <HeaderAuth />

//       {/* ── TITLE BAR ─────────────────────────────────────────── */}
//       {!orderConfirmed && (
//         <div className="w-full h-20 bg-gray-100 flex justify-center items-center shrink-0">
//           <h2 className="text-2xl font-semibold tracking-wide text-gray-900">Checkout</h2>
//         </div>
//       )}

//       {/* ── CENTER CONTENT ────────────────────────────────────── */}
//       <div className="flex-1 flex items-start justify-center px-4 py-10">
//         <div className="w-full max-w-2xl flex flex-col gap-6">

//           {/* ════════════════════════════════════════════════════
//               ORDER CONFIRMED VIEW
//           ════════════════════════════════════════════════════ */}
//           {orderConfirmed ? (
//             <>
//               {/* Green tick + heading */}
//               <div className="flex flex-col items-center gap-3 pt-4 pb-2">
//                 <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
//                   <CheckCircle className="w-9 h-9 text-green-500 stroke-[1.5]" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-900">Order Confirmed</h2>
//               </div>

//               {/* Product card */}
//               <div className="w-full min-h-[168px] bg-white border border-gray-100 rounded-2xl shadow-sm flex overflow-hidden">
//                 <div className="relative w-40 shrink-0">
//                   <Image src={product.image} alt={product.name} fill className="object-cover" />
//                 </div>
//                 <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
//                   <h3 className="font-semibold text-gray-900 text-base truncate">{product.name}</h3>
//                   <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mt-1">{product.description}</p>
//                   <p className="font-bold text-gray-900 text-base mt-3">{product.price}</p>
//                 </div>
//               </div>

//               {/* Escrow notice */}
//               <div className="bg-blue-50 border border-blue-400 rounded-2xl px-5 py-4 flex items-start gap-3">
//                 <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
//                 <p className="text-sm text-blue-700 leading-relaxed">
//                   Your payment stays in your escrow wallet until the seller accepts your offer and confirms receipt of item.
//                 </p>
//               </div>

//               {/* Order details table */}
//               <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
//                 <TableRow icon={FileText}   label="Description" value={product.name} />
//                 <TableRow icon={Calendar}   label="Date"        value={orderDate} />
//                 <TableRow icon={ShoppingBag} label="Sale Type"  value="Instant Sale" />
//                 <TableRow icon={Hash}       label="Amount"      value={formatNaira(total)} />
//                 <TableRow icon={User}       label="Seller"      value={MOCK_SELLER.name} />
//                 <TableRow icon={Hash}       label="Order ID"    value={orderId} isLast />
//               </div>

//               {/* Seller contact heading */}
//               <h3 className="font-semibold text-gray-900">Seller Contact Details</h3>

//               {/* Seller contact notice */}
//               <div className="bg-blue-50 border border-blue-400 rounded-2xl px-5 py-4 flex items-start gap-3">
//                 <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
//                 <p className="text-sm text-blue-700 leading-relaxed">
//                   The seller's contact details are now available so you can arrange delivery directly.
//                   Funds will only be released after you confirm that you have received the item.
//                 </p>
//               </div>

//               {/* Seller contact table */}
//               <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
//                 <TableRow icon={User}  label="Name"  value={MOCK_SELLER.name} />
//                 <TableRow icon={Phone} label="Phone" value={MOCK_SELLER.phone} />
//                 <TableRow icon={Mail}  label="Email" value={MOCK_SELLER.email} isLast />
//               </div>

//               {/* Confirm received — disabled */}
//               <button
//                 disabled
//                 className="w-full py-3.5 rounded-3xl text-sm font-semibold bg-gray-200 text-gray-400 cursor-not-allowed"
//               >
//                 Confirm Item Received
//               </button>
//             </>

//           ) : (
//             /* ════════════════════════════════════════════════════
//                CHECKOUT VIEW
//             ════════════════════════════════════════════════════ */
//             <>
//               {/* Product card */}
//               <div className="w-full min-h-[168px] bg-white border border-gray-100 rounded-2xl shadow-sm flex overflow-hidden">
//                 <div className="relative w-40 shrink-0">
//                   <Image src={product.image} alt={product.name} fill className="object-cover" />
//                 </div>
//                 <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
//                   <div>
//                     <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{product.name}</h3>
//                     <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{product.description}</p>
//                   </div>
//                   <div className="flex flex-wrap gap-4 mt-3">
//                     <span className="text-xs text-gray-400">Condition: <span className="text-gray-600 font-medium">{product.condition}</span></span>
//                     <span className="text-xs text-gray-400">Size: <span className="text-gray-600 font-medium">{product.size}</span></span>
//                     <span className="text-xs text-gray-400">Quality: <span className="text-gray-600 font-medium">{product.quality}</span></span>
//                   </div>
//                   <p className="font-bold text-gray-900 text-base mt-3">{product.price}</p>
//                 </div>
//               </div>

//               {/* Order summary */}
//               <div className="w-full bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
//                 <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
//                 <div className="flex items-center justify-between py-2 border-b border-gray-100">
//                   <span className="text-sm text-gray-500">Items</span>
//                   <span className="text-sm font-medium text-gray-900">1</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-sm font-semibold text-gray-900">Total</span>
//                   <span className="text-sm font-bold text-gray-900">{formatNaira(total)}</span>
//                 </div>
//               </div>

//               {/* Wallet balance card */}
//               <div className={`w-full rounded-2xl border-2 p-5 flex items-center justify-between
//                 ${hasSufficientFunds ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-300'}`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className={`w-9 h-9 rounded-full flex items-center justify-center
//                     ${hasSufficientFunds ? 'bg-blue-100' : 'bg-red-100'}`}>
//                     <Wallet className={`w-5 h-5 ${hasSufficientFunds ? 'text-blue-600' : 'text-red-500'}`} />
//                   </div>
//                   <span className={`text-sm font-semibold ${hasSufficientFunds ? 'text-blue-700' : 'text-red-600'}`}>
//                     Wallet Balance
//                   </span>
//                 </div>
//                 <span className={`text-sm font-bold ${hasSufficientFunds ? 'text-blue-700' : 'text-red-600'}`}>
//                   {formatNaira(walletBalance)}
//                 </span>
//               </div>

//               {/* Insufficient funds */}
//               {!hasSufficientFunds && (
//                 <div className="flex items-center justify-between gap-4">
//                   <p className="text-sm text-red-500 leading-relaxed">
//                     Insufficient funds. Please top up your wallet to continue.
//                   </p>
//                   <button
//                     onClick={() => setShowTopUp(true)}
//                     className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-3xl transition-colors"
//                   >
//                     Top Up
//                   </button>
//                 </div>
//               )}

//               {/* Make payment */}
//               <button
//                 disabled={!hasSufficientFunds}
//                 onClick={handleMakePayment}
//                 className={`w-full py-3.5 rounded-3xl text-sm font-semibold transition-colors
//                   ${hasSufficientFunds
//                     ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
//                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   }`}
//               >
//                 Make Payment
//               </button>
//             </>
//           )}

//         </div>
//       </div>

//       <Footer />

//       <TopUpModal
//         isOpen={showTopUp}
//         onClose={() => setShowTopUp(false)}
//         onSuccess={handleTopUpSuccess}
//       />
//     </div>
//   );
// }
'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { HeaderAuth } from '@/components/header-auth';
import { Footer } from '@/components/footer';
import { TopUpModal } from '@/components/top-up-modal';
import { allProducts } from '@/app/data/products';
import { PurchaseView } from './views/purchase-view';
import { MakeOfferView } from './views/make-offer-view';
import { PlaceBidView } from './views/place-bid-view';

type CheckoutMode = 'purchase' | 'make-offer' | 'place-bid';

const HERO_TITLES: Record<CheckoutMode, string> = {
  'purchase':   'Checkout',
  'make-offer': 'Make an Offer',
  'place-bid':  'Place a Bid',
};

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const productId = Number(searchParams.get('productId'));
  const mode = (searchParams.get('mode') as CheckoutMode) || 'purchase';
  const product = allProducts.find(p => p.id === productId);

  const [walletBalance, setWalletBalance] = useState(50000);
  const [showTopUp, setShowTopUp] = useState(false);

  const formatNaira = (n: number) => `₦${n.toLocaleString('en-NG')}`;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Product not found.</p>
      </div>
    );
  }

  const viewProps = {
    product,
    walletBalance,
    formatNaira,
    onTopUp: () => setShowTopUp(true),
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <HeaderAuth />

      <div className="w-full h-20 bg-gray-100 flex justify-center items-center shrink-0">
        <h2 className="text-2xl font-semibold tracking-wide text-gray-900">
          {HERO_TITLES[mode]}
        </h2>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {mode === 'purchase'   && <PurchaseView  {...viewProps} />}
          {mode === 'make-offer' && <MakeOfferView {...viewProps} />}
          {mode === 'place-bid'  && <PlaceBidView  {...viewProps} />}
        </div>
      </div>

      <Footer />

      <TopUpModal
        isOpen={showTopUp}
        onClose={() => setShowTopUp(false)}
        onSuccess={() => setWalletBalance(prev => prev + 100000)}
      />
    </div>
  );
}