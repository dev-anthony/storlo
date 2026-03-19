// 'use client';

// import React from 'react';
// import { CategoriesSidebar } from './categories-sidebar-2';
// import { ProductsSection } from './products-section';

// interface MarketProps {
//   onBreadcrumbChange: (crumbs: string[]) => void;
// }

// export function Market({ onBreadcrumbChange }: MarketProps) {
//   const recommendedProducts = [
//     { id: 1, name: 'iPhone XR', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦175,000', image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop' },
//     { id: 2, name: 'Nike Air', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦45,000', image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500&auto=format&fit=crop&q=60' },
//     { id: 3, name: 'Black Leather Jacket', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦645,000', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=60' },
//   ];

//   const trendingProducts = [
//     { id: 4, name: 'PS5 Console', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦645,000', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop&q=60' },
//     { id: 5, name: 'Fridge', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦345,000', image: 'https://images.unsplash.com/photo-1721613877687-c9099b698faa?w=500&auto=format&fit=crop&q=60' },
//     { id: 6, name: 'iPhone 17 Pro Max', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦1,565,000', image: 'https://images.unsplash.com/photo-1764746218363-6cb017fcd926?w=500&auto=format&fit=crop&q=60' },
//     { id: 7, name: 'Hisense Smart TV', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦2,245,000', image: 'https://images.unsplash.com/photo-1580897275296-87979517bd4c?w=500&auto=format&fit=crop&q=60' },
//     { id: 8, name: 'Macbook Pro', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦1,245,000', image: 'https://images.unsplash.com/photo-1651241680016-cc9e407e7dc3?w=500&auto=format&fit=crop&q=60' },
//     { id: 9, name: 'Treadmill', location: '2 BRIGHT KEBB CLOSE, GARKI', price: '₦8,645,000', image: 'https://images.unsplash.com/photo-1637579674775-7f868ee3c92d?w=500&auto=format&fit=crop&q=60' },
//   ];

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row lg:gap-8 gap-6">
//           <div className="lg:w-64 lg:shrink-0">
//             <CategoriesSidebar onCategorySelect={(category) => onBreadcrumbChange(['Home', category])} />
//           </div>
//           <div className="flex-1">
//             <ProductsSection recommendedProducts={recommendedProducts} trendingProducts={trendingProducts} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { CategoriesSidebar } from './categories-sidebar-2';
import { ProductsSection } from './products-section';
import { ViewState, Product } from '@/app/types';
import { allProducts } from '@/app/data/products';

interface MarketProps {
  viewState: ViewState;
  breadcrumb: string[];
  onNavigate: (view: ViewState, breadcrumb: string[]) => void;
  onProductClick: (product: Product) => void;
}

// ── tiny reusable card used everywhere except home ─────────────
function ProductCard({
  product,
  onProductClick,
}: {
  product: Product;
  onProductClick: (p: Product) => void;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      onClick={() => onProductClick(product)}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <motion.div
        className="relative aspect-square bg-gray-100 overflow-hidden"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Image src={product.image} alt={product.name} fill className="object-cover" />
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(p => !p); }}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md z-10"
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </motion.div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h3>
        <p className="text-xs text-primary mb-2">{product.location}</p>
        <p className="font-bold text-gray-900">{product.price}</p>
      </div>
    </div>
  );
}

export function Market({ viewState, breadcrumb, onNavigate, onProductClick }: MarketProps) {
  const handleCategorySelect = (category: string) => {
    onNavigate({ type: 'category', category }, ['Home', category]);
  };

  const selectedCategory =
    viewState.type === 'category' || viewState.type === 'subcategory'
      ? viewState.category : null;

  // ── filter products based on current view ─────────────────────
  const filteredProducts: Product[] = (() => {
    if (viewState.type === 'category')
      return allProducts.filter(p => p.category === viewState.category);
    if (viewState.type === 'subcategory')
      return allProducts.filter(
        p => p.category === viewState.category && p.subCategory === viewState.subcategory
      );
    return [];
  })();

  const renderContent = () => {
    // ── HOME ──────────────────────────────────────────────────────
    if (viewState.type === 'home') {
      return (
        <ProductsSection
          recommendedProducts={allProducts.slice(0, 3)}
          trendingProducts={allProducts.slice(3, 9)}
          onProductClick={onProductClick}
        />
      );
    }

    // ── FASHION: show Male / Female picker ────────────────────────
    if (viewState.type === 'category' && viewState.category === 'Fashion') {
      const fashionOptions = [
        {
          key: 'Male', label: "Men's Fashion", count: '430,000+ items',
          image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop&q=60',
        },
        {
          key: 'Female', label: "Women's Fashion", count: '427,570+ items',
          image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=60',
        },
      ];
      return (
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Fashion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fashionOptions.map(opt => (
              <button
                key={opt.key}
                onClick={() =>
                  onNavigate(
                    { type: 'subcategory', category: 'Fashion', subcategory: opt.key },
                    ['Home', 'Fashion', opt.key]
                  )
                }
                className="relative overflow-hidden rounded-2xl aspect-[4/3] group text-left"
              >
                <img
                  src={opt.image} alt={opt.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">{opt.label}</h3>
                  <p className="text-sm text-white/75 mt-1">{opt.count}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    // ── ALL OTHER CATEGORIES + FASHION SUBCATEGORIES ──────────────
    const label =
      viewState.type === 'subcategory'
        ? `${viewState.subcategory}'s ${viewState.category}`
        : viewState.type === 'category' ? viewState.category : '';

    if (filteredProducts.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
          No products found in this category.
        </div>
      );
    }

    return (
      <div className="flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{label}</h2>
          <span className="text-sm text-gray-500">{filteredProducts.length} items</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map(p => (
            <ProductCard key={p.id} product={p} onProductClick={onProductClick} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:gap-8 gap-6">
          <div className="lg:w-64 lg:shrink-0">
            <CategoriesSidebar
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>
          <div className="flex-1">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}