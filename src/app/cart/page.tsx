'use strict';
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal, itemCount } = useCart();

  const hasPhysicalItems = items.some((item) => item.format === 'print' || item.format === 'bundle');
  const estimatedShipping = hasPhysicalItems ? 5.0 : 0.0;
  const total = subtotal + estimatedShipping;

  if (items.length === 0) {
    return (
      <div className="py-20">
        <Container size="narrow">
          <div className="text-center py-16 bg-white border border-[#E7E5E4] rounded-sm p-8 shadow-editorial">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F3EFE6] flex items-center justify-center text-[#78716C]">
              <ShoppingBag className="w-8 h-8 text-[#B45309]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] mb-2">
              Your reading bag is empty
            </h1>
            <p className="text-sm text-[#57534E] max-w-md mx-auto mb-8">
              Explore our current monthly issues, hardcover monographs, or consider becoming an annual patron of Notes From a B.Tech Brain.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/magazines">
                <Button variant="primary" size="md">
                  Explore Magazines
                </Button>
              </Link>
              <Link href="/books">
                <Button variant="secondary" size="md">
                  Browse Books
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 space-y-10">
      <Container>
        {/* Cart Masthead */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-[#E7E5E4] gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#B45309] font-semibold">
              Checkout Bag
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] mt-1">
              Your Selected Publications ({itemCount})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-mono text-[#A8A29E] hover:text-[#DC2626] transition-colors"
          >
            Clear Entire Bag
          </button>
        </div>

        {/* Cart Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="divide-y divide-[#E7E5E4] bg-white border border-[#E7E5E4] rounded-sm shadow-editorial">
              {items.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-5 items-start">
                  <div className="relative w-20 h-28 shrink-0 bg-[#F3EFE6] rounded-sm overflow-hidden border border-[#E7E5E4] shadow-sm">
                    {item.coverImage && (
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0 w-full">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Badge variant={item.format === 'digital' ? 'subtle' : 'accent'}>
                            {item.format} edition
                          </Badge>
                          <h3 className="font-serif font-bold text-lg text-[#1C1917] mt-1.5">
                            {item.title}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#A8A29E] hover:text-[#DC2626] p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.subtitle && (
                        <p className="text-xs font-mono text-[#78716C] mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F3EFE6]">
                      {item.format === 'print' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[#78716C]">Qty:</span>
                          <div className="flex items-center border border-[#E7E5E4] rounded-sm text-xs">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 py-1 text-[#57534E] hover:bg-[#F3EFE6]"
                            >
                              -
                            </button>
                            <span className="px-3 font-mono font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 py-1 text-[#57534E] hover:bg-[#F3EFE6]"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-[#78716C] italic">
                          Instant DRM-free digital delivery
                        </span>
                      )}

                      <div className="text-right">
                        <span className="font-mono font-bold text-lg text-[#1C1917]">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[11px] font-mono text-[#78716C] block">
                            {formatPrice(item.unitPrice)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#78716C] pt-2">
              <Link href="/magazines" className="hover:text-[#1C1917] inline-flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Continue browsing publications</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#1C1917] pb-3 border-b border-[#E7E5E4]">
                Order Summary
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#57534E]">
                  <span>Items Subtotal</span>
                  <span className="font-mono font-medium text-[#1C1917]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-[#57534E]">
                  <span>Estimated Shipping</span>
                  <span className="font-mono font-medium text-[#1C1917]">
                    {hasPhysicalItems ? formatPrice(estimatedShipping) : 'Free (Digital)'}
                  </span>
                </div>

                <div className="flex justify-between text-[#57534E]">
                  <span>Taxes</span>
                  <span className="font-mono text-xs text-[#78716C]">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E7E5E4] flex justify-between items-baseline">
                <span className="font-serif font-bold text-lg text-[#1C1917]">Total</span>
                <span className="font-mono font-bold text-2xl text-[#1C1917]">
                  {formatPrice(total)}
                </span>
              </div>

              <div className="pt-2">
                <Link href="/checkout">
                  <Button variant="primary" size="lg" className="w-full gap-2">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

              <div className="pt-3 border-t border-[#F3EFE6] space-y-2 text-xs text-[#78716C]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#166534] shrink-0" />
                  <span>Stripe test-ready checkout flow</span>
                </div>
                <p>Digital items will appear instantly in your Reader Library upon purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
