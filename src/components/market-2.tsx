'use client';

import React from 'react';
import { CategoriesSidebar } from './categories-sidebar-2';
import { ProductsSection } from './products-section';
import { ProductCard } from '@/components/product-card';
import { ViewState, Product } from '@/app/types';
import { allProducts } from '@/app/data/products';

interface MarketProps {
  viewState: ViewState;
  breadcrumb: string[];
  onNavigate: (view: ViewState, breadcrumb: string[]) => void;
  onProductClick: (product: Product) => void;
}

export function Market({ viewState, breadcrumb, onNavigate, onProductClick }: MarketProps) {
  const handleCategorySelect = (category: string) => {
    onNavigate({ type: 'category', category }, ['Home', category]);
  };

  const selectedCategory =
    viewState.type === 'category' || viewState.type === 'subcategory'
      ? viewState.category : null;

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
    if (viewState.type === 'home') {
      return (
        <ProductsSection
          recommendedProducts={allProducts.slice(0, 3)}
          trendingProducts={allProducts.slice(3, 9)}
          onProductClick={onProductClick}
        />
      );
    }

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
                onClick={() => onNavigate(
                  { type: 'subcategory', category: 'Fashion', subcategory: opt.key },
                  ['Home', 'Fashion', opt.key]
                )}
                className="relative overflow-hidden rounded-2xl aspect-[4/3] group text-left"
              >
                <img src={opt.image} alt={opt.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
            <ProductCard key={p.id} product={p} onClick={onProductClick} />
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