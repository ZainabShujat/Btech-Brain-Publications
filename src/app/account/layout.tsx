'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { useAuth } from '@/hooks/useAuth';
import { BookOpen, Package, CreditCard, Settings, User, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { label: 'Overview', href: '/account', icon: User },
    { label: 'My Digital Library', href: '/account/library', icon: BookOpen },
    { label: 'Order History', href: '/account/orders', icon: Package },
    { label: 'Subscription', href: '/account/subscriptions', icon: CreditCard },
    { label: 'Settings', href: '/account/settings', icon: Settings },
  ];

  return (
    <div className="py-10 space-y-6">
      <Container>
        {/* Account Header */}
        <div className="pb-6 border-b border-[#E7E5E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1C1917] text-[#FAF9F5] flex items-center justify-center font-serif font-bold text-xl shadow-sm">
              {user ? user.name.split(' ').map((n) => n[0]).join('') : 'R'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-[#1C1917]">
                  {user ? user.name : 'Reader Portal'}
                </h1>
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] rounded-sm font-semibold">
                  Demo Account
                </span>
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 bg-[#F3EFE6] text-[#57534E] border border-[#E7E5E4] rounded-sm">
                  {user?.role || 'Subscriber'}
                </span>
              </div>
              <p className="text-xs font-mono text-[#78716C] mt-0.5">
                {user?.email || 'reader@btechbrain.pub'} · Sample Reader Persona
              </p>
            </div>
          </div>
        </div>

        {/* Demo Account Info Banner */}
        <div className="p-4 bg-[#F3EFE6] border border-[#E7E5E4] rounded-sm text-xs text-[#57534E] flex items-start gap-3">
          <Info className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-[#1C1917] font-semibold">Simulated Demo Account</strong>
            <p className="leading-relaxed">
              You are currently viewing a pre-populated demo reader profile so you can test the <strong>Digital Library</strong>, reading progress sync, and simulated order fulfillment. This platform was built during an e-commerce web development internship and is under development as it grows into a live publication.
            </p>
          </div>
        </div>

        {/* Two-column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
          {/* Sidebar Nav */}
          <aside className="md:col-span-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white border border-[#E7E5E4] text-[#1C1917] font-semibold shadow-sm'
                      : 'text-[#57534E] hover:bg-[#F3EFE6] hover:text-[#1C1917]'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-[#B45309]' : 'text-[#78716C]')} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </aside>

          {/* Main Account View */}
          <main className="md:col-span-9">{children}</main>
        </div>
      </Container>
    </div>
  );
}
