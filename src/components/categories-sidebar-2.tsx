'use client';

import React, { useState } from 'react';
import { Shirt, Zap, Smartphone, Monitor, Home, Sofa, Gamepad2, Sparkles, Dumbbell } from 'lucide-react';

interface Category {
  name: string;
  items: string;
  icon: React.ElementType;
}

const categories: Category[] = [
  { name: 'Fashion',                  items: '857,570 items', icon: Shirt },
  { name: 'Electronics',              items: '657,570 items', icon: Zap },
  { name: 'Mobile Phones & Tablets',  items: '357,570 items', icon: Smartphone },
  { name: 'Computer & Accessories',   items: '457,570 items', icon: Monitor },
  { name: 'Home Appliances',          items: '657,570 items', icon: Home },
  { name: 'Furniture',                items: '257,570 items', icon: Sofa },
  { name: 'Games',                    items: '657,570 items', icon: Gamepad2 },
  { name: 'Personal Care',            items: '557,570 items', icon: Sparkles },
  { name: 'Gym & Sports',             items: '657,570 items', icon: Dumbbell },
];

interface CategoriesSidebarProps {
  onCategorySelect: (category: string) => void;
}

export function CategoriesSidebar({ onCategorySelect }: CategoriesSidebarProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setSelected(name);
    onCategorySelect(name);
  };

  return (
    <div className="lg:w-64 lg:shrink-0">
      <div className="lg:sticky lg:top-4">
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            const isSelected = selected === category.name;
            return (
              <button
                key={index}
                onClick={() => handleClick(category.name)}
                className={`min-w-max lg:w-full border flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors group
                  ${isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-100 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                    ${isSelected ? 'bg-blue-100' : 'bg-gradient-to-br from-gray-100 to-gray-200'}`}
                  >
                    <IconComponent className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-primary'}`} />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className={`font-medium text-sm transition-colors ${isSelected ? 'text-blue-600' : 'text-gray-900 group-hover:text-primary'}`}>
                      {category.name}
                    </p>
                    <p className="text-xs text-gray-500">{category.items}</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 shrink-0 transition-colors ${isSelected ? 'text-blue-500' : 'text-gray-400 group-hover:text-primary'}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
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