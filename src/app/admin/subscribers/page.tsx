import React from 'react';
import { DEMO_USER, DEMO_SUBSCRIPTION } from '@/data/user';
import { Badge } from '@/components/ui/Badge';
import { formatDate, formatPrice } from '@/lib/utils';
import { Users, Mail } from 'lucide-react';

export default function AdminSubscribersPage() {
  const subscribers = [
    {
      id: 'sub_01',
      name: 'Elena Rostova',
      email: 'elena.rostova@example.com',
      tier: 'annual',
      joined: '2026-06-12',
      status: 'active',
      totalSpent: 88,
    },
    {
      id: 'sub_02',
      name: 'Dr. Marcus Vance',
      email: 'm.vance@mit.edu',
      tier: 'annual',
      joined: '2026-07-01',
      status: 'active',
      totalSpent: 110,
    },
    {
      id: 'sub_03',
      name: 'Karan Sharma',
      email: 'karan.sharma@systems.dev',
      tier: 'monthly',
      joined: '2026-08-15',
      status: 'active',
      totalSpent: 12,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h2 className="font-serif font-bold text-2xl text-[#1C1917]">
          Publication Patrons & Subscribers (312 Total)
        </h2>
        <p className="text-xs text-[#57534E] mt-0.5">
          Active sustaining readers supporting Notes From a B.Tech Brain.
        </p>
      </div>

      <div className="bg-white border border-[#E7E5E4] rounded-sm shadow-editorial overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E7E5E4] text-[#78716C] font-mono bg-[#FAF9F5]">
              <th className="p-3.5 font-medium">READER</th>
              <th className="p-3.5 font-medium">EMAIL</th>
              <th className="p-3.5 font-medium">TIER</th>
              <th className="p-3.5 font-medium">PATRON SINCE</th>
              <th className="p-3.5 font-medium">LIFETIME SUPPORT</th>
              <th className="p-3.5 font-medium">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F3EFE6]">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-[#FAF9F5]">
                <td className="p-3.5 font-medium text-[#1C1917]">{sub.name}</td>
                <td className="p-3.5 font-mono text-[#57534E]">{sub.email}</td>
                <td className="p-3.5">
                  <Badge variant="accent">{sub.tier}</Badge>
                </td>
                <td className="p-3.5 font-mono text-[#78716C]">{formatDate(sub.joined)}</td>
                <td className="p-3.5 font-mono font-bold text-[#1C1917]">{formatPrice(sub.totalSpent)}</td>
                <td className="p-3.5">
                  <Badge variant="success">{sub.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
