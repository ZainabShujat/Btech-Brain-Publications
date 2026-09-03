import React from 'react';
import Link from 'next/link';
import { getArticles, getCategories, getFeaturedArticle } from '@/lib/services/articles';
import { Container } from '@/components/layout/Container';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { Badge } from '@/components/ui/Badge';
import { Search } from 'lucide-react';

interface ArticlesPageProps {
  searchParams: Promise<{
    category?: string;
    q?: string;
  }>;
}

export const metadata = {
  title: 'Articles & Essays',
  description: 'The complete archive of technical essays, architecture monographs, and student reflections.',
};

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const params = await searchParams;
  const activeCategory = params.category || 'all';
  const searchQuery = params.q || '';

  const [categories, allArticles, featuredArticle] = await Promise.all([
    getCategories(),
    getArticles({ categorySlug: activeCategory, searchQuery }),
    getFeaturedArticle(),
  ]);

  return (
    <div className="py-12 space-y-12">
      <Container>
        {/* Archive Masthead */}
        <div className="max-w-3xl space-y-4 mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#B45309] font-medium">
            The Complete Archive
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1917] tracking-tight">
            Essays, Studies & Field Notes
          </h1>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Written and curated by Zainab Shujat. Exploring the friction points where software theory meets physical hardware, learning curves, and engineering craft.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-6 pb-8 border-b border-[#E7E5E4]">
          {/* Categories Tab Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/articles?category=${cat.slug}${searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : ''}`}
                  className={`px-3.5 py-1.5 rounded-sm text-xs font-mono whitespace-nowrap transition-colors border ${
                    isSelected
                      ? 'bg-[#1C1917] text-[#FAF9F5] border-[#1C1917] font-semibold'
                      : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-[#F3EFE6] hover:text-[#1C1917]'
                  }`}
                >
                  {cat.name}
                  {cat.articleCount ? ` (${cat.articleCount})` : ''}
                </Link>
              );
            })}
          </div>

          {/* Active Filter summary */}
          {(activeCategory !== 'all' || searchQuery) && (
            <div className="flex items-center justify-between text-xs text-[#78716C] bg-[#F3EFE6] p-3 rounded-sm">
              <span>
                Showing results for{' '}
                {activeCategory !== 'all' && <strong>category "{activeCategory}" </strong>}
                {searchQuery && <strong>search "{searchQuery}"</strong>} ({allArticles.length} essays found)
              </span>
              <Link href="/articles" className="text-[#B45309] hover:underline font-mono">
                Clear filters
              </Link>
            </div>
          )}
        </div>

        {/* Lead Featured Article (only when no specific search is active) */}
        {!searchQuery && activeCategory === 'all' && (
          <div className="my-10">
            <ArticleCard article={featuredArticle} featured={true} />
          </div>
        )}

        {/* Articles Grid */}
        {allArticles.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E7E5E4] rounded-sm p-8">
            <h3 className="font-serif text-xl font-bold text-[#1C1917] mb-2">
              No essays match your query
            </h3>
            <p className="text-sm text-[#78716C] mb-4 max-w-sm mx-auto">
              We couldn't find any articles matching your current filter. Try adjusting your search term or browsing all categories.
            </p>
            <Link
              href="/articles"
              className="inline-block px-4 py-2 bg-[#1C1917] text-white text-xs font-mono rounded-sm"
            >
              Reset Archive
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {allArticles
              .filter((art) => (activeCategory === 'all' && !searchQuery ? art.id !== featuredArticle.id : true))
              .map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
          </div>
        )}
      </Container>
    </div>
  );
}
