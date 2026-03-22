
'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderAuth } from '@/components/header-auth';
import { Footer } from '@/components/footer';
import { ProgressBars } from '@/app/sell/components/progress-bar';
import { StepOne } from '@/app/sell/steps/step-one';
import { StepTwo } from '@/app/sell/steps/step-two';
import { StepThree } from '@/app/sell/steps/step-three';
import { StepFour, UploadedImage } from '@/app/sell/steps/step-four';
import { PreviewProduct } from '@/app/sell/steps/preview-product';

interface FormData {
  name: string;
  category: string;
  description: string;
  location: string;
  condition: string;
  quality: string;
  pricingMethod: 'direct' | 'auction';
  saleType: 'fixed' | 'negotiable' | '';
  salePrice: string;
  quantity: string;
  openToNegotiation: boolean;
  startingPrice: string;
  auctionDuration: string;
  startDate: string;
  deliveryOption: string;
  images: UploadedImage[];
}

const EMPTY_FORM: FormData = {
  name: '', category: '', description: '',
  location: '', condition: '', quality: '',
  pricingMethod: 'direct',
  saleType: '', salePrice: '', quantity: '',
  openToNegotiation: false,
  startingPrice: '', auctionDuration: '', startDate: '',
  deliveryOption: '', images: [],
};

export default function SellPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [view, setView] = useState<'form' | 'preview'>('form');
  const [form, setForm] = useState<FormData>(EMPTY_FORM);

  const set = (key: string, val: unknown) =>
    setForm(p => ({ ...p, [key]: val }));

  const handleFiles = useCallback((files: File[]) => {
    const valid = files.filter(f => ['image/jpeg', 'image/jpg', 'image/png'].includes(f.type));
    valid.forEach(file => {
      const id = `${Date.now()}-${Math.random()}`;
      const url = URL.createObjectURL(file);
      setForm(p => ({ ...p, images: [...p.images, { id, name: file.name, url, progress: 0 }] }));
      let prog = 0;
      const iv = setInterval(() => {
        prog += Math.floor(Math.random() * 20) + 10;
        if (prog >= 100) { prog = 100; clearInterval(iv); }
        setForm(p => ({
          ...p,
          images: p.images.map(img => img.id === id ? { ...img, progress: prog } : img),
        }));
      }, 250);
    });
  }, []);

  if (view === 'preview') {
    return (
      <PreviewProduct
        form={form}
        onBack={() => setView('form')}
        onPublished={() => router.push('/')}
      />
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <HeaderAuth />

      <div className="w-full h-20 bg-gray-100 flex justify-center items-center shrink-0">
        <h2 className="text-2xl font-semibold text-gray-900">Upload Product</h2>
      </div>

      <div className="flex-1 flex justify-center px-4 py-10">
        <div className="w-full max-w-xl flex flex-col">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">List a New Product</h3>
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">
              Share the details of your product and make it available for customers to discover and purchase.
            </p>
          </div>

          <ProgressBars step={step} />

          {step === 1 && (
            <StepOne name={form.name} category={form.category} description={form.description}
              onChange={set} onContinue={() => setStep(2)} />
          )}
          {step === 2 && (
            <StepTwo location={form.location} condition={form.condition} quality={form.quality}
              onChange={set} onContinue={() => setStep(3)} />
          )}
          {step === 3 && (
            <StepThree
              pricingMethod={form.pricingMethod}
              saleType={form.saleType}
              salePrice={form.salePrice}
              quantity={form.quantity}
              openToNegotiation={form.openToNegotiation}
              startingPrice={form.startingPrice}
              auctionDuration={form.auctionDuration}
              startDate={form.startDate}
              onChange={set}
              onContinue={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <StepFour
              deliveryOption={form.deliveryOption}
              images={form.images}
              onDeliveryChange={v => set('deliveryOption', v)}
              onFilesAdded={handleFiles}
              onRemoveImage={id => setForm(p => ({ ...p, images: p.images.filter(i => i.id !== id) }))}
              onPreview={() => setView('preview')}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
