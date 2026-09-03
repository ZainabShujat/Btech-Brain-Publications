import React from 'react';
import { DEMO_ORDERS } from '@/data/orders';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDate } from '@/lib/utils';
import { ShoppingBag, Eye } from 'lucide-react';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h2 className="font-serif font-bold text-2xl text-[#1C1917]">
          Customer Orders & Shipments
        </h2>
        <p className="text-xs text-[#57534E] mt-0.5">
          Track customer purchases, fulfillment statuses, and physical shipments.
        </p>
      </div>

      <div className="bg-white border border-[#E7E5E4] rounded-sm shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E7E5E4] text-[#78716C] font-mono bg-[#FAF9F5]">
              <th className="p-3.5 font-medium">ORDER #</th>
              <th className="p-3.5 font-medium">DATE</th>
              <th className="p-3.5 font-medium">ITEMS</th>
              <th className="p-3.5 font-medium">FULFILLMENT</th>
              <th className="p-3.5 font-medium">TOTAL</th>
              <th className="p-3.5 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3EFE6]">
            {DEMO_ORDERS.map((ord) => (
              <tr key={ord.id} className="hover:bg-[#FAF9F5]">
                <td className="p-3.5 font-mono font-bold text-[#1C1917]">{ord.orderNumber}</td>
                <td className="p-3.5 font-mono text-[#78716C]">{formatDate(ord.createdAt)}</td>
                <td className="p-3.5 text-[#57534E]">
                  {ord.items.map((i) => `${i.title} (${i.format})`).join(', ')}
                </td>
                <td className="p-3.5 font-mono text-[#78716C]">
                  {ord.isPhysicalDelivery ? 'Physical Print (USPS)' : 'Digital Instant'}
                </td>
                <td className="p-3.5 font-mono font-bold text-[#1C1917]">{formatPrice(ord.total)}</td>
                <td className="p-3.5">
                  <Badge variant={ord.status === 'delivered' ? 'success' : 'accent'}>
                    {ord.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
