'use client';

import React, { useEffect, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  loadingText: string;
  successTitle: string;
  successMessage: string;
  actionLabel: string;
  onAction: () => void;
  autoAdvanceMs?: number; // default 2500
}

export function StatusModal({
  isOpen, onClose,
  loadingText, successTitle, successMessage,
  actionLabel, onAction,
  autoAdvanceMs = 2500,
}: StatusModalProps) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!isOpen) { setIsDone(false); return; }
    const t = setTimeout(() => setIsDone(true), autoAdvanceMs);
    return () => clearTimeout(t);
  }, [isOpen, autoAdvanceMs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl z-10">
        {!isDone ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 gap-4">
            <Loader2 className="w-10 h-10 text-gray-900 animate-spin" />
            <p className="text-sm font-medium text-gray-700">{loadingText}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-14 px-8 gap-3">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
              <Check className="w-8 h-8 text-green-600 stroke-[2.5]" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{successTitle}</h3>
            <p className="text-sm text-gray-400 text-center">{successMessage}</p>
            <button
              onClick={() => { onClose(); onAction(); }}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-3xl transition-colors"
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}