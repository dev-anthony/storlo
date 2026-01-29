
'use client';

import Image from 'next/image';

export function Hero() {
  return (
    <section className="bg-primary pt-4 lg:pt-0 mx-4 sm:mx-6 md:mx-8 max-w-7xl mt-16 mb-8 rounded-2xl md:rounded-4xl overflow-hidden xl:mx-auto">
      <div className="max-w-7xl mx-auto">
        {/* FLEX WRAPPER */}
        <div className="flex flex-col md:flex-row items-center justify-center lg:gap-6 md:gap-8 md:py-0">
          
          {/* TEXT BLOCK */}
          <div className="w-full md:flex-[0.45] lg:flex-1 order-1 md:order-2 md:pr-8 text-center md:text-left px-6 md:px-0">
            <div className="inline-block mb-4 px-3 md:px-4 py-1 bg-blue-700 rounded-full">
              <span className="text-white text-xs md:text-sm font-medium">
                A Smarter Digital Marketplace
              </span>
            </div>

            <h4 className="text-2xl font-semibold text-white mb-4 leading-tight">
              Buy, Sell, and Grow in One <br /> Trusted Place
            </h4>

            <p className="text-blue-100 text-base md:text-lg mb-8">
              Discover a seamless marketplace built for speed, security, and scale.
            </p>
          </div>

          {/* IMAGE BLOCK */}
          <div className="w-full md:flex-1 order-2 md:order-1 flex justify-center items-center md:px-0">
            <div className="relative w-full h-64 sm:h-96 max-w-md md:max-w-none md:h-full md:min-h-96 lg:min-h-70 rounded-lg overflow-hidden">
              <Image
                src="/hero.png"
                alt="Delivery person with customer"
                fill
                className="object-cover object-[0%_center]"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}