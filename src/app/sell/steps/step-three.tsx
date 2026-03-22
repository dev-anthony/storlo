'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { TextInput } from '@/app/sell/components/text-input';
import { CheckOption } from '@/app/sell/components/check-option';
import { DropdownSelect } from '@/components/dropdown-select';
import { cn } from '@/lib/utils';

const DURATIONS = ['3 days', '5 days', '7 days', '10 days', '14 days'];

interface StepThreeProps {
  pricingMethod: 'direct' | 'auction';
  saleType: 'fixed' | 'negotiable' | '';
  salePrice: string;
  quantity: string;
  openToNegotiation: boolean;
  startingPrice: string;
  auctionDuration: string;
  startDate: string;
  onChange: (key: string, val: unknown) => void;
  onContinue: () => void;
}

export function StepThree({
  pricingMethod, saleType, salePrice, quantity, openToNegotiation,
  startingPrice, auctionDuration, startDate, onChange, onContinue,
}: StepThreeProps) {
  const isValid = pricingMethod === 'auction'
    ? !!(startingPrice && auctionDuration && startDate)
    : !!(salePrice && saleType);

  return (
    <div className="flex flex-col gap-5">

      {/* Pricing method */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Pricing Method</label>
        <div className="flex gap-3">
          <CheckOption label="Direct Sale" checked={pricingMethod === 'direct'}
            onClick={() => onChange('pricingMethod', 'direct')} />
          <CheckOption label="Auction" checked={pricingMethod === 'auction'}
            onClick={() => onChange('pricingMethod', 'auction')} />
        </div>
      </div>

      {/* Auction fields */}
      {pricingMethod === 'auction' && (
        <div className="grid grid-cols-3 gap-3">
          <TextInput label="Starting Price (₦)" name="startingPrice"
            value={startingPrice} onChange={v => onChange('startingPrice', v)} placeholder="0" />
          <DropdownSelect label="Duration" options={DURATIONS}
            value={auctionDuration} onChange={v => onChange('auctionDuration', v)} placeholder="Select" />
          <TextInput label="Start Date" name="startDate"
            value={startDate} onChange={v => onChange('startDate', v)} placeholder="DD/MM/YYYY" />
        </div>
      )}

      {/* Direct sale fields */}
      {pricingMethod === 'direct' && (
        <>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Sale Type</label>
            <div className="flex gap-3">
              <CheckOption label="Fixed Price" checked={saleType === 'fixed'}
                onClick={() => onChange('saleType', 'fixed')} />
              <CheckOption label="Negotiable" checked={saleType === 'negotiable'}
                onClick={() => onChange('saleType', 'negotiable')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextInput label="Sale Price (₦)" name="salePrice"
              value={salePrice} onChange={v => onChange('salePrice', v)} placeholder="0" />
            <TextInput label="Quantity" name="quantity"
              value={quantity} onChange={v => onChange('quantity', v)} placeholder="1" />
          </div>

          <CheckOption label="Open to negotiations" checked={openToNegotiation}
            onClick={() => onChange('openToNegotiation', !openToNegotiation)} fullWidth />
        </>
      )}

      <Button
        onClick={onContinue}
        disabled={!isValid}
        className={cn('w-full rounded-3xl py-3 h-auto text-sm mt-2',
          isValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400'
        )}
      >
        Continue
      </Button>
    </div>
  );
}