import React from 'react';
import Link from 'next/link';
import { getMagazines } from '@/lib/services/magazines';
import { Container } from '@/components/layout/Container';
import { MagazineCard } from '@/components/magazines/MagazineCard';
import { Button } from '@/components/ui/Button';
import { Feather, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Magazine Archive',
  description: 'Monthly curated issues of Notes From a B.Tech Brain. Available in DRM-free digital and tactile print editions.',
};

export default async function MagazinesPage() {
  const magazines = await getMagazines();

  return (
    <div className="py-12 space-y-12">
      <Container>
        {/* Masthead */}
        <div className="max-w-3xl space-y-4 mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#B45309] font-medium flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5" />
            <span>Monthly Periodical Archive</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1917] tracking-tight">
            The Monthly Magazines
          </h1>
          <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
            Every month, the publication's strongest essays, laboratory field notes, and technical schematics are compiled into an archival volume. Conceived to be read slowly on paper or in a high-resolution reader.
          </p>
        </div>

        {/* Subscription Banner Prompt */}
        <div className="p-6 bg-[#F3EFE6] border border-[#E7E5E4] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#92400E] font-semibold">
              Patron Advantage
            </span>
            <h3 className="font-serif font-bold text-lg text-[#1C1917] mt-0.5">
              Subscribe once, receive every monthly issue automatically
            </h3>
            <p className="text-xs text-[#57534E] mt-0.5">
              Subscribers get immediate digital access to all current and past volumes, plus 25% off print editions.
            </p>
          </div>
          <Link href="/subscribe">
            <Button variant="primary" size="sm" className="whitespace-nowrap">
              Explore Subscription Plans →
            </Button>
          </Link>
        </div>

        {/* Issues List */}
        <div className="space-y-8">
          {magazines.map((magazine) => (
            <MagazineCard key={magazine.id} magazine={magazine} />
          ))}
        </div>
      </Container>
    </div>
  );
}
