'use client';

import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

interface AvatarProps {
  avatar: string | null;
  initials: string;
  size?: number;
  onUpload?: (file: File) => void;
}

export function Avatar({ avatar, initials, size = 96, onUpload }: AvatarProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {avatar ? (
        <img
          src={avatar}
          alt="Profile"
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center">
          <span
            className="text-white font-bold"
            style={{ fontSize: size * 0.3 }}
          >
            {initials}
          </span>
        </div>
      )}

      {onUpload && (
        <>
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-1 right-1 w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
          >
            <Camera className="w-3.5 h-3.5 text-gray-600" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
            }}
          />
        </>
      )}
    </div>
  );
}