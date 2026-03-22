'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CheckOptionProps {
  label: string;
  checked: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}

export function CheckOption({ label, checked, onClick, fullWidth = false }: CheckOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-sm font-medium transition-all text-left',
        fullWidth ? 'w-full' : 'flex-1',
        checked ? 'border-gray-900 bg-gray-50 text-gray-900' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
      )}
    >
      <span className={cn(
        'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
        checked ? 'border-gray-900 bg-gray-900' : 'border-gray-300 bg-white'
      )}>
        {checked && (
          <svg className="w-2.5 h-2.5" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}