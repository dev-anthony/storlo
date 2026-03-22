'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeaderAuth } from '@/components/header-auth';
import { Footer } from '@/components/footer';
import { StatusModal } from '@/components/status-modal';
import { UploadedImage } from './step-four';

interface PreviewProductProps {
  form: {
    name: string;
    location: string;
    description: string;
    condition: string;
    quality: string;
    salePrice: string;
    images: UploadedImage[];
  };
  onBack: () => void;
  onPublished: () => void;
}

export function PreviewProduct({ form, onBack, onPublished }: PreviewProductProps) {
  const [previewImg, setPreviewImg] = React.useState(0);
  const [showPublish, setShowPublish] = React.useState(false);
  const images = form.images.map(i => i.url);

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <HeaderAuth />

      <div className="w-full h-20 bg-gray-100 flex justify-center items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Preview Product</h2>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[700px]">

            {/* Left */}
            <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col">
              <button onClick={onBack}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium mb-6">
                <ChevronLeft className="w-4 h-4" /> Go Back
              </button>

              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {form.name || 'Product Name'}
              </h1>

              <div className="flex items-center gap-4 mb-5">
                <div className="flex items-center gap-1 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{form.location || 'Location'}</span>
                </div>
                <span className="text-sm text-gray-400">Listed just now</span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {form.description || 'No description provided.'}
              </p>

              <div className="grid grid-cols-3 border border-gray-200 rounded-xl overflow-hidden mb-6">
                {[
                  { label: 'Condition', value: form.condition || '—' },
                  { label: 'Size',      value: 'N/A' },
                  { label: 'Quality',   value: form.quality || '—' },
                ].map((item, i) => (
                  <div key={i} className={`px-3 py-3 text-center ${i !== 2 ? 'border-r border-gray-200' : ''}`}>
                    <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-2xl font-bold text-gray-900">
                  {form.salePrice ? `₦${Number(form.salePrice).toLocaleString()}` : '₦0'}
                </span>
                <div className="flex gap-3">
                  <Button onClick={onBack} variant="outline"
                    className="rounded-3xl border-blue-600 text-blue-600 hover:bg-blue-50 h-auto py-2.5 px-6">
                    Save as Draft
                  </Button>
                  <Button onClick={() => setShowPublish(true)}
                    className="rounded-3xl bg-blue-600 hover:bg-blue-700 text-white h-auto py-2.5 px-6">
                    Publish Product
                  </Button>
                </div>
              </div>
            </div>

            {/* Right — image slider */}
            <div className="lg:w-1/2 relative bg-gray-100 min-h-[400px] lg:min-h-full">
              {images.length > 0 ? (
                <>
                  <Image src={images[previewImg]} alt="Preview" fill className="object-cover" />
                  {images.length > 1 && (
                    <>
                      <button onClick={() => setPreviewImg(i => (i - 1 + images.length) % images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                        <ChevronLeft className="w-5 h-5 text-gray-800" />
                      </button>
                      <button onClick={() => setPreviewImg(i => (i + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                        <ChevronRight className="w-5 h-5 text-gray-800" />
                      </button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, i) => (
                          <button key={i} onClick={() => setPreviewImg(i)}
                            className={`w-2 h-2 rounded-full ${i === previewImg ? 'bg-white' : 'bg-white/40'}`} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
                  No images uploaded
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />

      <StatusModal
        isOpen={showPublish}
        onClose={() => setShowPublish(false)}
        loadingText="Publishing your product..."
        successTitle="Product Published!"
        successMessage="Your product is now live and available for customers to discover."
        actionLabel="View All Products"
        onAction={onPublished}
      />
    </div>
  );
}