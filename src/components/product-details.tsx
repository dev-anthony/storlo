'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Heart, MapPin, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Product } from '@/app/types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onSave: (id: number) => void;
  isSaved: boolean;
}

export function ProductDetail({ product, onBack, onSave, isSaved }: ProductDetailProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = product.images?.length ? product.images : [product.image];

  const prev = () => setImgIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setImgIndex(i => (i + 1) % images.length);

  const avgRating = product.ratings.length
    ? product.ratings.reduce((s, r) => s + r.stars, 0) / product.ratings.length
    : 0;

  const starCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: product.ratings.filter(r => r.stars === star).length,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[700px]">

        {/* LEFT */}
        <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col overflow-y-auto">

          {/* Go Back | Save for Later */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <button
              onClick={() => onSave(product.id)}
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors text-sm font-medium"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
              Save for Later
            </button>
          </div>

          {/* Name */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

          {/* Location + Date */}
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin className="w-4 h-4 shrink-0" />
              <span className="text-sm">{product.location}</span>
            </div>
            <span className="text-sm text-gray-400">{product.dateListed}</span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>

          {/* Condition / Size / Quality */}
          <div className="grid grid-cols-3 border border-gray-200 rounded-xl overflow-hidden mb-6">
            {[
              { label: 'Condition', value: product.condition },
              { label: 'Size',      value: product.size },
              { label: 'Quality',   value: product.quality },
            ].map((item, i) => (
              <div key={i} className={`px-3 py-3 text-center ${i !== 2 ? 'border-r border-gray-200' : ''}`}>
                <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Price + Purchase */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-bold text-gray-900">{product.price}</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-3xl text-sm font-semibold transition-colors">
              Purchase
            </button>
          </div>

          {/* Ratings */}
          <div className="w-full">
            <h3 className="font-semibold text-gray-900 mb-4">Ratings & Reviews</h3>

            <div className="flex gap-6 mb-6">
              <div className="flex flex-col items-center justify-center min-w-[64px]">
                <span className="text-5xl font-bold text-gray-900 leading-none">{avgRating.toFixed(1)}</span>
                <div className="flex gap-0.5 my-1.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-xs text-gray-400">{product.ratings.length} reviews</span>
              </div>

              <div className="flex-1 flex flex-col gap-1.5 justify-center">
                {starCounts.map(({ star, count }) => (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 w-2.5 text-right">{star}</span>
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 shrink-0" />
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: product.ratings.length ? `${(count / product.ratings.length) * 100}%` : '0%' }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-4">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {product.ratings.length === 0 && (
                <p className="text-sm text-gray-400">No reviews yet.</p>
              )}
              {product.ratings.map(r => (
                <div key={r.id} className="border-b border-gray-100 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-900">{r.user}</span>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-1.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= r.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — image slider */}
        <div className="lg:w-1/2 relative bg-gray-100 min-h-[400px] lg:min-h-full">
          <Image
            src={images[imgIndex]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg z-10"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg z-10"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === imgIndex ? 'bg-white' : 'bg-white/40'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}