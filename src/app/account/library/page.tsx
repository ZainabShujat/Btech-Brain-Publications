'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LibraryItem } from '@/lib/types';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { BookOpen, Download, ExternalLink, Filter, CheckCircle2 } from 'lucide-react';

export default function LibraryPage() {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'magazine' | 'book'>('all');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/library/items')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
      })
      .catch((e) => console.error('Failed to load library:', e));
  }, []);

  const handleDownload = async (itemId: string, format: 'pdf' | 'epub') => {
    setDownloadingId(`${itemId}-${format}`);
    try {
      const res = await fetch(`/api/library/download?itemId=${encodeURIComponent(itemId)}&format=${format}`);
      const data = await res.json();
      if (data.url) {
        const link = document.createElement('a');
        link.href = data.url;
        link.download = data.fileName || `publication.${format}`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      console.error('Download error:', e);
    } finally {
      setDownloadingId(null);
    }
  };

  const filteredItems = filterType === 'all'
    ? items
    : items.filter((item) => item.type === filterType);

  return (
    <div className="space-y-6">
      {/* Masthead */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-4 border-b border-[#E7E5E4] gap-2">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1C1917]">
            My Digital Library
          </h2>
          <p className="text-xs text-[#57534E] mt-0.5">
            Your personal archive of purchased magazine volumes and books. DRM-free and permanently accessible.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-sm text-xs font-mono transition-colors border ${
              filterType === 'all'
                ? 'bg-[#1C1917] text-white border-[#1C1917]'
                : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-[#F3EFE6]'
            }`}
          >
            All Works ({items.length})
          </button>
          <button
            onClick={() => setFilterType('magazine')}
            className={`px-3 py-1 rounded-sm text-xs font-mono transition-colors border ${
              filterType === 'magazine'
                ? 'bg-[#1C1917] text-white border-[#1C1917]'
                : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-[#F3EFE6]'
            }`}
          >
            Magazines (2)
          </button>
          <button
            onClick={() => setFilterType('book')}
            className={`px-3 py-1 rounded-sm text-xs font-mono transition-colors border ${
              filterType === 'book'
                ? 'bg-[#1C1917] text-white border-[#1C1917]'
                : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-[#F3EFE6]'
            }`}
          >
            Books (1)
          </button>
        </div>
      </div>

      {/* Library Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-5 p-5 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial"
          >
            {/* Cover Thumbnail with realistic shadow */}
            <div className="relative w-full sm:w-28 aspect-[3/4] shrink-0 bg-[#F3EFE6] rounded-sm overflow-hidden shadow-book border border-[#E7E5E4]">
              {item.coverImage && (
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Content & Action Buttons */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <Badge variant={item.type === 'magazine' ? 'accent' : 'subtle'}>
                    {item.type}
                  </Badge>
                  <span className="text-[11px] font-mono text-[#78716C]">
                    Acquired {formatDate(item.acquiredDate)}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-[#1C1917] leading-snug">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="text-xs text-[#57534E] italic mt-0.5 line-clamp-1">
                    "{item.subtitle}"
                  </p>
                )}

                {/* Reading Progress */}
                <div className="mt-3 pt-3 border-t border-[#F3EFE6]">
                  <div className="flex justify-between text-[11px] font-mono text-[#78716C] mb-1">
                    <span>Reading Progress</span>
                    <span>{item.readingProgressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F3EFE6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B45309]"
                      style={{ width: `${item.readingProgressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-[#E7E5E4] flex flex-wrap items-center gap-2">
                <Link
                  href={item.type === 'magazine' ? `/magazines/${item.slug}` : `/books/${item.slug}`}
                  className="flex-1"
                >
                  <Button variant="primary" size="sm" className="w-full gap-1 text-xs">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Issue</span>
                  </Button>
                </Link>

                <button
                  onClick={() => handleDownload(item.id, 'pdf')}
                  disabled={downloadingId === `${item.id}-pdf`}
                  className="px-2.5 py-1.5 bg-[#F3EFE6] hover:bg-[#E8E2D5] border border-[#E7E5E4] rounded-sm text-xs font-mono text-[#1C1917] flex items-center gap-1 transition-colors disabled:opacity-50"
                  title="Download DRM-free PDF"
                >
                  <Download className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>{downloadingId === `${item.id}-pdf` ? 'Preparing...' : 'PDF'}</span>
                </button>

                <button
                  onClick={() => handleDownload(item.id, 'epub')}
                  disabled={downloadingId === `${item.id}-epub`}
                  className="px-2.5 py-1.5 bg-[#F3EFE6] hover:bg-[#E8E2D5] border border-[#E7E5E4] rounded-sm text-xs font-mono text-[#1C1917] flex items-center gap-1 transition-colors disabled:opacity-50"
                  title="Download DRM-free ePub"
                >
                  <Download className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>{downloadingId === `${item.id}-epub` ? 'Preparing...' : 'ePub'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Backend Architecture Note */}
      <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E4] rounded-sm text-xs font-mono text-[#78716C] space-y-1">
        <div className="font-semibold text-[#1C1917]">BACKEND HANDOFF NOTE FOR CLAUDE CODE:</div>
        <div>• Digital downloads currently trigger demo alerts. Hook this up to signed Supabase / S3 storage URLs.</div>
        <div>• Reading progress percent is wired in `src/lib/types.ts` (`LibraryItem.readingProgressPercent`).</div>
      </div>
    </div>
  );
}
