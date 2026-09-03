import React from 'react';
import Link from 'next/link';
import { getBooks } from '@/lib/services/books';
import { Container } from '@/components/layout/Container';
import { BookCard } from '@/components/books/BookCard';
import { Badge } from '@/components/ui/Badge';
import { BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Bookstore & Monographs',
  description: 'Original books and treatises written by Zainab Shujat. Hardcover, paperback, and digital editions.',
};

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="py-12 space-y-12">
      <Container>
        {/* Bookstore Header */}
        <div className="max-w-3xl space-y-4 mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#B45309] font-medium flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The Independent Press Bookstore</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1917] tracking-tight">
            Monographs & Bound Volumes
          </h1>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Extended treatises edited by Zainab Shujat. Printed in archival hardcover and paperback runs with Smythe-sewn lay-flat binding, plus DRM-free digital editions.
          </p>
          <div className="p-3 bg-[#F3EFE6] border border-[#E7E5E4] rounded-sm text-xs font-mono text-[#78716C]">
            CATALOG NOTE: All sample monographs are demonstration titles published as part of the Notes From a B.Tech Brain independent press ecosystem.
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </Container>
    </div>
  );
}
