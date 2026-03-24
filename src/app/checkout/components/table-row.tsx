'use client';
import React from 'react';

interface TableRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  isLast?: boolean;
}

export function TableRow({ icon: Icon, label, value, isLast = false }: TableRowProps) {
  return (
    <div className={`flex items-center justify-between px-4 py-3 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <div className="flex items-center gap-2 text-gray-400">
        <Icon className="w-4 h-4 shrink-0" />
        <span className="text-sm text-gray-500">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-900 text-right">{value}</span>
    </div>
  );
}