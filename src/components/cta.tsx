// 'use client';

// import React from 'react';
// import Image from 'next/image';

// export function CTA() {
//   return (
//     <section className="bg-primary lg:w-370 h-172 md:h-125 mx-auto mb-6 mt-16 lg:h-132 rounded-4xl md:rounded-4xl overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-8 py-6 sm:py-8 md:py-16">
//         <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
//           {/* Left Side - Content */}
//           <div className="flex-1 text-center md:text-left">
//             {/* Badge */}
//             <div className="inline-block mb-4 px-4 py-2 bg-blue-700/50 rounded-full">
//               <span className="text-white text-xs sm:text-sm font-medium">Built for Serious Trading</span>
//             </div>

//             {/* Heading */}
//             <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
//               Turn Listings Into Real Sales
//             </h2>

//             {/* Description */}
//             <p className="text-blue-100 text-sm sm:text-sm md:text-base lg:text-lg mb-8 leading-relaxed">
//               Reach ready buyers, and manage transactions without friction. Everything you need to sell confidently lives in one powerful marketplace.
//             </p>

//             {/* Buttons */}
//             <div className="flex flex-col gap-4 w-full md:w-auto">
//               <button className="w-full px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors text-sm sm:text-base">
//                 Start Selling Now
//               </button>
//               <button className="w-full px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm sm:text-base">
//                 See How It Works
//               </button>
//             </div>
//           </div>

//           {/* Right Side - Image */}
//           <div className="w-full md:flex-1 order-2">
//             <div className="relative mt-10 h-80 sm:h-100 md:h-96 w-full">
//               <Image
//                 src="/cta.png"
//                 alt="Women shopping with bags and phone"
//                 fill
//                 className="object-cover mt-5 lg:mt-10 md:mt-20"
//                 priority
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';

import Image from 'next/image';

export function CTA() {
  return (
    <section className="bg-primary pt-4 lg:pt-0 mx-4 sm:mx-6 md:mx-8 max-w-7xl mt-16 mb-8 rounded-2xl md:rounded-4xl overflow-hidden xl:mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* FLEX WRAPPER */}
        <div className="flex flex-col md:flex-row items-center justify-center lg:gap-6 md:gap-8">

          {/* TEXT BLOCK */}
          <div className="w-full md:flex-1 order-1 text-center md:text-left px-6 md:px-6 md:pt-6 md:pr-8">
            {/* Badge */}
            <div className="inline-block mb-4 px-3 md:px-4 py-1 bg-blue-700/50 rounded-full">
              <span className="text-white text-xs md:text-sm font-medium">
                Built for Serious Trading
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Turn Listings Into Real Sales
            </h2>

            {/* Description */}
            <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed">
              Reach ready buyers, and manage transactions without friction.
              Everything you need to sell confidently lives in one powerful marketplace.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
  <button className="lg:px-5 lg:py-3 px-4 py-2 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors w-full sm:w-auto text-sm lg:text-base">
    Start Selling Now
  </button>
  <button className="lg:px-5 lg:py-3 px-4 py-2 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors w-full sm:w-auto text-sm lg:text-base">
    See How It Works
  </button>
</div>

          </div>

          {/* IMAGE BLOCK (RIGHT SIDE) */}
          <div className="w-full md:flex-1 order-2 flex justify-center items-center lg:mt-0 mt-4 ">
            <div className="relative w-full h-64 sm:h-96 max-w-md md:max-w-none md:h-full md:min-h-96 rounded-lg overflow-hidden">
              <Image
                src="/cta.png"
                alt="Women shopping with bags and phone"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
