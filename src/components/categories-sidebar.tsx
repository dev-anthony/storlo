'use client';

import React from 'react';
import { Shirt, Zap, Smartphone, Monitor, Home, Sofa, Gamepad2, Sparkles, Dumbbell } from 'lucide-react';

interface Category {
  name: string;
  items: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { name: 'Fashion', items: '857,570 items', icon: Shirt },
  { name: 'Electronics', items: '657,570 items', icon: Zap },
  { name: 'Mobile Phones & Tablets', items: '357,570 items', icon: Smartphone },
  { name: 'Computer & Accessories', items: '457,570 items', icon: Monitor },
  { name: 'Home Appliances', items: '657,570 items', icon: Home },
  { name: 'Furniture', items: '257,570 items', icon: Sofa },
  { name: 'Games', items: '657,570 items', icon: Gamepad2 },
  { name: 'Personal Care', items: '557,570 items', icon: Sparkles },
  { name: 'Gym & Sports', items: '657,570 items', icon: Dumbbell },
];

export function CategoriesSidebar() {
  return (
    <div className="lg:w-64 lg:shrink-0">
      <div className="lg:sticky lg:top-4">
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <button
                key={index}
                className="min-w-max lg:w-full border border-gray-100 flex items-center justify-between gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="shrink-0 w-10 h-10 bg-linear-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-medium text-gray-900 text-sm group-hover:text-primary transition-colors">
                      {category.name}
                    </p>
                    <p className="text-xs text-gray-500">{category.items}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
