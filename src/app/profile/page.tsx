'use client';

import React, { useState } from 'react';
import { HeaderAuth } from '@/components/header-auth';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/app/profile/components/avatar';
import { InfoField } from '@/app/profile/components/info-field';
import { EditModal } from '@/app/profile/components/edit-modal';
import { UserProfile, getInitials } from '@/app/profile/types/types';

const INITIAL: UserProfile = {
  firstName: 'Nelson',
  lastName: 'Ekpenyong',
  email: 'nelson.ekpenyong@gmail.com',
  phone: '+234 801 234 5678',
  avatar: null,
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(INITIAL);
  const [editOpen, setEditOpen] = useState(false);

  const handleAvatarUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setProfile(p => ({ ...p, avatar: url }));
  };

  const initials = getInitials(profile.firstName, profile.lastName);
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <HeaderAuth />

      <div className="w-full h-20 bg-gray-100 flex justify-center items-center shrink-0">
        <h2 className="text-2xl font-semibold tracking-wide text-gray-900">Profile</h2>
      </div>

      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-2xl flex flex-col gap-4">

          {/* Identity card */}
          <Card className="py-0 gap-0 overflow-hidden border-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-5">
                <Avatar
                  avatar={profile.avatar}
                  initials={initials}
                  size={96}
                  onUpload={handleAvatarUpload}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-gray-900 truncate">{fullName}</p>
                  <p className="text-sm text-gray-400 truncate mt-0.5">{profile.email}</p>
                </div>
                <Button
                  onClick={() => setEditOpen(true)}
                  className="shrink-0 rounded-3xl h-auto py-2 px-5 bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 text-sm font-medium shadow-none"
                >
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Basic info card */}
          <Card className="py-0 gap-0 border-gray-100">
            <CardHeader className="px-6 pt-5 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900">
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="flex items-start justify-between gap-6">
                <InfoField label="First Name" value={profile.firstName} />
                <InfoField label="Last Name"  value={profile.lastName} />
              </div>
            </CardContent>
          </Card>

          {/* Contact info card */}
          <Card className="py-0 gap-0 border-gray-100">
            <CardHeader className="px-6 pt-5 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="flex items-start justify-between gap-6">
                <InfoField label="Email Address" value={profile.email} />
                <InfoField label="Phone Number"  value={profile.phone} />
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      <Footer />

      <EditModal
        isOpen={editOpen}
        profile={profile}
        onClose={() => setEditOpen(false)}
        onSave={updated => setProfile(updated)}
      />
    </div>
  );
}
