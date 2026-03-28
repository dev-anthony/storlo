'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { HeaderAuth } from '@/components/header-auth';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { OrderCard } from '@/app/orders/components/OrderCard';
import { useOrders } from '@/app/context/order-context';

export default function OrdersPage() {
  const router = useRouter();
  const { orders } = useOrders();
  const hasOrders = orders.length > 0;

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <HeaderAuth />

      {/* Hero bar */}
      <div className="w-full h-20 bg-gray-100 flex justify-center items-center shrink-0">
        <h2 className="text-2xl font-semibold tracking-wide text-gray-900">Orders</h2>
      </div>

      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-2xl">

          {/* ── EMPTY STATE ── */}
          {!hasOrders && (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingBag className="w-9 h-9 text-gray-300" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-gray-900">You have no orders yet</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                  You haven't placed any orders yet. Explore more products to make your first purchase.
                </p>
              </div>
              <Button
                onClick={() => router.push('/')}
                className="rounded-3xl h-auto py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold mt-2"
              >
                Explore Products
              </Button>
            </div>
          )}

          {/* ── ORDERS LIST ── */}
          {hasOrders && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">
                  {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                </p>
              </div>
              {orders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}