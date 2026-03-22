'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}

export function TextInput({ label, name, value, onChange, placeholder = '', textarea = false }: TextInputProps) {
  const baseCls = cn(
    'bg-gray-100 border-2 border-transparent rounded-2xl focus-visible:border-gray-900 focus-visible:ring-0 shadow-none h-auto py-2.5'
  );
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
      {textarea ? (
        <textarea
          id={name}
          rows={4}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          className={cn(baseCls, 'w-full px-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none resize-none rounded-2xl bg-gray-100 border-2 border-transparent focus:border-gray-900 transition-all')}
        />
      ) : (
        <Input
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          className={baseCls}
        />
      )}
    </div>
  );
}