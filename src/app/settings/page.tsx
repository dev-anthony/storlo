'use client';
import React, { useState } from 'react';
import { HeaderAuth } from '@/components/header-auth';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleRow } from '@/app/settings/components/toggle-row';
import { ChangePasswordModal } from '@/app/settings/components/change-password-modal';

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts]   = useState(false);
  const [systemNotifs]                  = useState(true);   // always on, no setter
  const [changePassOpen, setChangePassOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <HeaderAuth />

      {/* No hero section — straight into content */}
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="w-full max-w-2xl flex flex-col gap-4">

          {/* ── Card 1: Notifications ── */}
          <Card className="py-0 gap-0 border-gray-100">
            <CardHeader className="px-6 pt-5 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900">
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6 flex flex-col gap-5">
              <ToggleRow
                title="Enable Email Alerts for Errors"
                description="Receive notifications by email"
                enabled={emailAlerts}
                onToggle={() => setEmailAlerts(p => !p)}
              />
              <div className="border-t border-gray-100" />
              <ToggleRow
                title="System Notifications"
                description="Receive in-app system notifications"
                enabled={systemNotifs}
                disabled
                onToggle={() => {}}
              />
            </CardContent>
          </Card>

          {/* ── Card 2: Security ── */}
          <Card className="py-0 gap-0 border-gray-100">
            <CardHeader className="px-6 pt-5 pb-3">
              <CardTitle className="text-sm font-semibold text-gray-900">
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium text-gray-900">Change Password</p>
                  <p className="text-xs text-gray-400">Update your login details</p>
                </div>
                <Button
                  onClick={() => setChangePassOpen(true)}
                  className="shrink-0 rounded-3xl h-auto py-2 px-5 bg-white text-gray-900 shadow-md border-2 border-gray-900 hover:bg-gray-50 text-sm font-medium shadow-none"
                >
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      <Footer />

      <ChangePasswordModal
        isOpen={changePassOpen}
        onClose={() => setChangePassOpen(false)}
      />
    </div>
  );
}
