'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { SITE_CONFIG } from '@/lib/constants';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Bookmark,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Articles', href: '/admin/articles', icon: FileText },
    { label: 'Magazines', href: '/admin/magazines', icon: BookOpen },
    { label: 'Books', href: '/admin/books', icon: Bookmark },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Subscribers', href: '/admin/subscribers', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Editorial Publisher Banner */}
      <div className="bg-[#1C1917] text-[#FAF9F5] py-3 border-b border-[#292524]">
        <Container size="wide" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-mono text-[#D6D3D1] hover:text-white flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Exit to Public Site</span>
            </Link>
            <span className="text-[#57534E]">|</span>
            <span className="font-serif font-bold text-sm tracking-wide">
              {SITE_CONFIG.shortName} · Publisher Desk
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#A8A29E]">
            <span className="w-2 h-2 rounded-full bg-[#166534] inline-block animate-pulse" />
            <span>Editor: {SITE_CONFIG.founder}</span>
          </div>
        </Container>
      </div>

      <Container size="wide" className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Admin Sidebar */}
          <aside className="lg:col-span-3 space-y-1">
            <div className="p-3 mb-2 bg-[#F3EFE6] rounded-sm border border-[#E7E5E4] text-xs font-mono text-[#78716C]">
              PRESS MANAGEMENT PORTAL
            </div>

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

          {/* Admin Main Body */}
          <main className="lg:col-span-9">{children}</main>
        </div>
      </Container>
    </div>
  );
}
