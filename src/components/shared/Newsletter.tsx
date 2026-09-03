'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Mail, CheckCircle2 } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden rounded-md border border-[#E7E5E4] bg-[#F3EFE6] p-8 md:p-12">
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-[#E8E2D5] text-[#92400E] text-xs font-mono tracking-wider uppercase">
          <Mail className="w-3.5 h-3.5" />
          <span>The Monthly Reader Dispatch</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917] tracking-tight mb-3">
          Turn things worth reading into things worth keeping.
        </h3>

        <p className="text-[#57534E] text-sm md:text-base leading-relaxed mb-6">
          Every month, Zainab publishes a curated digital dispatch: unreleased field notes, annotated papers, architectural diagrams, and early drafts of upcoming book chapters. No spam, no algorithmic noise.
        </p>

        {isSubmitted ? (
          <div className="inline-flex items-center gap-2 p-4 bg-[#FAF9F5] border border-[#BBF7D0] rounded text-[#166534] text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-[#166534]" />
            <span>Welcome to the colophon. A confirmation dispatch has been sent.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-2.5 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#B45309]"
            />
            <Button type="submit" variant="primary" size="md">
              Subscribe Free
            </Button>
          </form>
        )}

        <div className="mt-4 text-xs text-[#78716C]">
          Sent on the first Tuesday of each month · Instant one-click unsubscribe
        </div>
      </div>
    </div>
  );
}
