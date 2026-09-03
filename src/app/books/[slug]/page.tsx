'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { BOOKS } from '@/data/books';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { ArrowLeft, ShoppingBag, BookOpen, Star, Check, Bookmark } from 'lucide-react';

export default function BookDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const book = BOOKS.find((b) => b.slug === slug);

  if (!book) {
    return notFound();
  }

  const { addItem } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<'digital' | 'paperback' | 'hardcover'>('digital');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'toc' | 'sample' | 'reviews'>('overview');

  const getFormatPrice = (fmt: 'digital' | 'paperback' | 'hardcover') => {
    switch (fmt) {
      case 'digital':
        return book.digitalPrice;
      case 'paperback':
        return book.printPrice ? book.printPrice - 8 : 26;
      case 'hardcover':
        return book.printPrice || 34;
    }
  };

  const currentPrice = getFormatPrice(selectedFormat);

  const handleAddToCart = () => {
    addItem({
      productId: book.id,
      variantId: `${book.id}_${selectedFormat}`,
      title: book.title,
      subtitle: `${selectedFormat.toUpperCase()} EDITION`,
      format: selectedFormat === 'digital' ? 'digital' : 'print',
      productType: 'book',
      unitPrice: currentPrice,
      quantity: selectedFormat === 'digital' ? 1 : quantity,
      coverImage: book.coverImage,
      slug: book.slug,
    });

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div className="py-10 space-y-12">
      {/* Breadcrumb Back Link */}
      <Container>
        <div className="pb-6 border-b border-[#E7E5E4]">
          <Link
            href="/books"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#78716C] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Bookstore</span>
          </Link>
        </div>
      </Container>

      {/* Main Presentation */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Cover Presentation */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-4">
              <div className="relative w-full aspect-[3/4] bg-[#F3EFE6] rounded-sm overflow-hidden shadow-book border border-[#E7E5E4]">
                {book.coverImage && (
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              <div className="text-center space-y-1">
                <span className="text-xs font-mono text-[#78716C] block">
                  {book.pageCount} Pages · Archival Smyth-Sewn Layflat Binding
                </span>
                {book.isbn && (
                  <span className="text-[11px] font-mono text-[#A8A29E] block">
                    ISBN: {book.isbn}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Book Details & Purchasing */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant={book.status === 'published' ? 'success' : 'accent'}>
                  {book.status === 'published' ? 'Published' : 'Coming Soon'}
                </Badge>
                <span className="text-xs font-mono text-[#78716C]">
                  {book.genre}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.15]">
                {book.title}
              </h1>

              <p className="font-serif italic text-xl text-[#78716C] mt-2">
                "{book.subtitle}"
              </p>

              <div className="mt-4 pt-3 border-t border-[#E7E5E4] flex items-center gap-3">
                <div className="text-sm font-medium text-[#1C1917]">
                  Edited by <strong>{book.author}</strong>
                </div>
                <span className="text-xs text-[#78716C]">·</span>
                <div className="text-xs font-mono text-[#78716C]">
                  Published by {book.publisher}
                </div>
              </div>
            </div>

            <p className="text-[#57534E] text-base leading-relaxed">
              {book.description}
            </p>

            {/* Format Selection Card */}
            <div className="p-6 bg-[#F3EFE6] border border-[#E7E5E4] rounded-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#78716C] font-semibold block">
                Choose Format & Edition
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Digital */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('digital')}
                  className={`p-3.5 rounded-sm border text-left transition-all ${
                    selectedFormat === 'digital'
                      ? 'bg-white border-[#B45309] ring-1 ring-[#B45309]'
                      : 'bg-white/60 border-[#E7E5E4] hover:bg-white'
                  }`}
                >
                  <div className="font-serif font-bold text-sm text-[#1C1917]">Digital</div>
                  <div className="text-xs text-[#78716C]">ePub + PDF</div>
                  <div className="font-mono font-bold text-sm text-[#1C1917] mt-2">
                    {formatPrice(book.digitalPrice)}
                  </div>
                </button>

                {/* Paperback */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('paperback')}
                  className={`p-3.5 rounded-sm border text-left transition-all ${
                    selectedFormat === 'paperback'
                      ? 'bg-white border-[#B45309] ring-1 ring-[#B45309]'
                      : 'bg-white/60 border-[#E7E5E4] hover:bg-white'
                  }`}
                >
                  <div className="font-serif font-bold text-sm text-[#1C1917]">Paperback</div>
                  <div className="text-xs text-[#78716C]">Softcover + eBook</div>
                  <div className="font-mono font-bold text-sm text-[#1C1917] mt-2">
                    {formatPrice(getFormatPrice('paperback'))}
                  </div>
                </button>

                {/* Hardcover */}
                <button
                  type="button"
                  onClick={() => setSelectedFormat('hardcover')}
                  className={`p-3.5 rounded-sm border text-left transition-all ${
                    selectedFormat === 'hardcover'
                      ? 'bg-white border-[#B45309] ring-1 ring-[#B45309]'
                      : 'bg-white/60 border-[#E7E5E4] hover:bg-white'
                  }`}
                >
                  <div className="font-serif font-bold text-sm text-[#1C1917]">Hardcover</div>
                  <div className="text-xs text-[#78716C]">Cloth + Foil + eBook</div>
                  <div className="font-mono font-bold text-sm text-[#1C1917] mt-2">
                    {formatPrice(getFormatPrice('hardcover'))}
                  </div>
                </button>
              </div>

              {/* Purchase CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                {selectedFormat !== 'digital' && (
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
                        Add to Bag — {formatPrice(currentPrice * (selectedFormat !== 'digital' ? quantity : 1))}
                      </span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Editorial Information Tabs */}
            <div className="space-y-6 pt-4 border-t border-[#E7E5E4]">
              <div className="flex items-center gap-4 border-b border-[#E7E5E4] text-sm">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`pb-3 font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'text-[#1C1917] border-b-2 border-[#B45309]'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Overview & Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('toc')}
                  className={`pb-3 font-medium transition-colors ${
                    activeTab === 'toc'
                      ? 'text-[#1C1917] border-b-2 border-[#B45309]'
                      : 'text-[#78716C] hover:text-[#1C1917]'
                  }`}
                >
                  Table of Contents ({book.tableOfContents.length})
                </button>
                {book.sampleChapterText && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('sample')}
                    className={`pb-3 font-medium transition-colors ${
                      activeTab === 'sample'
                        ? 'text-[#1C1917] border-b-2 border-[#B45309]'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    Read Sample Excerpt
                  </button>
                )}
                {book.reviews.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-3 font-medium transition-colors ${
                      activeTab === 'reviews'
                        ? 'text-[#1C1917] border-b-2 border-[#B45309]'
                        : 'text-[#78716C] hover:text-[#1C1917]'
                    }`}
                  >
                    Reader Reviews ({book.reviews.length})
                  </button>
                )}
              </div>

              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-4 text-sm text-[#57534E] leading-relaxed">
                  <p>{book.longDescription}</p>
                  <div className="p-4 bg-white border border-[#E7E5E4] rounded-sm text-xs font-mono text-[#78716C] space-y-1">
                    <div><strong>DIMENSIONS:</strong> {book.dimensions || '6.0 × 9.0 in'}</div>
                    <div><strong>EDITIONS:</strong> Hardcover, Trade Paperback, DRM-Free Digital</div>
                    <div><strong>PRESS:</strong> {book.publisher}</div>
                  </div>
                </div>
              )}

              {/* Tab 2: Table of Contents */}
              {activeTab === 'toc' && (
                <div className="divide-y divide-[#E7E5E4] border border-[#E7E5E4] bg-white rounded-sm">
                  {book.tableOfContents.map((chap) => (
                    <div key={chap.number} className="p-4 space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono text-[#78716C]">
                        <span>CHAPTER 0{chap.number}</span>
                        <span>{chap.pageCount} Pages</span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[#1C1917]">
                        {chap.title}
                      </h4>
                      {chap.description && (
                        <p className="text-xs text-[#57534E]">{chap.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Sample Chapter */}
              {activeTab === 'sample' && book.sampleChapterText && (
                <div className="prose-editorial p-6 bg-white border border-[#E7E5E4] rounded-sm text-sm">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: book.sampleChapterText
                        .replace(/^### (.*$)/gim, '<h3 class="font-serif font-bold text-xl text-[#1C1917] mt-4 mb-2">$1</h3>')
                        .replace(/`([^`]+)`/g, '<code class="bg-[#F3EFE6] text-[#92400E] px-1.5 py-0.5 rounded font-mono text-xs">$1</code>')
                        .replace(/\n\n/g, '</p><p class="mb-3 text-[#57534E] leading-relaxed">')
                        .replace(/^/g, '<p class="mb-3 text-[#57534E] leading-relaxed">')
                        .concat('</p>'),
                    }}
                  />
                </div>
              )}

              {/* Tab 4: Reviews */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {book.reviews.map((rev) => (
                    <div key={rev.id} className="p-5 bg-white border border-[#E7E5E4] rounded-sm space-y-2">
                      <div className="flex items-center gap-1 text-[#D97706]">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="font-serif italic text-sm text-[#1C1917] leading-relaxed">
                        "{rev.comment}"
                      </p>
                      <div className="text-xs font-mono text-[#78716C] pt-1">
                        — {rev.authorName}, {rev.authorTitle}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
