import React from 'react';
import Link from 'next/link';
import { DEMO_USER, DEMO_SUBSCRIPTION, DEMO_LIBRARY } from '@/data/user';
import { DEMO_ORDERS } from '@/data/orders';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice, formatDate } from '@/lib/utils';
import { BookOpen, Package, CreditCard, ArrowRight, Download } from 'lucide-react';

export default function AccountOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner & Subscription Pill */}
      <div className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#B45309] font-medium">
            Reader Membership Status
          </span>
          <h2 className="text-xl font-serif font-bold text-[#1C1917] mt-0.5">
            Active {DEMO_SUBSCRIPTION.tier.toUpperCase()} Patron
          </h2>
          <p className="text-xs text-[#57534E] mt-1">
            Renews on {formatDate(DEMO_SUBSCRIPTION.renewsAt)} · Unlimited access to digital issues & monographs.
          </p>
        </div>
        <Link href="/account/subscriptions">
          <Button variant="outline" size="sm">
            Manage Subscription
          </Button>
        </Link>
      </div>

      {/* Quick Library Shelf */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
          <h3 className="font-serif font-bold text-lg text-[#1C1917] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#B45309]" />
            <span>Currently Reading ({DEMO_LIBRARY.length})</span>
          </h3>
          <Link
            href="/account/library"
            className="text-xs font-mono text-[#B45309] hover:underline"
          >
            Open Complete Library →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {DEMO_LIBRARY.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white border border-[#E7E5E4] rounded-sm flex flex-col justify-between"
            >
              <div>
                <Badge variant="subtle" className="mb-2">
                  {item.type}
                </Badge>
                <h4 className="font-serif font-bold text-sm text-[#1C1917] line-clamp-2">
                  {item.title}
                </h4>
                <div className="mt-3">
                  <div className="flex justify-between text-[11px] font-mono text-[#78716C] mb-1">
                    <span>Progress</span>
                    <span>{item.readingProgressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F3EFE6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B45309]"
                      style={{ width: `${item.readingProgressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F3EFE6] flex items-center justify-between text-xs">
                <Link
                  href={item.type === 'magazine' ? `/magazines/${item.slug}` : `/books/${item.slug}`}
                  className="font-medium text-[#1C1917] hover:text-[#B45309]"
                >
                  Read Now →
                </Link>
                <button
                  className="text-[#78716C] hover:text-[#1C1917]"
                  title="Download DRM-free PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E4]">
          <h3 className="font-serif font-bold text-lg text-[#1C1917] flex items-center gap-2">
            <Package className="w-4 h-4 text-[#B45309]" />
            <span>Recent Orders</span>
          </h3>
          <Link
            href="/account/orders"
            className="text-xs font-mono text-[#B45309] hover:underline"
          >
            View All ({DEMO_ORDERS.length}) →
          </Link>
        </div>

        <div className="bg-white border border-[#E7E5E4] rounded-sm divide-y divide-[#E7E5E4]">
          {DEMO_ORDERS.slice(0, 2).map((order) => (
            <div key={order.id} className="p-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#1C1917]">
                    {order.orderNumber}
                  </span>
                  <Badge variant="success">{order.status}</Badge>
                </div>
                <div className="text-xs text-[#57534E] mt-1">
                  {order.items.map((i) => i.title).join(', ')}
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono font-bold text-sm text-[#1C1917] block">
                  {formatPrice(order.total)}
                </span>
                <span className="text-[11px] font-mono text-[#78716C]">
                  {formatDate(order.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
