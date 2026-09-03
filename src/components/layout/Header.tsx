'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingBag, BookOpen, User, Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="w-full bg-[#FAF9F5] border-b border-[#E7E5E4] sticky top-0 z-40">
      {/* Editorial Top Bar / Gazette Dateline */}
      <div className="border-b border-[#E7E5E4] bg-[#F3EFE6] text-[11px] font-mono text-[#78716C] py-1.5 hidden md:block">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>VOL. 1 · NO. 2</span>
            <span>AUTUMN 2026</span>
            <span className="text-[#B45309]">AN INDEPENDENT ENGINEERING PRESS</span>
          </div>
          <div className="flex items-center gap-6">
            <span>FOUNDED & EDITED BY {SITE_CONFIG.founder.toUpperCase()}</span>
            <Link href="/subscribe" className="hover:text-[#1C1917] underline decoration-[#B45309]">
              BECOME A PATRON
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Masthead Banner */}
      <div className="py-4 md:py-6 border-b border-[#E7E5E4]">
        <Container className="flex items-center justify-between">
          {/* Logo / Publication Name */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#B45309] transition-colors">
              {SITE_CONFIG.name}
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#78716C] mt-0.5">
              Articles · Monthly Magazines · Monographs · Digital Library
            </span>
          </Link>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE6] rounded-sm transition-colors"
              aria-label="Search"
              title="Search publication"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Digital Library Shortcut */}
            <Link
              href="/account/library"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE6] rounded-sm border border-transparent hover:border-[#E7E5E4] transition-colors"
              title="My Digital Library"
            >
              <BookOpen className="w-4 h-4 text-[#B45309]" />
              <span>Library</span>
            </Link>

            {/* Account Link */}
            <Link
              href="/account"
              className="p-2 text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE6] rounded-sm transition-colors"
              aria-label="User Account"
              title={isAuthenticated ? "Reader Account (Logged in)" : "Account"}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 px-3 py-2 bg-[#1C1917] text-[#FAF9F5] hover:bg-[#292524] rounded-sm text-xs font-mono transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#D97706]" />
              <span className="hidden sm:inline">Bag</span>
              {itemCount > 0 && (
                <span className="bg-[#B45309] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-[#57534E] hover:text-[#1C1917] rounded-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Primary Navigation Bar (Desktop) */}
      <nav className="hidden md:block bg-[#FAF9F5]">
        <Container className="flex items-center justify-between">
          <ul className="flex items-center space-x-1 lg:space-x-2 py-2.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'px-3.5 py-1 text-sm font-medium transition-colors tracking-wide rounded-sm',
                      isActive
                        ? 'text-[#1C1917] bg-[#F3EFE6] font-semibold'
                        : 'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE6]'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4 text-xs font-mono text-[#78716C]">
            <span className="italic">"Turn things worth reading into things worth keeping."</span>
          </div>
        </Container>
      </nav>

      {/* Quick Search Dropdown Bar */}
      {searchOpen && (
        <div className="border-b border-[#E7E5E4] bg-[#F3EFE6] py-3 animate-in fade-in duration-200">
          <Container>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/articles?q=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
              className="flex items-center gap-2 max-w-xl mx-auto"
            >
              <Search className="w-4 h-4 text-[#78716C]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all essays, chapters, and issues..."
                autoFocus
                className="w-full bg-white px-3 py-1.5 text-sm border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#1C1917] text-white text-xs font-mono rounded-sm hover:bg-[#292524]"
              >
                Search
              </button>
            </form>
          </Container>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E7E5E4] bg-[#FAF9F5] p-4 space-y-3">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-base font-serif font-medium text-[#1C1917] hover:bg-[#F3EFE6] rounded-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-[#E7E5E4]">
              <Link
                href="/account/library"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[#B45309] font-medium"
              >
                <BookOpen className="w-4 h-4" />
                <span>My Digital Library</span>
              </Link>
            </li>

          </ul>
        </div>
      )}
    </header>
  );
}
