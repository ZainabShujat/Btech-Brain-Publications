import { BOOKS } from '@/data/books';
import { Book } from '@/lib/types';

export async function getBooks(): Promise<Book[]> {
  return BOOKS;
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  return BOOKS.find((b) => b.slug === slug);
}
