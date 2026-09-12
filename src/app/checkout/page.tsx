import React, { Suspense } from 'react';
import { CheckoutContent } from './checkout-content';

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  );
}
