'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/app/sell/components/text-input';
import { DropdownSelect } from '@/components/dropdown-select';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  'Fashion', 'Electronics', 'Mobile Phones & Tablets',
  'Computer & Accessories', 'Home Appliances', 'Furniture',
  'Games', 'Personal Care', 'Gym & Sports',
];

interface StepOneProps {
  name: string;
  category: string;
  description: string;
  onChange: (key: string, val: string) => void;
  onContinue: () => void;
}

export function StepOne({ name, category, description, onChange, onContinue }: StepOneProps) {
  const valid = !!(name && category && description);
  return (
    <div className="flex flex-col gap-5">
      <TextInput label="Name of Product" name="name" value={name}
        onChange={v => onChange('name', v)} placeholder="e.g. Nike Air Force 1" />
      <DropdownSelect label="Product Category" options={CATEGORIES}
        value={category} onChange={v => onChange('category', v)} placeholder="Select a category" />
      <TextInput label="Product Description" name="description" value={description}
        onChange={v => onChange('description', v)} placeholder="Describe your product in detail..." textarea />
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