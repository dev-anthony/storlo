'use client';
import React from 'react';

interface ToggleRowProps {
  title: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export function ToggleRow({ title, description, enabled, disabled = false, onToggle }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <button
        onClick={() => !disabled && onToggle()}
        disabled={disabled}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0
          ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
          ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200
          ${enabled ? 'left-6' : 'left-1'}`}
        />
      </button>
    </div>
  );
}