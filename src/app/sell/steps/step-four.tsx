'use client';

import React, { useRef, useCallback } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownSelect } from '@/components/dropdown-select';
import { cn } from '@/lib/utils';

const DELIVERY = ['Pickup Only', 'Delivery Available', 'Both Pickup & Delivery'];

export interface UploadedImage {
  id: string;
  name: string;
  url: string;
  progress: number;
}

interface StepFourProps {
  deliveryOption: string;
  images: UploadedImage[];
  onDeliveryChange: (v: string) => void;
  onFilesAdded: (files: File[]) => void;
  onRemoveImage: (id: string) => void;
  onPreview: () => void;
}

export function StepFour({
  deliveryOption, images, onDeliveryChange, onFilesAdded, onRemoveImage, onPreview,
}: StepFourProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const allUploaded = images.length > 0 && images.every(i => i.progress === 100);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    onFilesAdded(Array.from(e.dataTransfer.files));
  }, [onFilesAdded]);

  return (
    <div className="flex flex-col gap-5">
      <DropdownSelect label="Delivery Option" options={DELIVERY}
        value={deliveryOption} onChange={onDeliveryChange} placeholder="Select delivery option" />

      {/* Upload zone */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Product Images</label>
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          className="w-full px-3 py-4 bg-gray-100 border border-dashed border-gray-300 rounded-2xl
            flex flex-col items-center justify-center gap-1 cursor-pointer
            hover:border-gray-900 hover:bg-gray-50 transition-all"
        >
          <Upload className="w-5 h-5 text-gray-400" />
          <p className="text-sm text-gray-500 font-medium">
            Drop your images here or <span className="text-blue-600">browse</span>
          </p>
          <p className="text-xs text-gray-400">Supports JPG, JPEG and PNG</p>
          <input ref={fileInputRef} type="file" multiple accept=".jpg,.jpeg,.png" className="hidden"
            onChange={e => onFilesAdded(Array.from(e.target.files || []))} />
        </div>

        {/* Image rows */}
        {images.length > 0 && (
          <div className="flex flex-col gap-3 mt-2">
            {images.map(img => (
              <div key={img.id} className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  <Image src={img.url} alt={img.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 truncate max-w-[160px]">{img.name}</span>
                    <span className="text-xs text-gray-500 shrink-0 ml-2">{img.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${img.progress}%` }} />
                  </div>
                </div>
                <button type="button" onClick={() => onRemoveImage(img.id)}
                  className="shrink-0 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button
        onClick={() => allUploaded && onPreview()}
        disabled={!allUploaded}
        className={cn('w-full rounded-3xl py-3 h-auto text-sm mt-2 gap-2',
          allUploaded ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-400'
        )}
      >
        Preview Product
      </Button>
    </div>
  );
}