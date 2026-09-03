import React from 'react';
import { getUserSubscription, getSubscriptionPlans } from '@/lib/services/subscriptions';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatDate, formatPrice } from '@/lib/utils';
import { Check, CreditCard, ShieldCheck } from 'lucide-react';

export default async function SubscriptionsPage() {
  const [subscription, plans] = await Promise.all([
    getUserSubscription(),
    getSubscriptionPlans(),
  ]);

  const currentPlan = plans.find((p) => p.tier === subscription?.tier) || plans[0];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h2 className="font-serif font-bold text-2xl text-[#1C1917]">
          Subscription & Patronage
        </h2>
        <p className="text-xs text-[#57534E] mt-0.5">
          Manage your reader membership, renewal schedules, and billing information.
        </p>
      </div>

      {/* Current Active Plan Card */}
      <div className="p-6 bg-white border border-[#B45309] rounded-sm shadow-editorial space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F3EFE6]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="accent">ACTIVE PATRON</Badge>
              <span className="text-xs font-mono text-[#78716C]">
                {(subscription?.tier || 'annual').toUpperCase()} TIER
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl text-[#1C1917]">
              {currentPlan?.name}
            </h3>
            <p className="text-xs text-[#57534E] mt-0.5">
              Next scheduled renewal: <strong>{formatDate(subscription?.renewsAt || '2027-06-12')}</strong> (${subscription?.price || 54}/year)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Update Card
            </Button>
            <Button variant="secondary" size="sm" className="text-[#DC2626] hover:bg-[#FEE2E2]">
              Pause Membership
            </Button>
          </div>
        </div>

        {/* Plan Benefits Checklist */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#1C1917] font-semibold block">
            Included in your active patron tier:
          </span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#57534E]">
            {currentPlan?.benefits.map((b, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#166534] shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
