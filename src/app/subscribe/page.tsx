'use client';

import React from 'react';
import { SUBSCRIPTION_PLANS, SITE_CONFIG } from '@/lib/constants';
import { Container } from '@/components/layout/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { Check, Feather, ShieldCheck, HelpCircle } from 'lucide-react';

export default function SubscribePage() {
  const { addItem } = useCart();

  const handleSubscribe = (tier: 'monthly' | 'annual', price: number, name: string) => {
    addItem({
      productId: `sub_${tier}`,
      variantId: `var_sub_${tier}`,
      title: `${name} (${tier === 'monthly' ? '1 Month' : '1 Year'})`,
      subtitle: 'PUBLICATION PATRON MEMBERSHIP',
      format: 'digital',
      productType: 'subscription',
      unitPrice: price,
      quantity: 1,
      coverImage: '/images/covers/magazine-01.jpg',
      slug: 'subscribe',
    });
  };

  return (
    <div className="py-12 space-y-16">
      {/* Editorial Subscription Masthead */}
      <Container size="narrow">
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFE6] border border-[#E7E5E4] text-[#92400E] text-xs font-mono uppercase tracking-wider">
            <Feather className="w-3.5 h-3.5 text-[#B45309]" />
            <span>Support Independent Engineering Literature</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.1]">
            Become a Patron of Notes From a B.Tech Brain
          </h1>

          <p className="text-lg text-[#57534E] leading-relaxed max-w-2xl mx-auto font-serif italic">
            "Turn things worth reading into things worth keeping."
          </p>

          <p className="text-sm sm:text-base text-[#57534E] leading-relaxed max-w-xl mx-auto">
            Our readers enable deep, unhurried research into systems engineering, hardware architectures, and computing craft. Free from advertising, sponsorships, or corporate surveillance.
          </p>
        </div>
      </Container>

      {/* Subscription Cards (Editorial Presentation) */}
      <Container size="default">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between p-8 bg-white rounded-sm border transition-all duration-300 ${
                plan.popular
                  ? 'border-[#B45309] shadow-editorial ring-1 ring-[#B45309]'
                  : 'border-[#E7E5E4] hover:shadow-editorial'
              }`}
            >
              {plan.savingsBadge && (
                <div className="absolute -top-3 right-6 bg-[#B45309] text-white text-[11px] font-mono uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                  {plan.savingsBadge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif font-bold text-2xl text-[#1C1917]">
                    {plan.name}
                  </h3>
                  {plan.popular && <Badge variant="accent">Recommended</Badge>}
                </div>

                <div className="flex items-baseline gap-1 my-4 pb-4 border-b border-[#F3EFE6]">
                  <span className="font-mono font-bold text-4xl text-[#1C1917]">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-sm font-mono text-[#78716C]">
                    /{plan.period}
                  </span>
                </div>

                <p className="text-xs font-mono text-[#78716C] mb-6">
                  {plan.billingInterval}
                </p>

                <div className="space-y-3 mb-8">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#1C1917] font-semibold block">
                    What Patronage Includes:
                  </span>
                  <ul className="space-y-2.5 text-sm text-[#57534E]">
                    {plan.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F3EFE6]">
                <Button
                  onClick={() => handleSubscribe(plan.tier, plan.price, plan.name)}
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full font-serif"
                >
                  Join as {plan.name}
                </Button>
                <div className="text-[11px] font-mono text-center text-[#78716C] mt-2">
                  Cancel anytime in your reader account
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Reader Guarantees / FAQ */}
      <Container size="narrow">
        <div className="border-t border-[#E7E5E4] pt-12 space-y-8">
          <h3 className="font-serif text-2xl font-bold text-[#1C1917] text-center">
            Patronage Values & Guarantees
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="space-y-2">
              <ShieldCheck className="w-6 h-6 text-[#B45309] mx-auto sm:mx-0" />
              <h4 className="font-serif font-bold text-base text-[#1C1917]">
                DRM-Free Literature
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                When you buy an issue or book, you own it. High-resolution PDF and ePub files are yours to keep on any device.
              </p>
            </div>

            <div className="space-y-2">
              <Feather className="w-6 h-6 text-[#B45309] mx-auto sm:mx-0" />
              <h4 className="font-serif font-bold text-base text-[#1C1917]">
                Zero Clickbait
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Every piece of writing is produced with rigorous intellectual discipline. We write to clarify, not to game algorithms.
              </p>
            </div>

            <div className="space-y-2">
              <HelpCircle className="w-6 h-6 text-[#B45309] mx-auto sm:mx-0" />
              <h4 className="font-serif font-bold text-base text-[#1C1917]">
                Direct Editor Relationship
              </h4>
              <p className="text-xs text-[#57534E] leading-relaxed">
                Patrons can participate in essay discussions, suggest future engineering investigations, and receive field notebooks.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
