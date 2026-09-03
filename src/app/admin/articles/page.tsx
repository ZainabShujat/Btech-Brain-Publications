'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ARTICLES } from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import { Plus, Edit3, Eye, Trash2, Check, Clock } from 'lucide-react';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState(ARTICLES);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(CATEGORIES[1].slug);
  const [newExcerpt, setNewExcerpt] = useState('');

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const cat = CATEGORIES.find((c) => c.slug === newCategory) || CATEGORIES[1];
    const created = {
      id: `art_${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
      title: newTitle,
      subtitle: 'Newly drafted study from the publisher desk.',
      excerpt: newExcerpt || 'Pending editorial review and technical derivation checking.',
      content: 'Draft content in progress...',
      category: cat,
      author: { name: 'Zainab Shujat', role: 'Editor' },
      readingTimeMinutes: 5,
      publishedAt: new Date().toISOString().split('T')[0],
      status: 'published' as const,
      tags: ['Draft', 'Engineering'],
    };

    setArticles([created, ...articles]);
    setShowModal(false);
    setNewTitle('');
    setNewExcerpt('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E7E5E4] gap-4">
        <div>
          <h2 className="font-serif font-bold text-2xl text-[#1C1917]">
            Article Management & Drafts
          </h2>
          <p className="text-xs text-[#57534E] mt-0.5">
            Manage essays, laboratory dispatches, and schedule releases.
          </p>
        </div>

        <Button
          onClick={() => setShowModal(true)}
          variant="primary"
          size="sm"
          className="gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Article</span>
        </Button>
      </div>

      {/* Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="bg-white border border-[#E7E5E4] rounded-sm max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-[#1C1917]">
              Draft New Technical Essay
            </h3>

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#78716C] mb-1">
                  ESSAY TITLE *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. The Thermodynamics of Cache Invalidation"
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#78716C] mb-1">
                  CATEGORY TOPIC
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                >
                  {CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#78716C] mb-1">
                  EXCERPT / SUBTITLE
                </label>
                <textarea
                  rows={3}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="Brief synopsis of the technical thesis..."
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Publish to Catalog
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Articles Table */}
      <div className="bg-white border border-[#E7E5E4] rounded-sm shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E7E5E4] text-[#78716C] font-mono bg-[#FAF9F5]">
              <th className="p-3.5 font-medium">TITLE</th>
              <th className="p-3.5 font-medium">CATEGORY</th>
              <th className="p-3.5 font-medium">EDITOR</th>
              <th className="p-3.5 font-medium">READ TIME</th>
              <th className="p-3.5 font-medium">DATE</th>
              <th className="p-3.5 font-medium">STATUS</th>
              <th className="p-3.5 font-medium text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3EFE6]">
            {articles.map((art) => (
              <tr key={art.id} className="hover:bg-[#FAF9F5]">
                <td className="p-3.5 font-serif font-medium text-sm text-[#1C1917] max-w-xs">
                  <div className="truncate">{art.title}</div>
                  <span className="text-[11px] font-mono text-[#78716C]">/{art.slug}</span>
                </td>
                <td className="p-3.5 font-mono text-[#57534E]">{art.category.name}</td>
                <td className="p-3.5 font-medium text-[#1C1917]">{art.author.name}</td>
                <td className="p-3.5 font-mono text-[#78716C]">{art.readingTimeMinutes} min</td>
                <td className="p-3.5 font-mono text-[#78716C]">{formatDate(art.publishedAt)}</td>
                <td className="p-3.5">
                  <Badge variant="success">Published</Badge>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <Link
                    href={`/articles/${art.slug}`}
                    className="inline-block p-1 text-[#78716C] hover:text-[#1C1917]"
                    title="View live"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
