'use client';
import React, { useState } from 'react';
import { X, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputCls =
  'bg-gray-100 border-2 border-transparent rounded-2xl focus-visible:border-gray-900 focus-visible:ring-0 shadow-none h-auto py-2.5 pr-10';

interface PasswordField {
  label: string;
  key: 'current' | 'new' | 'confirm';
  placeholder: string;
}

const FIELDS: PasswordField[] = [
  { label: 'Current Password',     key: 'current', placeholder: '••••••••' },
  { label: 'New Password',          key: 'new',     placeholder: '••••••••' },
  { label: 'Confirm New Password',  key: 'confirm', placeholder: '••••••••' },
];

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [form, setForm] = useState({ current: '', new: '', confirm: '' });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [error, setError] = useState('');

  const set = (key: keyof typeof form, val: string) => {
    setForm(p => ({ ...p, [key]: val }));
    setError('');
  };

  const toggleShow = (key: keyof typeof show) =>
    setShow(p => ({ ...p, [key]: !p[key] }));

  const handleSave = () => {
    if (!form.current) { setError('Please enter your current password.'); return; }
    if (form.new.length < 8) { setError('New password must be at least 8 characters.'); return; }
    if (form.new !== form.confirm) { setError('Passwords do not match.'); return; }
    // success — reset + close
    setForm({ current: '', new: '', confirm: '' });
    setError('');
    onClose();
  };

  const handleClose = () => {
    setForm({ current: '', new: '', confirm: '' });
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl z-10 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-900">Change Password</h3>
          
        </div>

        {/* Form */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {FIELDS.map((field, idx) => (
            <React.Fragment key={field.key}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">{field.label}</label>
                <div className="relative">
                  <Input
                    type={show[field.key] ? 'text' : 'password'}
                    value={form[field.key]}
                    onChange={e => set(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={inputCls}
                  />
                  <button
                    type="button"
                    onClick={() => toggleShow(field.key)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {show[field.key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Caution badge after new password */}
              {idx === 1 && (
                <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-600 leading-relaxed">
                    Use at least <span className="font-semibold">8 characters</span>, with{' '}
                    <span className="font-semibold">one uppercase letter</span>,{' '}
                    <span className="font-semibold">one number</span> and{' '}
                    <span className="font-semibold">one special character</span>.
                  </p>
                </div>
              )}
            </React.Fragment>
          ))}

          {error && (
            <p className="text-xs text-red-500 font-medium">{error}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 py-5 border-t border-gray-100">
          <Button
            onClick={handleClose}
            className="flex-1 rounded-3xl h-auto py-2.5 bg-white text-gray-600 border border-gray-500 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 rounded-3xl h-auto py-2.5 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Change Password
          </Button>
        </div>

      </div>
    </div>
  );
}