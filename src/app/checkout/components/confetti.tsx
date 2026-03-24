'use client';
import React from 'react';

export function Confetti() {
  const items = ['🎉', '🎊', '✨', '🎈', '🥳', '✨', '🎊', '🎉'];
  return (
    <div className="flex items-center justify-center gap-2 py-3">
      {items.map((emoji, i) => (
        <span
          key={i}
          className="text-2xl animate-bounce"
          style={{ animationDelay: `${i * 80}ms`, animationDuration: '1s' }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}