// 'use client';

// import React, { useState } from 'react';
// import { HeaderAuth } from '@/components/header-auth';
// import { Hero } from '@/components/hero-2';
// import { Market } from '@/components/market-2';
// import {CTA} from "@/components/cta";
// import { Footer } from '@/components/footer';

// export default function Page() {
//   const [breadcrumb, setBreadcrumb] = useState<string[]>(['Home']);

//   return (
//     <div className='min-h-screen w-full overflow-x-hidden'>
//       <HeaderAuth />
//       <Hero breadcrumb={breadcrumb} />
//       <Market onBreadcrumbChange={setBreadcrumb} />
//       <CTA/>
//       <Footer />
//     </div>
//   );
// }
'use client';

import React, { useState } from 'react';
import { HeaderAuth } from '@/components/header-auth';
import { Hero } from '@/components/hero-2';
import { Market } from '@/components/market-2';
import { ProductDetail } from '@/components/product-details';
import { SimilarProducts } from '@/components/similar-products';
import { CTA } from '@/components/cta';
import { Footer } from '@/components/footer';
import { Product, ViewState } from '@/app/types';
import { allProducts } from '@/app/data/products';

interface HistoryEntry {
  view: ViewState;
  breadcrumb: string[];
}

export default function Page() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { view: { type: 'home' }, breadcrumb: ['Home'] },
  ]);
  const [savedProducts, setSavedProducts] = useState<number[]>([]);

  const current = history[history.length - 1];
  const { view, breadcrumb } = current;

  const navigate = (newView: ViewState, newBreadcrumb: string[]) => {
    setHistory(prev => [...prev, { view: newView, breadcrumb: newBreadcrumb }]);
  };

  const goBack = () => setHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);

  const handleBreadcrumbClick = (index: number) => {
    setHistory(prev => prev.slice(0, index + 1));
  };

  const handleProductClick = (product: Product) => {
    navigate({ type: 'product', product }, [...breadcrumb, product.name]);
  };

  const toggleSave = (id: number) =>
    setSavedProducts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const similarProducts = view.type === 'product'
    ? allProducts.filter(p => p.category === view.product.category && p.id !== view.product.id).slice(0, 6)
    : [];

  const isProductView = view.type === 'product';

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <HeaderAuth />
      <Hero breadcrumb={breadcrumb} onBreadcrumbClick={handleBreadcrumbClick} />

      {isProductView ? (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ProductDetail
            product={(view as { type: 'product'; product: Product }).product}
            onBack={goBack}
            onSave={toggleSave}
            isSaved={savedProducts.includes((view as { type: 'product'; product: Product }).product.id)}
          />
          <SimilarProducts currentProduct={view.product} onProductClick={handleProductClick} />
           <CTA />
          <Footer />
        </div>
      ) : (
        <>
          <Market
            viewState={view}
            breadcrumb={breadcrumb}
            onNavigate={navigate}
            onProductClick={handleProductClick}
          />
          <CTA />
          <Footer />
        </>
      )}
    </div>
  );
}