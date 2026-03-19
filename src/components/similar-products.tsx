'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/app/types';
import { allProducts } from '@/app/data/products';

interface SimilarProductsProps {
  currentProduct: Product;
  onProductClick: (product: Product) => void;
}

export function SimilarProducts({ currentProduct, onProductClick }: SimilarProductsProps) {
  // filter happens here — no need to pass products from parent
  const similar = allProducts.filter(
    p => p.category === currentProduct.category && p.id !== currentProduct.id
  ).slice(0, 6);

  if (similar.length === 0) return null;

  return (
    <div className="mt-10 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Similar Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {similar.map(product => (
          <div
            key={product.id}
            onClick={() => onProductClick(product)}
            className="cursor-pointer group"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
              <Image
                src={product.image} alt={product.name} fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
            <p className="text-sm font-bold text-gray-900">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}