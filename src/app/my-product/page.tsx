'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeaderAuth } from '@/components/header-auth';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { allProducts } from '@/app/data/products';
import { Product } from '@/app/types';
import { cn } from '@/lib/utils';

type ProductStatus = 'active' | 'sold' | 'draft';

interface MyProduct extends Product {
  status: ProductStatus;
}

const myProducts: MyProduct[] = allProducts.map((p, i) => ({
  ...p,
  status: i < 20 ? 'active' : i < 25 ? 'sold' : 'draft',
}));

const TABS: { key: ProductStatus; label: string }[] = [
  { key: 'active', label: 'Active Products' },
  { key: 'sold',   label: 'Sold Products' },
  { key: 'draft',  label: 'Draft Products' },
];

const BADGE: Record<ProductStatus, string> = {
  active: 'bg-green-100 text-green-700',
  sold:   'bg-gray-100 text-gray-500',
  draft:  'bg-yellow-100 text-yellow-700',
};

const PER_PAGE = 12;

export default function MyProductsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ProductStatus>('active');
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => myProducts.filter(p => p.status === activeTab),
    [activeTab]
  );

  const hasSoldProducts = myProducts.some(p => p.status === 'sold');
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleTabChange = (tab: ProductStatus) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <HeaderAuth />

      <div className="w-full h-20 bg-gray-100 flex justify-center items-center shrink-0">
        <h2 className="text-2xl font-semibold tracking-wide text-gray-900">My Products</h2>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {TABS.map(tab => {
            const isDisabled = tab.key === 'sold' && !hasSoldProducts;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => !isDisabled && handleTabChange(tab.key)}
                disabled={isDisabled}
                className={cn(
                  'px-5 py-2 rounded-3xl text-sm font-medium border transition-all',
                  isActive   ? 'bg-blue-600 text-white border-blue-600' :
                  isDisabled ? 'bg-white text-gray-300 border-gray-200 cursor-not-allowed' :
                               'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                )}
              >
                {tab.label}
                <span className={cn(
                  'ml-2 text-xs px-1.5 py-0.5 rounded-full',
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                )}>
                  {myProducts.filter(p => p.status === tab.key).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {paginated.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-400 text-sm">No {activeTab} products yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {paginated.map(product => (
              // wrap ProductCard in a relative div to layer the status badge on top
              <div key={product.id} className="relative">
                <span className={cn(
                  'absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full capitalize z-10',
                  BADGE[product.status]
                )}>
                  {product.status}
                </span>
                <ProductCard
                  product={product}
                  onClick={() => router.push(`/?productId=${product.id}`)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={cn(
                'w-9 h-9 rounded-full border flex items-center justify-center transition-all',
                page === 1
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-blue-600 text-blue-600 hover:bg-blue-50'
              )}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className={cn(
                    'w-8 h-8 rounded-full text-sm font-medium transition-all',
                    n === page ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                  )}
                >
                  {n}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={cn(
                'w-9 h-9 rounded-full border flex items-center justify-center transition-all',
                page === totalPages
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-blue-600 text-blue-600 hover:bg-blue-50'
              )}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}