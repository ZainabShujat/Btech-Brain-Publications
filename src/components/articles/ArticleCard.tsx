import React from 'react';
import Link from 'next/link';
import { Article } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Clock, ArrowRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <article className="group relative bg-[#F3EFE6] border border-[#E7E5E4] rounded-sm p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-[#D6D3D1] hover:shadow-editorial">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="accent">Featured Essay</Badge>
          <Badge variant="subtle">{article.category.name}</Badge>
          {article.issueSlug && (
            <span className="text-xs font-mono text-[#B45309]">
              Published in Issue 01
            </span>
          )}
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#1C1917] tracking-tight leading-tight group-hover:text-[#B45309] transition-colors mb-4">
          <Link href={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="text-base sm:text-lg text-[#57534E] leading-relaxed mb-6 max-w-3xl">
          {article.excerpt}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#E7E5E4]/80 text-xs font-mono text-[#78716C]">
          <div className="flex items-center gap-3">
            <span className="text-[#1C1917] font-sans font-medium">{article.author.name}</span>
            <span>·</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTimeMinutes} min read
            </span>
          </div>

          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1.5 font-sans font-semibold text-[#1C1917] group-hover:text-[#B45309] transition-colors"
          >
            <span>Read Essay</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between bg-white border border-[#E7E5E4] rounded-sm p-6 transition-all duration-300 hover:border-[#D6D3D1] hover:shadow-editorial">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="subtle">{article.category.name}</Badge>
          <span className="flex items-center gap-1 text-[11px] font-mono text-[#78716C]">
            <Clock className="w-3 h-3" />
            {article.readingTimeMinutes}m
          </span>
        </div>

        <h3 className="font-serif text-xl font-bold text-[#1C1917] leading-snug tracking-tight group-hover:text-[#B45309] transition-colors mb-2.5">
          <Link href={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="text-sm text-[#57534E] line-clamp-3 leading-relaxed mb-6">
          {article.excerpt}
        </p>
      </div>

      <div className="pt-4 border-t border-[#F3EFE6] flex items-center justify-between text-xs font-mono text-[#78716C]">
        <span>{formatDate(article.publishedAt)}</span>
        <Link
          href={`/articles/${article.slug}`}
          className="font-sans font-medium text-[#1C1917] group-hover:text-[#B45309] transition-colors inline-flex items-center gap-1"
        >
          <span>Read</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
