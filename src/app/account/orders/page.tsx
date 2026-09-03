import React from 'react';
import { getOrders } from '@/lib/services/orders';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice, formatDate } from '@/lib/utils';
import { Package, Truck, CheckCircle2, Download } from 'lucide-react';

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-[#E7E5E4]">
        <h2 className="font-serif font-bold text-2xl text-[#1C1917]">
          Order History & Receipts
        </h2>
        <p className="text-xs text-[#57534E] mt-0.5">
          Review past purchases, print shipment tracking, and download tax receipts.
        </p>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="p-8 bg-white border border-[#E7E5E4] rounded-sm text-center">
            <p className="text-sm text-[#78716C]">No orders placed yet.</p>
          </div>
        ) : (
          orders.map((order) => (
          <div
            key={order.id}
            className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F3EFE6] gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#1C1917]">
                    {order.orderNumber}
                  </span>
                  <Badge variant={order.status === 'delivered' ? 'success' : 'accent'}>
                    {order.status}
                  </Badge>
                </div>
                <div className="text-xs text-[#78716C] mt-0.5">
                  Placed on {formatDate(order.createdAt)} · {order.paymentMethod}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="font-mono font-bold text-lg text-[#1C1917]">
                  {formatPrice(order.total)}
                </span>
                <span className="text-[11px] font-mono text-[#78716C] block">
                  {order.isPhysicalDelivery ? 'Standard Shipping Included' : 'Digital Delivery'}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B45309]" />
                    <span className="font-serif font-medium text-[#1C1917]">{item.title}</span>
                    <Badge variant="subtle">{item.format}</Badge>
                  </div>
                  <span className="font-mono font-medium text-[#1C1917]">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Delivery address if physical */}
            {order.shippingAddress && (
              <div className="p-3 bg-[#FAF9F5] border border-[#E7E5E4] rounded-sm text-xs text-[#57534E] flex items-start gap-2">
                <Truck className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1C1917]">Delivered to: </span>
                  {order.shippingAddress.fullName}, {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </div>
              </div>
            )}
          </div>
        )))}
      </div>
    </div>
  );
}
