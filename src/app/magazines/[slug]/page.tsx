'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { MAGAZINES } from '@/data/magazines';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { ArrowLeft, ShoppingBag, BookOpen, Check, FileText, Download } from 'lucide-react';

export default function MagazineDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const magazine = MAGAZINES.find((m) => m.slug === slug);

  if (!magazine) {
    return notFound();
  }

  const { addItem } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<'digital' | 'print'>('digital');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const currentPrice =
    selectedFormat === 'digital'
      ? magazine.digitalPrice
      : magazine.printPrice || 22;

  const handleAddToCart = () => {
    addItem({
      productId: magazine.id,
      variantId: `${magazine.id}_${selectedFormat}`,
      title: `Issue 0${magazine.issueNumber}: ${magazine.title}`,
      subtitle: `${selectedFormat.toUpperCase()} EDITION`,
      format: selectedFormat,
      productType: 'magazine',
      unitPrice: currentPrice,
      quantity: selectedFormat === 'digital' ? 1 : quantity,
      coverImage: magazine.coverImage,
      slug: magazine.slug,
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="py-10 space-y-12">
      {/* Back Link */}
      <Container>
        <div className="pb-6 border-b border-[#E7E5E4]">
          <Link
            href="/magazines"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#78716C] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Magazine Archive</span>
          </Link>
        </div>
      </Container>

      {/* Main Product Presentation */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Cover Display */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-4">
              <div className="relative w-full aspect-[3/4] bg-[#F3EFE6] rounded-sm overflow-hidden shadow-book border border-[#E7E5E4]">
                {magazine.coverImage && (
                  <Image
                    src={magazine.coverImage}
                    alt={magazine.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              <div className="text-center">
                <span className="text-xs font-mono text-[#78716C]">
                  {magazine.pageCount} Pages · Printed on 90gsm Tactile Paper
                </span>
              </div>
            </div>
          </div>

          {/* Product Details & Purchase Controls */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="accent">ISSUE 0{magazine.issueNumber}</Badge>
                <span className="text-xs font-mono text-[#78716C]">
                  {magazine.season} · VOLUME {magazine.volumeNumber}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.15]">
                {magazine.title}
              </h1>

              <p className="font-serif italic text-xl text-[#78716C] mt-2">
                "{magazine.subtitle}"
              </p>
            </div>

            <p className="text-[#57534E] text-base leading-relaxed">
              {magazine.description}
            </p>

            {/* Edition Format Selector */}
            <div className="p-6 bg-[#F3EFE6] border border-[#E7E5E4] rounded-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#78716C] font-semibold block">
                Select Edition Format
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Digital */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('digital')}
                  className={`p-4 rounded-sm border text-left transition-all ${
                    selectedFormat === 'digital'
                      ? 'bg-white border-[#B45309] shadow-sm ring-1 ring-[#B45309]'
                      : 'bg-white/60 border-[#E7E5E4] hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-serif font-bold text-sm text-[#1C1917]">
                      Digital Edition
                    </span>
                    <span className="font-mono font-bold text-base text-[#1C1917]">
                      {formatPrice(magazine.digitalPrice)}
                    </span>
                  </div>
                  <p className="text-xs text-[#78716C] leading-snug">
                    DRM-free PDF & ePub + Instant Web Reader Access.
                  </p>
                </button>

                {/* Print */}
                {magazine.isAvailableInPrint && (
                  <button
                    type="button"
                    onClick={() => setSelectedFormat('print')}
                    className={`p-4 rounded-sm border text-left transition-all ${
                      selectedFormat === 'print'
                        ? 'bg-white border-[#B45309] shadow-sm ring-1 ring-[#B45309]'
                        : 'bg-white/60 border-[#E7E5E4] hover:bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-serif font-bold text-sm text-[#1C1917]">
                        Print + Digital
                      </span>
                      <span className="font-mono font-bold text-base text-[#1C1917]">
                        {formatPrice(magazine.printPrice || 22)}
                      </span>
                    </div>
                    <p className="text-xs text-[#78716C] leading-snug">
                      Limited physical run. Includes immediate digital access.
                    </p>
                  </button>
                )}
              </div>

              {/* Quantity (for print only) & Add Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {selectedFormat === 'print' && (
                  <div className="flex items-center justify-between border border-[#D6D3D1] bg-white rounded-sm px-3 py-2 text-sm">
                    <span className="text-xs font-mono text-[#78716C] mr-3">QTY</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2 text-[#78716C] hover:text-[#1C1917]"
                      >
                        -
                      </button>
                      <span className="font-mono font-semibold">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2 text-[#78716C] hover:text-[#1C1917]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  className="flex-1 gap-2"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-5 h-5 text-[#86EFAC]" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-[#D97706]" />
                      <span>
                        Add to Bag — {formatPrice(currentPrice * (selectedFormat === 'print' ? quantity : 1))}
                      </span>
                    </>
                  )}
                </Button>
              </div>

              <div className="text-xs text-[#78716C] text-center sm:text-left flex items-center gap-1.5 pt-1">
                <Check className="w-3.5 h-3.5 text-[#166534]" />
                <span>Patrons with an active subscription receive this volume free in their library.</span>
              </div>
            </div>

            {/* Complete Table of Contents */}
            <div className="space-y-4 pt-4 border-t border-[#E7E5E4]">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-2xl text-[#1C1917]">
                  Table of Contents
                </h3>
                <span className="text-xs font-mono text-[#78716C]">
                  {magazine.articles.length} Works Included
                </span>
              </div>

              <div className="divide-y divide-[#E7E5E4] border border-[#E7E5E4] bg-white rounded-sm">
                {magazine.articles.map((art, idx) => (
                  <div key={idx} className="p-4 sm:p-5 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#B45309] font-semibold">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-mono text-[#78716C]">
                          {art.category} · {art.readingTime} min
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#1C1917]">
                        {art.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#57534E] max-w-xl">
                        {art.summary}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-xs font-mono text-[#78716C] block">
                        Page {art.pageNumber}
                      </span>
                      {art.articleId.startsWith('art_0') && (
                        <Link
                          href={`/articles/the-art-of-the-first-principles-debugger`}
                          className="text-[11px] font-mono text-[#B45309] hover:underline mt-1 inline-block"
                        >
                          Web Preview →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Colophon */}
            <div className="p-5 bg-[#FAF9F5] border border-[#E7E5E4] rounded-sm text-xs font-mono text-[#78716C] space-y-1.5">
              <div><strong>PUBLISHER:</strong> Notes From a B.Tech Brain Press</div>
              <div><strong>EDITOR & CURATOR:</strong> Zainab Shujat</div>
              <div><strong>SPECIFICATIONS:</strong> 96 Pages, Perfect Bound, 90gsm Uncoated Stock</div>
              <div><strong>FORMATS:</strong> Interactive PDF, Reflowable ePub, Physical Softcover</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
