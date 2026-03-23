'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserProfile } from '@/app/profile/types/types';

interface EditModalProps {
  isOpen: boolean;
  profile: UserProfile;
  onClose: () => void;
  onSave: (updated: UserProfile) => void;
}

const inputCls =
  'bg-gray-100 border-2 border-transparent rounded-2xl focus-visible:border-gray-900 focus-visible:ring-0 shadow-none h-auto py-2.5';

export function EditModal({ isOpen, profile, onClose, onSave }: EditModalProps) {
  const [form, setForm] = useState<UserProfile>(profile);

  useEffect(() => { setForm(profile); }, [profile]);

  const set = (key: keyof UserProfile, val: string) =>
    setForm(p => ({ ...p, [key]: val }));

  const handleSave = () => { onSave(form); onClose(); };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl z-10 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Edit Profile</h3>
          
        </div>

        {/* Form */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {[
            { label: 'First Name',     key: 'firstName' as const, type: 'text',  placeholder: 'First name' },
            { label: 'Last Name',      key: 'lastName'  as const, type: 'text',  placeholder: 'Last name' },
            { label: 'Email Address',  key: 'email'     as const, type: 'email', placeholder: 'Email' },
            { label: 'Phone Number',   key: 'phone'     as const, type: 'tel',   placeholder: '+234 ...' },
          ].map(field => (
            <div key={field.key} className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">{field.label}</label>
              <Input
                type={field.type}
                value={form[field.key] as string}
                onChange={e => set(field.key, e.target.value)}
                placeholder={field.placeholder}
                className={inputCls}
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 py-5 border-t border-gray-100">
          <Button
            onClick={onClose}
            className="flex-1 rounded-3xl h-auto py-2.5 bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 rounded-3xl h-auto py-2.5 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </div>

      </div>
    </div>
  );
}