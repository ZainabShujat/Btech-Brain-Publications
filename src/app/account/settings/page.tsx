'use strict';
'use client';

import React, { useState } from 'react';
import { DEMO_USER } from '@/data/user';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

export default function AccountSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(DEMO_USER.name);
  const [email, setEmail] = useState(DEMO_USER.email);
  const [bio, setBio] = useState(DEMO_USER.bio || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h2 className="font-serif font-bold text-2xl text-[#1C1917]">
          Reader Profile & Preferences
        </h2>
        <p className="text-xs text-[#57534E] mt-0.5">
          Manage your personal details and dispatch notifications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial space-y-5">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-[#78716C] mb-1">NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full max-w-md px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#78716C] mb-1">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-md px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#78716C] mb-1">READER BIO</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full max-w-md px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#F3EFE6] flex items-center gap-3">
          <Button type="submit" variant="primary" size="md">
            Save Preferences
          </Button>
          {saved && (
            <span className="text-xs text-[#166534] font-medium flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Saved successfully</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
