'use client';

import React from 'react';
import { CategoriesSidebar } from './categories-sidebar-2';
import { ProductsSection } from './products-section';

interface MarketProps {
  onBreadcrumbChange: (crumbs: string[]) => void;
}

export function Market({ onBreadcrumbChange }: MarketProps) {
  const recommendedProducts = [
    { id: 1, name: 'iPhone XR', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦175,000', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop' },
    { id: 2, name: 'Nike Air', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦45,000', image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&auto=format&fit=crop&q=60' },
    { id: 3, name: 'Black Leather Jacket', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦645,000', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60' },
  ];

  const trendingProducts = [
    { id: 4, name: 'PS5 Console', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦645,000', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop&q=60' },
    { id: 5, name: 'Fridge', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦345,000', image: 'https://images.unsplash.com/photo-1721613877687-c9099b698faa?w=500&auto=format&fit=crop&q=60' },
    { id: 6, name: 'iPhone 17 Pro Max', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦1,565,000', image: 'https://images.unsplash.com/photo-1764746218363-6cb017fcd926?w=500&auto=format&fit=crop&q=60' },
    { id: 7, name: 'Hisense Smart TV', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦2,245,000', image: 'https://images.unsplash.com/photo-1580897275296-87979517bd4c?w=500&auto=format&fit=crop&q=60' },
    { id: 8, name: 'Macbook Pro', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦1,245,000', image: 'https://images.unsplash.com/photo-1651241680016-cc9e407e7dc3?w=500&auto=format&fit=crop&q=60' },
    { id: 9, name: 'Treadmill', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦8,645,000', image: 'https://images.unsplash.com/photo-1637579674775-7f868ee3c92d?w=500&auto=format&fit=crop&q=60' },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-8 gap-6">
          <div className="lg:w-64 lg:shrink-0">
            <CategoriesSidebar onCategorySelect={(category) => onBreadcrumbChange(['Home', category])} />
          </div>
          <div className="flex-1">
            <ProductsSection recommendedProducts={recommendedProducts} trendingProducts={trendingProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}