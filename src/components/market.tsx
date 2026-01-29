'use client';

import React from 'react';
import { CategoriesSidebar } from './categories-sidebar';
import { ProductsSection } from './products-section';

export function Market() {
  const recommendedProducts = [
    { id: 1, name: 'iPhone XR', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦175,000', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop' },
    { id: 2, name: 'Nike Air', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦45,000', image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2V8ZW58MHx8MHx8fDA%3D' },
    { id: 3, name: 'Black Lather Jacket', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦645,000', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMGphY2tldHxlbnwwfHwwfHx8MA%3D%3D' },
  ];

  const trendingProducts = [
    { id: 4, name: 'PS5 Console', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦645,000', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8UFM1fGVufDB8fDB8fHww' },
    { id: 5, name: 'Fridge', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦345,000', image: 'https://images.unsplash.com/photo-1721613877687-c9099b698faa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJpZGdlfGVufDB8fDB8fHww' },
    { id: 6, name: 'iPhone 17 pro max', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦1,565,000', image: 'https://images.unsplash.com/photo-1764746218363-6cb017fcd926?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGlwaG9uZSUyMDE3JTIwcHJvJTIwbWF4fGVufDB8fDB8fHww' },
    { id: 7, name: 'Hisense Smart Tv', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦2,245,000', image: 'https://images.unsplash.com/photo-1580897275296-87979517bd4c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODB8fHRlbGV2aXNpb258ZW58MHx8MHx8fDA%3D' },
    { id: 8, name: 'Macbook Pro', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦1,245,000', image: 'https://images.unsplash.com/photo-1651241680016-cc9e407e7dc3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hY2Jvb2slMjBwcm98ZW58MHx8MHx8fDA%3D' },
    { id: 9, name: 'Treadmill', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦8,645,000', image: 'https://images.unsplash.com/photo-1637579674775-7f868ee3c92d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzAwfHxneW0lMjBlcXVpcG1lbnR8ZW58MHx8MHx8fDA%3D' },
  ];

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
            <ProductsSection recommendedProducts={recommendedProducts} trendingProducts={trendingProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
