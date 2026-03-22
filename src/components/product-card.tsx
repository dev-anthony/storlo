'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/app/types';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Card
      onClick={() => onClick(product)}
      className="cursor-pointer hover:shadow-md transition-shadow gap-0 py-0 overflow-hidden border-gray-100"
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
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg z-10"
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </motion.div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{product.name}</h3>
        <p className="text-xs text-primary mb-2 truncate">{product.location}</p>
        <p className="font-bold text-gray-900">{product.price}</p>
      </CardContent>
    </Card>
  );
}