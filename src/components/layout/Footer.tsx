import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { Container } from './Container';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#F3EFE6] border-t border-[#E7E5E4] mt-24">
      {/* Top Banner / Publication Purpose */}
      <div className="border-b border-[#E7E5E4] py-12">
        <Container className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6">
            <span className="font-serif text-2xl font-bold text-[#1C1917] block mb-2">
              {SITE_CONFIG.name}
            </span>
            <p className="text-sm text-[#57534E] leading-relaxed max-w-md">
              An independent editorial publication created and edited by {SITE_CONFIG.founder}. Dedicated to the craft of engineering, systems thinking, computational science, and the lived experience of figuring things out.
            </p>
            <div className="mt-4 text-xs font-mono text-[#78716C]">
              ISSN (Digital Edition Pending) · Printed in Limited Archival Runs
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#1C1917] font-semibold mb-3">
              Publications
            </h4>
            <ul className="space-y-2 text-sm text-[#57534E]">
              <li>
                <Link href="/articles" className="hover:text-[#B45309] transition-colors">
                  The Essay Archive
                </Link>
              </li>
              <li>
                <Link href="/magazines" className="hover:text-[#B45309] transition-colors">
                  Monthly Magazine Issues
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover:text-[#B45309] transition-colors">
                  Monographs & Books
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="hover:text-[#B45309] transition-colors">
                  Subscription & Patronage
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#1C1917] font-semibold mb-3">
              Reader Desk
            </h4>
            <ul className="space-y-2 text-sm text-[#57534E]">
              <li>
                <Link href="/account/library" className="hover:text-[#B45309] transition-colors">
                  My Digital Library
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-[#B45309] transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#B45309] transition-colors">
                  About the Publication
                </Link>
              </li>

            </ul>
          </div>
        </Container>
      </div>

      {/* Colophon & Bottom Bar */}
      <div className="py-6 text-xs text-[#78716C] bg-[#E8E2D5]/50">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            {SITE_CONFIG.copyrightNotice}
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <span>TYPESET IN PLAYFAIR & INTER</span>
            <span>·</span>
            <span>HOSTED ON NEXT.JS</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
