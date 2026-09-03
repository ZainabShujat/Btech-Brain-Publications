'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MagazineIssue } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { BookOpen, ShoppingBag, ArrowRight } from 'lucide-react';

interface MagazineCardProps {
  magazine: MagazineIssue;
}

export function MagazineCard({ magazine }: MagazineCardProps) {
  const { addItem } = useCart();

  const handleAddDigital = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: magazine.id,
      variantId: `${magazine.id}_digital`,
      title: `Issue 0${magazine.issueNumber}: ${magazine.title}`,
      format: 'digital',
      productType: 'magazine',
      unitPrice: magazine.digitalPrice,
      quantity: 1,
      coverImage: magazine.coverImage,
      slug: magazine.slug,
    });
  };

  return (
    <div className="group flex flex-col md:flex-row gap-6 p-6 bg-white border border-[#E7E5E4] rounded-sm transition-all duration-300 hover:shadow-editorial hover:border-[#D6D3D1]">
      {/* Cover Image Presentation with realistic book/magazine drop shadow */}
      <div className="relative w-full md:w-56 aspect-[3/4] shrink-0 bg-[#F3EFE6] rounded-sm overflow-hidden shadow-book">
        {magazine.coverImage ? (
          <Image
            src={magazine.coverImage}
            alt={magazine.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 224px"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F3EFE6]">
            <BookOpen className="w-8 h-8 text-[#B45309] mb-2" />
            <span className="font-serif font-bold text-base text-[#1C1917]">
              ISSUE 0{magazine.issueNumber}
            </span>
          </div>
        )}
      </div>

      {/* Magazine Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge variant="accent">ISSUE 0{magazine.issueNumber}</Badge>
            <span className="text-xs font-mono text-[#78716C]">
              {magazine.season} · {magazine.pageCount} Pages
            </span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#1C1917] tracking-tight group-hover:text-[#B45309] transition-colors mb-2">
            <Link href={`/magazines/${magazine.slug}`}>
              {magazine.title}
            </Link>
          </h3>

          <p className="text-sm font-serif italic text-[#78716C] mb-3">
            "{magazine.subtitle}"
          </p>

          <p className="text-sm text-[#57534E] leading-relaxed line-clamp-3 mb-4">
            {magazine.description}
          </p>

          {/* Articles preview */}
          <div className="mt-3 pt-3 border-t border-[#F3EFE6]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#78716C] mb-2">
              Featured In This Issue:
            </h4>
            <ul className="space-y-1.5 text-xs text-[#57534E]">
              {magazine.articles.slice(0, 3).map((art, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B45309] shrink-0" />
                  <span className="font-medium text-[#1C1917] truncate">{art.title}</span>
                  <span className="text-[#A8A29E] font-mono">p. {art.pageNumber}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing & CTA footer */}
        <div className="mt-6 pt-4 border-t border-[#E7E5E4] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-[#78716C]">DIGITAL EDITION</span>
              <span className="text-lg font-bold font-mono text-[#1C1917]">
                {formatPrice(magazine.digitalPrice)}
              </span>
            </div>
            {magazine.printPrice && (
              <div className="flex flex-col border-l border-[#E7E5E4] pl-3">
                <span className="text-[11px] font-mono text-[#78716C]">PRINT EDITION</span>
                <span className="text-sm font-semibold font-mono text-[#57534E]">
                  {formatPrice(magazine.printPrice)}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleAddDigital}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Add Digital</span>
            </Button>
            <Link href={`/magazines/${magazine.slug}`}>
              <Button variant="primary" size="sm" className="gap-1">
                <span>View Issue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
