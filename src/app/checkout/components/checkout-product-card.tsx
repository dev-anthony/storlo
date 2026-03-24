'use client';
import React from 'react';
import Image from 'next/image';
import { Product } from '@/app/types';

interface CheckoutProductCardProps {
  product: Product;
  showMeta?: boolean;
}

export function CheckoutProductCard({ product, showMeta = true }: CheckoutProductCardProps) {
  return (
    <div className="w-full min-h-[168px] bg-white border border-gray-100 rounded-2xl shadow-sm flex overflow-hidden">
      <div className="relative w-40 shrink-0">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-between p-5 flex-1 min-w-0">
        <div>
          <h3 className="font-semibold text-gray-900 text-base mb-1 truncate">{product.name}</h3>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{product.description}</p>
        </div>
        {showMeta && (
          <div className="flex flex-wrap gap-4 mt-3">
            <span className="text-xs text-gray-400">Condition: <span className="text-gray-600 font-medium">{product.condition}</span></span>
            <span className="text-xs text-gray-400">Size: <span className="text-gray-600 font-medium">{product.size}</span></span>
            <span className="text-xs text-gray-400">Quality: <span className="text-gray-600 font-medium">{product.quality}</span></span>
          </div>
        )}
        <p className="font-bold text-gray-900 text-base mt-3">{product.price}</p>
      </div>
    </div>
  );
}