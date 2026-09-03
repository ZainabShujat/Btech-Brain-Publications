'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addItem } = useCart();

  const handleAddDigital = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: book.id,
      variantId: `${book.id}_digital`,
      title: book.title,
      format: 'digital',
      productType: 'book',
      unitPrice: book.digitalPrice,
      quantity: 1,
      coverImage: book.coverImage,
      slug: book.slug,
    });
  };

  const getStatusBadge = () => {
    switch (book.status) {
      case 'published':
        return <Badge variant="success">In Print & Digital</Badge>;
      case 'coming_soon':
        return <Badge variant="accent">Coming Late 2026</Badge>;
      case 'preview_edition':
        return <Badge variant="outline">Preview Chapters Available</Badge>;
    }
  };

  return (
    <div className="group flex flex-col justify-between bg-white border border-[#E7E5E4] rounded-sm p-6 transition-all duration-300 hover:shadow-editorial hover:border-[#D6D3D1]">
      <div>
        {/* Book Cover Container with physical book shadow */}
        <div className="relative w-full aspect-[3/4] mb-6 bg-[#F3EFE6] rounded-sm overflow-hidden shadow-book flex items-center justify-center">
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 360px"
            />
          ) : (
            <div className="p-4 text-center">
              <span className="font-serif font-bold text-lg text-[#1C1917]">{book.title}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 mb-2">
          {getStatusBadge()}
          <span className="text-[11px] font-mono text-[#78716C]">{book.pageCount} pages</span>
        </div>

        <h3 className="font-serif text-xl font-bold text-[#1C1917] leading-snug tracking-tight group-hover:text-[#B45309] transition-colors mb-1">
          <Link href={`/books/${book.slug}`}>
            {book.title}
          </Link>
        </h3>

        <div className="text-xs font-mono text-[#78716C] mb-3">
          Edited by {book.author} · {book.publisher}
        </div>

        <p className="text-sm text-[#57534E] line-clamp-3 leading-relaxed mb-6">
          {book.description}
        </p>
      </div>

      <div className="pt-4 border-t border-[#F3EFE6] flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-[#78716C]">FROM</span>
          <span className="text-base font-bold font-mono text-[#1C1917]">
            {formatPrice(book.digitalPrice)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {book.status === 'published' && (
            <Button
              onClick={handleAddDigital}
              variant="outline"
              size="sm"
              className="p-2"
              title="Add digital edition to bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#B45309]" />
            </Button>
          )}
          <Link href={`/books/${book.slug}`}>
            <Button variant="secondary" size="sm" className="gap-1 text-xs">
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
