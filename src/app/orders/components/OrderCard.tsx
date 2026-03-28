'use client';
import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Order, useOrders } from '@/app/context/order-context';
import { cn } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
}

function formatOrderDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
}

export function OrderCard({ order }: OrderCardProps) {
  const router = useRouter();
  const { getBannerLabel } = useOrders();

  return (
    <button
      onClick={() => router.push(`/checkout?productId=${order.product.id}&mode=${order.mode}`)}
      className="w-full bg-white py-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden text-left"
    >
      <div className="flex items-center">

        {/* Left: info */}
        <div className="flex-1 flex flex-col justify-center px-5 py-4 gap-1.5 min-w-0">
          {/* Mode pill — color lives here only */}
         <div className="flex items-center gap-2">
             <span className={cn(
            'text-xs font-bold uppercase tracking-wider w-fit px-2.5 py-1 rounded-full',
            order.mode === 'purchase'   ? 'bg-blue-50 text-blue-600' :
            order.mode === 'offer' ? 'bg-green-50 text-green-600' :
                                          'bg-purple-50 text-purple-600'
          )}>
            {getBannerLabel(order.mode)}
          </span>
          <p className="text-xs text-gray-400">{formatOrderDate(order.date)}</p>
         </div>

          <div className="h-px w-full bg-gray-100" />

          
          <p className="text-xs text-gray-400 font-mono">Order No: <span className='text-black'>{order.orderNumber}</span></p>
          <p className="text-sm font-semibold text-gray-900 truncate">{order.product.name}</p>
        </div>

        {/* Right: image + chevron */}
        <div className="flex items-center gap-2 pr-3 shrink-0">
          <div className="relative overflow-hidden rounded-xl bg-gray-100" style={{ width: 99, height: 104 }}>
            <Image src={order.product.image} alt={order.product.name} fill className="object-cover" />
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
        </div>

      </div>
    </button>
  );
}