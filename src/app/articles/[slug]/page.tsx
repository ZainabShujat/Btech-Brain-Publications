import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getRelatedArticles } from '@/lib/services/articles';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Clock, Share2, BookOpen, Bookmark } from 'lucide-react';
import type { Metadata } from 'next';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = await getRelatedArticles(article.id, 3);

  return (
    <article className="py-10 space-y-12">
      {/* Back Button & Breadcrumbs */}
      <Container size="narrow">
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E5E4] text-xs font-mono text-[#78716C]">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Essay Archive</span>
          </Link>

          <div className="flex items-center gap-2">
            <span>{article.category.name}</span>
            {article.issueSlug && (
              <>
                <span>·</span>
                <Link
                  href={`/magazines/${article.issueSlug}`}
                  className="text-[#B45309] hover:underline"
                >
                  Featured in Issue 01
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>

      {/* Article Editorial Header */}
      <Container size="narrow">
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent">{article.category.name}</Badge>
            <span className="text-xs font-mono text-[#78716C] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTimeMinutes} min read
            </span>
            <span className="text-xs font-mono text-[#78716C]">·</span>
            <span className="text-xs font-mono text-[#78716C]">
              {formatDate(article.publishedAt)}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-[#57534E] leading-relaxed border-l-2 border-[#B45309] pl-4">
            {article.subtitle}
          </p>

          {/* Author Byline */}
          <div className="pt-4 flex items-center justify-between border-t border-[#E7E5E4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1C1917] text-[#FAF9F5] flex items-center justify-center font-serif font-bold text-sm">
                ZS
              </div>
              <div>
                <div className="text-sm font-semibold text-[#1C1917]">{article.author.name}</div>
                <div className="text-xs font-mono text-[#78716C]">{article.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="p-2 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F3EFE6] rounded-sm transition-colors"
                title="Save bookmark"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button
                className="p-2 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F3EFE6] rounded-sm transition-colors"
                title="Share essay"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
      </Container>

      {/* Article Body Content */}
      <Container size="narrow">
        <div className="prose-editorial mx-auto bg-white p-6 sm:p-10 md:p-12 border border-[#E7E5E4] rounded-sm shadow-editorial">
          <div
            className="space-y-6"
            dangerouslySetInnerHTML={{
              __html: article.content
                .replace(/^### (.*$)/gim, '<h3 class="font-serif font-bold text-2xl text-[#1C1917] mt-8 mb-4">$1</h3>')
                .replace(/^## (.*$)/gim, '<h2 class="font-serif font-bold text-3xl text-[#1C1917] mt-10 mb-4">$1</h2>')
                .replace(/^> (.*$)/gim, '<blockquote class="border-l-3 border-[#B45309] pl-4 italic my-6 text-[#1C1917] font-serif text-lg">$1</blockquote>')
                .replace(/`([^`]+)`/g, '<code class="bg-[#F3EFE6] text-[#92400E] px-1.5 py-0.5 rounded font-mono text-sm">$1</code>')
                .replace(/\n\n/g, '</p><p class="mb-5 text-[#57534E] leading-relaxed">')
                .replace(/^/g, '<p class="mb-5 text-[#57534E] leading-relaxed">')
                .concat('</p>'),
            }}
          />

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-[#E7E5E4] flex flex-wrap gap-2">
            <span className="text-xs font-mono text-[#78716C] self-center mr-2">Filed Under:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono bg-[#F3EFE6] text-[#57534E] px-2.5 py-1 rounded-sm border border-[#E7E5E4]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Container>

      {/* Magazine Issue Cross-promotion Box */}
      {article.issueSlug && (
        <Container size="narrow">
          <div className="p-6 bg-[#F3EFE6] border border-[#E7E5E4] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#B45309] font-medium">
                Published in Print
              </span>
              <h4 className="font-serif font-bold text-lg text-[#1C1917] mt-1">
                This essay is part of Issue 01 (Autumn 2026)
              </h4>
              <p className="text-xs text-[#57534E] mt-0.5">
                Enjoy high-resolution schematics, editorial annotations, and collector's print quality.
              </p>
            </div>
            <Link href={`/magazines/${article.issueSlug}`}>
              <Button variant="primary" size="sm" className="whitespace-nowrap gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>View Full Issue</span>
              </Button>
            </Link>
          </div>
        </Container>
      )}

      {/* Related Essays */}
      <section className="pt-10 border-t border-[#E7E5E4]">
        <Container>
          <div className="mb-6">
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
              Related Essays & Studies
            </h3>
            <p className="text-xs font-mono text-[#78716C] mt-1">
              CONTINUE READING FROM THE ARCHIVE
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <ArticleCard key={rel.id} article={rel} />
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
