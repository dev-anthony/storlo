'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function ProgressBars({ step }: { step: number }) {
  const pct = Math.round((step / 4) * 100);
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">Step {step} of 4</span>
        <span className="text-sm font-semibold text-gray-700">{pct}%</span>
      </div>
      <div className="flex gap-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex-1 h-2 rounded-full overflow-hidden bg-gray-200">
            <div className={cn(
              'h-full rounded-full transition-all duration-500',
              i < step ? 'bg-green-500 w-full' :
              i === step ? 'bg-yellow-400 w-full' : 'w-0'
            )} />
          </div>
        ))}
      </div>
    </div>
  );
}