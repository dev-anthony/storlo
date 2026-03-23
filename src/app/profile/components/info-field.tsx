import React from 'react';

interface InfoFieldProps {
  label: string;
  value: string;
}

export function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-900">{value || '—'}</p>
    </div>
  );
}