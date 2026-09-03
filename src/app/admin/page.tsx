import React from 'react';
import Link from 'next/link';
import { getArticles } from '@/lib/services/articles';
import { getMagazines } from '@/lib/services/magazines';
import { getBooks } from '@/lib/services/books';
import { getAdminMetrics } from '@/lib/services/admin';
import { formatPrice, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  DollarSign,
  ShoppingBag,
  Users,
  FileText,
  BookOpen,
  ArrowUpRight,
  Plus,
  TrendingUp,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const [metrics, articles, magazines, books] = await Promise.all([
    getAdminMetrics(),
    getArticles(),
    getMagazines(),
    getBooks(),
  ]);

  const stats = [
    { label: 'Total Revenue', value: metrics.totalRevenue, change: metrics.revenueChange, icon: DollarSign },
    { label: 'Active Subscribers', value: metrics.activeSubscribers, change: metrics.subscribersChange, icon: Users },
    { label: 'Magazine Sales', value: metrics.magazineSales, change: metrics.magazineStatus, icon: BookOpen },
    { label: 'Book Monographs', value: metrics.bookMonographs, change: metrics.bookStatus, icon: FileText },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E7E5E4] gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#B45309] font-medium">
            Editorial Operations
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#1C1917] mt-0.5">
            Publisher Overview
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/articles">
            <Button variant="primary" size="sm" className="gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Draft New Essay</span>
            </Button>
          </Link>
          <Link href="/admin/magazines">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>New Issue</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-5 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial space-y-2"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#78716C]">
                <span>{stat.label}</span>
                <Icon className="w-4 h-4 text-[#B45309]" />
              </div>
              <div className="text-2xl font-serif font-bold text-[#1C1917]">
                {stat.value}
              </div>
              <div className="text-[11px] font-mono text-[#166534] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Essays & Management Table */}
      <div className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F3EFE6]">
          <h3 className="font-serif font-bold text-lg text-[#1C1917]">
            Active Catalog: Essays & Field Notes ({articles.length})
          </h3>
          <Link href="/admin/articles" className="text-xs font-mono text-[#B45309] hover:underline">
            Manage All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E7E5E4] text-[#78716C] font-mono">
                <th className="pb-2 font-medium">ESSAY TITLE</th>
                <th className="pb-2 font-medium">TOPIC</th>
                <th className="pb-2 font-medium">READ TIME</th>
                <th className="pb-2 font-medium">DATE</th>
                <th className="pb-2 font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F3EFE6]">
              {articles.slice(0, 5).map((art) => (
                <tr key={art.id} className="hover:bg-[#FAF9F5]">
                  <td className="py-3 font-serif font-medium text-sm text-[#1C1917] max-w-xs truncate pr-4">
                    <Link href={`/articles/${art.slug}`} className="hover:text-[#B45309]">
                      {art.title}
                    </Link>
                  </td>
                  <td className="py-3 font-mono text-[#57534E]">{art.category.name}</td>
                  <td className="py-3 font-mono text-[#78716C]">{art.readingTimeMinutes} min</td>
                  <td className="py-3 font-mono text-[#78716C]">{formatDate(art.publishedAt)}</td>
                  <td className="py-3">
                    <Badge variant="success">Published</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Published Magazines & Monograph Volumes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Magazines Overview */}
        <div className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EFE6]">
            <h3 className="font-serif font-bold text-lg text-[#1C1917]">
              Magazine Issues ({magazines.length})
            </h3>
            <Link href="/admin/magazines" className="text-xs font-mono text-[#B45309] hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {magazines.map((mag) => (
              <div key={mag.id} className="flex items-center justify-between p-3 bg-[#FAF9F5] border border-[#E7E5E4] rounded-sm">
                <div>
                  <div className="font-serif font-bold text-sm text-[#1C1917]">
                    Issue 0{mag.issueNumber}: {mag.title}
                  </div>
                  <div className="text-[11px] font-mono text-[#78716C]">
                    {mag.articles.length} articles · {mag.pageCount} pages · Digital ${mag.digitalPrice}
                  </div>
                </div>
                <Badge variant="accent">In Print</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Books Overview */}
        <div className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F3EFE6]">
            <h3 className="font-serif font-bold text-lg text-[#1C1917]">
              Monographs & Books ({books.length})
            </h3>
            <Link href="/admin/books" className="text-xs font-mono text-[#B45309] hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {books.map((book) => (
              <div key={book.id} className="flex items-center justify-between p-3 bg-[#FAF9F5] border border-[#E7E5E4] rounded-sm">
                <div>
                  <div className="font-serif font-bold text-sm text-[#1C1917]">
                    {book.title}
                  </div>
                  <div className="text-[11px] font-mono text-[#78716C]">
                    Editor: {book.author} · {book.pageCount} pages
                  </div>
                </div>
                <Badge variant={book.status === 'published' ? 'success' : 'subtle'}>
                  {book.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
