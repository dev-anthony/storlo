'use client';
import React from 'react';
import { Shield } from 'lucide-react';

export function EscrowNotice({ message }: { message: string }) {
  return (
    <div className="bg-blue-50 border border-blue-400 rounded-2xl px-5 py-4 flex items-start gap-3">
      <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
      <p className="text-sm text-blue-700 leading-relaxed">{message}</p>
    </div>
  );
}