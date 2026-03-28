'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '@/app/types';

export type OrderMode = 'purchase' | 'offer' | 'bid';

export interface Order {
  id: string;
  product: Product;
  mode: OrderMode;
  date: Date;
  orderNumber: string;
}

const BANNER_LABELS: Record<OrderMode, string> = {
  'purchase':   'Purchase',
  'offer': 'Offer Sent',
  'bid':  'Bid Placed',
};

const BANNER_COLORS: Record<OrderMode, string> = {
  'purchase':   'bg-blue-600',
  'offer': 'bg-green-600',
  'bid':  'bg-purple-600',
};

interface OrdersContextValue {
  orders: Order[];
  addOrUpdateOrder: (product: Product, mode: OrderMode) => void;
  getBannerLabel: (mode: OrderMode) => string;
  getBannerColor: (mode: OrderMode) => string;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrUpdateOrder = useCallback((product: Product, mode: OrderMode) => {
    setOrders(prev => {
      const existing = prev.find(o => o.product.id === product.id);
      if (existing) {
        // update mode + refresh date if switching
        return prev.map(o =>
          o.product.id === product.id ? { ...o, mode, date: new Date() } : o
        );
      }
      const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        product,
        mode,
        date: new Date(),
        orderNumber: `STL-${product.id}-${Date.now().toString().slice(-6)}`,
      };
      return [newOrder, ...prev];
    });
  }, []);

  return (
    <OrdersContext.Provider value={{
      orders,
      addOrUpdateOrder,
      getBannerLabel: (mode) => BANNER_LABELS[mode],
      getBannerColor: (mode) => BANNER_COLORS[mode],
    }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error('useOrders must be used within OrdersProvider');
  return ctx;
}