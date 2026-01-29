'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
}

interface ProductsSectionProps {
  recommendedProducts: Product[];
  trendingProducts: Product[];
}

export function ProductsSection({ recommendedProducts, trendingProducts }: ProductsSectionProps) {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <motion.div 
        className="relative aspect-square bg-gray-100 overflow-hidden"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        <button
          onClick={() => toggleLike(product.id)}
          className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg z-10"
        >
          <Heart
            className={`w-5 h-5 ${likedProducts.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>
      </motion.div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1">{product.name}</h3>
        <p className="text-xs text-primary mb-2">{product.location}</p>
        <p className="font-bold text-gray-900">{product.price}</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1">
      {/* Recommended For You Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Recommended For You</h2>
          <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
            See All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Trending Products Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Trending Products</h2>
          <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1">
            See All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
