'use client';

import React, { useState } from 'react';
import { HeaderAuth } from '@/components/header-auth';
import { Hero } from '@/components/hero-2';
import { Market } from '@/components/market-2';

export default function Page() {
  const [breadcrumb, setBreadcrumb] = useState<string[]>(['Home']);

  return (
    <div className='min-h-screen w-full overflow-x-hidden'>
      <HeaderAuth />
      <Hero breadcrumb={breadcrumb} />
      <Market onBreadcrumbChange={setBreadcrumb} />
    </div>
  );
}