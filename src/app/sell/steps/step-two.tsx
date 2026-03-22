'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { DropdownSelect } from '@/components/dropdown-select';
import { cn } from '@/lib/utils';

const LOCATIONS = [
  'Garki, Abuja', 'Wuse, Abuja', 'Maitama, Abuja', 'Asokoro, Abuja',
  'Jabi, Abuja', 'Kubwa, Abuja', 'Gwarinpa, Abuja', 'Lugbe, Abuja',
  'Kado, Abuja', 'Gudu, Abuja',
];
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
const QUALITIES  = ['Premium', 'Excellent', 'Good', 'Average'];

interface StepTwoProps {
  location: string;
  condition: string;
  quality: string;
  onChange: (key: string, val: string) => void;
  onContinue: () => void;
}

export function StepTwo({ location, condition, quality, onChange, onContinue }: StepTwoProps) {
  const valid = !!(location && condition && quality);
  return (
    <div className="flex flex-col gap-5">
      <DropdownSelect label="Item Location" options={LOCATIONS}
        value={location} onChange={v => onChange('location', v)} placeholder="Select location" />
      <DropdownSelect label="Product Condition" options={CONDITIONS}
        value={condition} onChange={v => onChange('condition', v)} placeholder="Select condition" />
      <DropdownSelect label="Product Quality" options={QUALITIES}
        value={quality} onChange={v => onChange('quality', v)} placeholder="Select quality" />
      <Button
        onClick={onContinue}
        disabled={!valid}
        className={cn('w-full rounded-3xl py-3 h-auto text-sm mt-2',
          valid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400'
        )}
      >
        Continue
      </Button>
    </div>
  );
}