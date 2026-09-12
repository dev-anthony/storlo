'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CategoriesSidebar } from './categories-sidebar';
import { ProductsSection } from './products-section';
import { allProducts } from '@/app/data/products';

export function Market() {
  const router = useRouter();

  // This is the lightweight landing-page preview; the full interactive
  // browsing/detail experience lives at /home, so route clicks there.
  const recommendedProducts = allProducts.slice(0, 3);
  const trendingProducts = allProducts.slice(3, 9);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-8 gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:w-64 lg:shrink-0">
            <CategoriesSidebar />
          </div>

          {/* Right Content - Products */}
          <div className="flex-1">
            <ProductsSection
              recommendedProducts={recommendedProducts}
              trendingProducts={trendingProducts}
              onProductClick={() => router.push('/home')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
