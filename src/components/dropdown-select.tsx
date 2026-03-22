'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface DropdownSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export function DropdownSelect({
  label, options, value, onChange, placeholder = 'Select...', error,
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="flex flex-col gap-1.5 w-full" ref={ref}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div
        onClick={() => setOpen(p => !p)}
        className={`relative w-full px-3 py-2.5 bg-gray-100 border-2 rounded-2xl flex items-center justify-between cursor-pointer transition-all
          ${open ? 'border-blue-500' : error ? 'border-red-400' : 'border-transparent focus-within:border-blue-500'}`}
      >
        <span className={`text-sm ${value ? 'text-gray-900' : 'text-gray-400'}`}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-52 overflow-y-auto">
            {options.map(opt => (
              <div
                key={opt}
                onMouseDown={(e) => { e.preventDefault(); onChange(opt); setOpen(false); }}
                className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors
                  ${value === opt ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}`}
              >
                {opt}
                {value === opt && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}