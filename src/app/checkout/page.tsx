
// 'use client';
// import React, { useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { HeaderAuth } from '@/components/header-auth';
// import { Footer } from '@/components/footer';
// import { TopUpModal } from '@/components/top-up-modal';
// import { allProducts } from '@/app/data/products';
// import { PurchaseView } from './views/purchase-view';
// import { MakeOfferView } from './views/make-offer-view';
// import { PlaceBidView } from './views/place-bid-view';

// type CheckoutMode = 'purchase' | 'make-offer' | 'place-bid';

// const HERO_TITLES: Record<CheckoutMode, string> = {
//   'purchase':   'Checkout',
//   'make-offer': 'Make an Offer',
//   'place-bid':  'Place a Bid',
// };

// export default function CheckoutPage() {
//   const searchParams = useSearchParams();
//   const productId = Number(searchParams.get('productId'));
//   const mode = (searchParams.get('mode') as CheckoutMode) || 'purchase';
//   const product = allProducts.find(p => p.id === productId);

//   const [walletBalance, setWalletBalance] = useState(50000);
//   const [showTopUp, setShowTopUp] = useState(false);

//   const formatNaira = (n: number) => `₦${n.toLocaleString('en-NG')}`;

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-sm">Product not found.</p>
//       </div>
//     );
//   }

//   const viewProps = {
//     product,
//     walletBalance,
//     formatNaira,
//     onTopUp: () => setShowTopUp(true),
//   };

//   return (
//     <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
//       <HeaderAuth />

//       <div className="w-full h-20 bg-gray-100 flex justify-center items-center shrink-0">
//         <h2 className="text-2xl font-semibold tracking-wide text-gray-900">
//           {HERO_TITLES[mode]}
//         </h2>
//       </div>

//       <div className="flex-1 flex items-start justify-center px-4 py-10">
//         <div className="w-full max-w-2xl flex flex-col gap-6">
//           {mode === 'purchase'   && <PurchaseView  {...viewProps} />}
//           {mode === 'make-offer' && <MakeOfferView {...viewProps} />}
//           {mode === 'place-bid'  && <PlaceBidView  {...viewProps} />}
//         </div>
//       </div>

//       <Footer />

//       <TopUpModal
//         isOpen={showTopUp}
//         onClose={() => setShowTopUp(false)}
//         onSuccess={() => setWalletBalance(prev => prev + 100000)}
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

  const isTwoColumn = mode === 'make-offer' || mode === 'place-bid';

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <HeaderAuth />

      <div className="w-full h-20 bg-gray-100 flex justify-center items-center shrink-0">
        <h2 className="text-2xl font-semibold tracking-wide text-gray-900">
          {HERO_TITLES[mode]}
        </h2>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className={`w-full flex flex-col gap-6 ${isTwoColumn ? '' : 'max-w-xl mx-auto'}`}>
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