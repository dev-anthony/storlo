// 'use client';

// import React from 'react';
// import Image from 'next/image';
// import { Product } from '@/app/types';
// import { allProducts } from '@/app/data/products';

// interface SimilarProductsProps {
//   currentProduct: Product;
//   onProductClick: (product: Product) => void;
// }

// export function SimilarProducts({ currentProduct, onProductClick }: SimilarProductsProps) {
//   // filter happens here — no need to pass products from parent
//   const similar = allProducts.filter(
//     p => p.category === currentProduct.category && p.id !== currentProduct.id
//   ).slice(0, 6);

//   if (similar.length === 0) return null;

//   return (
//     <div className="mt-10 mb-8">
//       <h2 className="text-xl font-semibold text-gray-900 mb-6">Similar Products</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {similar.map(product => (
//           <div
//             key={product.id}
//             onClick={() => onProductClick(product)}
//             className="cursor-pointer group"
//           >
//             <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
//               <Image
//                 src={product.image} alt={product.name} fill
//                 className="object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//             </div>
//             <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
//             <p className="text-sm font-bold text-gray-900">{product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/app/types';
import { allProducts } from '@/app/data/products';

interface SimilarProductsProps {
  currentProduct: Product;
  onProductClick: (product: Product) => void;
}

export function SimilarProducts({ currentProduct, onProductClick }: SimilarProductsProps) {
  const [liked, setLiked] = useState<number[]>([]);

  const similar = allProducts.filter(
    p => p.category === currentProduct.category && p.id !== currentProduct.id
  ).slice(0, 6);

  if (similar.length === 0) return null;

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLiked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="mt-10 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Similar Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {similar.map(product => (
          <div
            key={product.id}
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
                onClick={(e) => toggleLike(e, product.id)}
                className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md z-10"
              >
                <Heart className={`w-4 h-4 ${liked.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </motion.div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">{product.name}</h3>
              <p className="text-xs text-primary mb-1 truncate">{product.location}</p>
              <p className="font-bold text-gray-900 text-sm">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}