import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MAGAZINES } from '@/data/magazines';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { Plus, Eye, BookOpen } from 'lucide-react';

export default function AdminMagazinesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E5E4] gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1C1917]">
            Magazine Issues & Table of Contents
          </h2>
          <p className="text-xs text-[#57534E] mt-0.5">
            Configure monthly periodicals, upload digital editions, and set pricing.
          </p>
        </div>

        <Button variant="primary" size="sm" className="gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>New Monthly Issue</span>
        </Button>
      </div>

      <div className="space-y-4">
        {MAGAZINES.map((mag) => (
          <div
            key={mag.id}
            className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial flex flex-col md:flex-row gap-6 items-start justify-between"
          >
            <div className="flex gap-4">
              <div className="relative w-20 h-28 shrink-0 bg-[#F3EFE6] rounded-sm overflow-hidden border border-[#E7E5E4] shadow-sm">
                {mag.coverImage && (
                  <Image
                    src={mag.coverImage}
                    alt={mag.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="accent">ISSUE 0{mag.issueNumber}</Badge>
                  <span className="text-xs font-mono text-[#78716C]">
                    {mag.season} · {mag.pageCount} Pages
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#1C1917]">
                  {mag.title}
                </h3>
                <p className="text-xs font-serif italic text-[#78716C]">
                  "{mag.subtitle}"
                </p>
                <div className="pt-2 text-xs font-mono text-[#57534E]">
                  Digital: <strong>{formatPrice(mag.digitalPrice)}</strong> | Print: <strong>{formatPrice(mag.printPrice || 22)}</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <Link href={`/magazines/${mag.slug}`}>
                <Button variant="outline" size="sm" className="gap-1 text-xs">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Public View</span>
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
