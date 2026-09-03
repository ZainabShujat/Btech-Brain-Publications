import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedArticle, getArticles } from '@/lib/services/articles';
import { getLatestMagazine } from '@/lib/services/magazines';
import { getBooks } from '@/lib/services/books';
import { SITE_CONFIG } from '@/lib/constants';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { ArticleCard } from '@/components/articles/ArticleCard';
import { BookCard } from '@/components/books/BookCard';
import { Newsletter } from '@/components/shared/Newsletter';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { ArrowRight, BookOpen, Sparkles, Feather } from 'lucide-react';

export default async function HomePage() {
  const [featuredArticle, recentArticles, latestMagazine, books] = await Promise.all([
    getFeaturedArticle(),
    getArticles({ limit: 4 }),
    getLatestMagazine(),
    getBooks(),
  ]);

  // Exclude featured article from the 3 complementary cards
  const complementaryArticles = recentArticles
    .filter((art) => art.id !== featuredArticle.id)
    .slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#E7E5E4] bg-[#F3EFE6]/40">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#E7E5E4] text-[#92400E] text-xs font-mono uppercase tracking-wider">
              <Feather className="w-3.5 h-3.5 text-[#B45309]" />
              <span>An Independent Technical Press · Edited by {SITE_CONFIG.founder}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.08]">
              Notes from a brain still figuring things out.
            </h1>

            <p className="text-lg sm:text-xl text-[#57534E] leading-relaxed max-w-2xl mx-auto font-sans font-normal">
              An editorial publication exploring low-level systems, artificial intelligence, learning heuristics, and the honest human experience of building things in the real world.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link href={`/magazines/${latestMagazine.slug}`}>
                <Button variant="primary" size="lg" className="gap-2">
                  <span>Explore Issue 0{latestMagazine.issueNumber}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/articles">
                <Button variant="outline" size="lg">
                  Browse the Archive
                </Button>
              </Link>
              <Link href="/subscribe">
                <Button variant="ghost" size="lg" className="text-[#B45309] font-mono text-xs">
                  Become a Patron →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. FEATURED PUBLICATION (CURRENT ISSUE) */}
      <section>
        <Container>
          <div className="bg-[#FAF9F5] border border-[#E7E5E4] rounded-sm p-6 sm:p-10 md:p-12 shadow-editorial">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Cover Art Presentation */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-[3/4] bg-[#F3EFE6] rounded-sm overflow-hidden shadow-book border border-[#E7E5E4]">
                  {latestMagazine.coverImage ? (
                    <Image
                      src={latestMagazine.coverImage}
                      alt={latestMagazine.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : null}
                </div>
              </div>

              {/* Publication Information & TOC */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent">Current Monthly Issue</Badge>
                  <span className="text-xs font-mono text-[#78716C]">
                    ISSUE 0{latestMagazine.issueNumber} · {latestMagazine.season} · {latestMagazine.pageCount} PAGES
                  </span>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight leading-tight">
                    {latestMagazine.title}
                  </h2>
                  <p className="font-serif italic text-lg text-[#78716C] mt-2">
                    "{latestMagazine.subtitle}"
                  </p>
                </div>

                <p className="text-[#57534E] text-base leading-relaxed">
                  {latestMagazine.description}
                </p>

                {/* Table of Contents highlights */}
                <div className="border-t border-b border-[#E7E5E4] py-4 space-y-2.5">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#78716C] font-semibold block mb-2">
                    Table of Contents Preview:
                  </span>
                  {latestMagazine.articles.slice(0, 4).map((art, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-[#1C1917] font-serif">
                        <span className="text-[#B45309] font-mono text-xs">0{idx + 1}.</span>
                        <span className="font-medium">{art.title}</span>
                      </div>
                      <span className="text-xs font-mono text-[#78716C]">p. {art.pageNumber}</span>
                    </div>
                  ))}
                </div>

                {/* Actions and Pricing */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-baseline gap-4">
                    <div>
                      <span className="text-xs font-mono text-[#78716C] block">DIGITAL ISSUE</span>
                      <span className="text-xl font-bold font-mono text-[#1C1917]">
                        {formatPrice(latestMagazine.digitalPrice)}
                      </span>
                    </div>
                    {latestMagazine.printPrice && (
                      <div className="border-l border-[#E7E5E4] pl-4">
                        <span className="text-xs font-mono text-[#78716C] block">PRINT EDITION</span>
                        <span className="text-base font-semibold font-mono text-[#57534E]">
                          {formatPrice(latestMagazine.printPrice)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Link href={`/magazines/${latestMagazine.slug}`}>
                      <Button variant="primary" size="md" className="gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>Read Issue Details</span>
                      </Button>
                    </Link>
                    <Link href="/magazines">
                      <Button variant="outline" size="md">
                        Past Issues
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. LATEST ESSAYS & ARTICLES */}
      <section>
        <Container>
          <SectionHeader
            label="From the Writing Desk"
            title="Essays, Treatises & Field Notes"
            description="Deep technical analysis, architecture dissections, and observations on software craft."
            href="/articles"
            actionText="View Complete Archive"
          />

          <div className="space-y-6">
            {/* Featured Lead Essay */}
            <ArticleCard article={featuredArticle} featured={true} />

            {/* Complementary Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {complementaryArticles.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4. THE BOOKSTORE / MONOGRAPHS */}
      <section className="py-12 bg-[#F3EFE6]/50 border-t border-b border-[#E7E5E4]">
        <Container>
          <SectionHeader
            label="The Bookstore"
            title="Monographs & Volumes by Zainab Shujat"
            description="Bound editions, hardcover studies, and previews designed to last longer than ephemeral browser tabs."
            href="/books"
            actionText="Explore All Books"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </Container>
      </section>

      {/* 5. ABOUT THE PUBLICATION */}
      <section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center p-8 md:p-12 bg-white border border-[#E7E5E4] rounded-sm">
            <div className="md:col-span-7 space-y-4">
              <Badge variant="subtle">About Notes From a B.Tech Brain</Badge>
              <h2 className="text-3xl font-serif font-bold text-[#1C1917] tracking-tight">
                Turn things worth reading into things worth keeping.
              </h2>
              <p className="text-base text-[#57534E] leading-relaxed">
                Most technical writing online is optimized for clicks, quick searches, or promotional hype. Notes From a B.Tech Brain is an antidote to algorithmic disposability: an independent press where engineering students, developers, and curious thinkers can read rigorously researched, beautifully typeset studies on computing, cognition, and craft.
              </p>
              <p className="text-sm text-[#78716C] leading-relaxed">
                Founded and written by Zainab Shujat during her engineering journey, each monthly issue and book is conceived as a durable artifact—available digitally DRM-free and in tactile print editions.
              </p>
              <div className="pt-2">
                <Link href="/about">
                  <Button variant="outline" size="sm">
                    Read the Founder Manifesto →
                  </Button>
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 bg-[#FAF9F5] p-6 rounded-sm border border-[#E7E5E4] space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#E7E5E4]">
                <div className="w-10 h-10 rounded-full bg-[#B45309] text-white flex items-center justify-center font-serif font-bold text-lg">
                  ZS
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#1C1917]">Zainab Shujat</h4>
                  <span className="text-xs font-mono text-[#78716C]">Founder & Editor</span>
                </div>
              </div>
              <p className="text-xs text-[#57534E] italic font-serif leading-relaxed">
                "We study compilers not because we want to write one every day, but because understanding the machine transforms how we look at every single line of code we will ever touch."
              </p>
              <div className="text-[11px] font-mono text-[#78716C] pt-1">
                Colophon Edition · Independent Publishing
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. NEWSLETTER / DISPATCH */}
      <section className="pb-8">
        <Container>
          <Newsletter />
        </Container>
      </section>
    </div>
  );
}
