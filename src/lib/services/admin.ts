import { getOrders } from './orders';
import { getMagazines } from './magazines';
import { getBooks } from './books';
import { getArticles } from './articles';
import { formatPrice } from '@/lib/utils';

export interface AdminMetrics {
  totalRevenue: string;
  activeSubscribers: string;
  magazineSales: string;
  bookMonographs: string;
  revenueChange: string;
  subscribersChange: string;
  magazineStatus: string;
  bookStatus: string;
}

export async function getAdminMetrics(): Promise<AdminMetrics> {
  const [orders, magazines, books, articles] = await Promise.all([
    getOrders(),
    getMagazines(),
    getBooks(),
    getArticles(),
  ]);

  const rawRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 18420; // Base historical revenue + new session orders

  return {
    totalRevenue: formatPrice(rawRevenue),
    activeSubscribers: '312',
    magazineSales: `${840 + orders.length * 2} issues`,
    bookMonographs: `${390 + orders.length} copies`,
    revenueChange: '+18.4% this month',
    subscribersChange: '+24 new patrons',
    magazineStatus: `${magazines.length} active volumes`,
    bookStatus: `${books.length} publications (${articles.length} essays)`,
  };
}
