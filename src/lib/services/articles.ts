import { ARTICLES } from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { Article, Category } from '@/lib/types';

export async function getArticles(options?: {
  categorySlug?: string;
  searchQuery?: string;
  limit?: number;
}): Promise<Article[]> {
  let filtered = [...ARTICLES];

  if (options?.categorySlug && options.categorySlug !== 'all') {
    filtered = filtered.filter(
      (art) => art.category.slug.toLowerCase() === options.categorySlug?.toLowerCase()
    );
  }

  if (options?.searchQuery) {
    const q = options.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (art) =>
        art.title.toLowerCase().includes(q) ||
        art.subtitle.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (options?.limit) {
    filtered = filtered.slice(0, options.limit);
  }

  return filtered;
}

export async function getFeaturedArticle(): Promise<Article> {
  const featured = ARTICLES.find((art) => art.featured);
  return featured || ARTICLES[0];
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return ARTICLES.find((art) => art.slug === slug);
}

export async function getRelatedArticles(articleId: string, limit = 3): Promise<Article[]> {
  const target = ARTICLES.find((art) => art.id === articleId);
  if (!target) return ARTICLES.slice(0, limit);

  return ARTICLES.filter((art) => art.id !== articleId && art.category.id === target.category.id)
    .concat(ARTICLES.filter((art) => art.id !== articleId && art.category.id !== target.category.id))
    .slice(0, limit);
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}
