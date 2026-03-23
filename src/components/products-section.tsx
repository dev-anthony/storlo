

'use client';

import React from 'react';
import { Product } from '@/app/types';
import { ProductCard } from '@/components/product-card';

interface ProductsSectionProps {
  recommendedProducts: Product[];
  trendingProducts: Product[];
  onProductClick: (product: Product) => void;
}

const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
    <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
      See All
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </a>
  </div>
);

export function ProductsSection({ recommendedProducts, trendingProducts, onProductClick }: ProductsSectionProps) {
  return (
    <div className="flex-1">
      <div className="mb-12">
        <SectionHeader title="Recommended For You" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {recommendedProducts.map(p => (
            <ProductCard key={p.id} product={p} onClick={onProductClick} />
          ))}
        </div>
      </div>
      <div>
        <SectionHeader title="Trending Products" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {trendingProducts.map(p => (
            <ProductCard key={p.id} product={p} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </div>
  );
}