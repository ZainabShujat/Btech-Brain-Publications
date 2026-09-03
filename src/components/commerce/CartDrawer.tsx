'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function CartDrawer() {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] border-l border-[#E7E5E4] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#E7E5E4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B45309]" />
              <h2 className="text-lg font-serif font-bold text-[#1C1917]">
                Publication Bag ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#78716C] hover:text-[#1C1917] hover:bg-[#F3EFE6] rounded-sm transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#F3EFE6] flex items-center justify-center text-[#78716C]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#1C1917] mb-1">
                  Your reading bag is empty
                </h3>
                <p className="text-sm text-[#78716C] mb-6 max-w-xs mx-auto">
                  Explore our latest monthly magazines, monographs, or books by Zainab Shujat.
                </p>
                <div className="flex flex-col gap-2">
                  <Link href="/magazines" onClick={closeCart}>
                    <Button variant="secondary" size="sm" className="w-full">
                      Browse Magazines
                    </Button>
                  </Link>
                  <Link href="/books" onClick={closeCart}>
                    <Button variant="outline" size="sm" className="w-full">
                      Browse Books
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white border border-[#E7E5E4] rounded-sm shadow-sm"
                >
                  <div className="relative w-16 h-22 shrink-0 bg-[#F3EFE6] rounded-sm overflow-hidden border border-[#E7E5E4]">
                    {item.coverImage ? (
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-serif text-[#78716C]">
                        Issue
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-serif font-bold text-[#1C1917] line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#A8A29E] hover:text-[#DC2626] transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant={item.format === 'digital' ? 'subtle' : 'accent'}>
                          {item.format}
                        </Badge>
                        <span className="text-xs text-[#78716C] font-mono">
                          {formatPrice(item.unitPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls (only for print items) */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F3EFE6]">
                      {item.format === 'print' ? (
                        <div className="flex items-center border border-[#E7E5E4] rounded-sm text-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-[#57534E] hover:bg-[#F3EFE6]"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-[#57534E] hover:bg-[#F3EFE6]"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#A8A29E] italic">Instant Access</span>
                      )}

                      <span className="text-sm font-semibold text-[#1C1917] font-mono">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E7E5E4] bg-[#F3EFE6]/50 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#57534E]">Subtotal</span>
                <span className="text-lg font-mono font-bold text-[#1C1917]">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs text-[#78716C]">
                Taxes and worldwide shipping calculated at checkout. Digital issues added instantly to your library.
              </p>

              <div className="grid grid-cols-2 gap-2">
                <Link href="/cart" onClick={closeCart}>
                  <Button variant="secondary" className="w-full" size="md">
                    View Bag
                  </Button>
                </Link>
                <Link href="/checkout" onClick={closeCart}>
                  <Button variant="primary" className="w-full" size="md">
                    Checkout <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
