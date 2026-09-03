'use strict';
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { formatPrice } from '@/lib/utils';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft, CheckCircle2, ShieldCheck, Lock, CreditCard, BookOpen } from 'lucide-react';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Form State
  const [email, setEmail] = useState(user?.email || 'elena.rostova@example.com');
  const [fullName, setFullName] = useState(user?.name || 'Elena Rostova');
  const [street, setStreet] = useState('442 Meridian St, Apt 3B');
  const [city, setCity] = useState('Cambridge');
  const [state, setState] = useState('MA');
  const [postalCode, setPostalCode] = useState('02139');
  const [country, setCountry] = useState('United States');

  const hasPhysicalItems = items.some((item) => item.format === 'print' || item.format === 'bundle');
  const shippingCost = hasPhysicalItems ? 5.0 : 0.0;
  const total = subtotal + shippingCost;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerEmail: email,
          customerName: fullName,
          shippingAddress: hasPhysicalItems
            ? {
                fullName,
                street,
                city,
                state,
                postalCode,
                country,
              }
            : undefined,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to live Stripe Checkout session
        window.location.href = data.url;
        return;
      }

      if (data.orderNumber) {
        setOrderNumber(data.orderNumber);
        setStep('success');
        clearCart();
      } else {
        alert(data.error || 'Checkout could not be processed.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      alert('An error occurred while connecting to the checkout service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="py-20">
        <Container size="narrow">
          <div className="bg-white border border-[#E7E5E4] rounded-sm p-8 sm:p-12 shadow-editorial text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#DCFCE7] text-[#166534] flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#166534] font-semibold">
                Order Confirmed · Payment Successful
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
                Thank you for supporting independent literature.
              </h1>
              <p className="text-sm font-mono text-[#78716C]">
                ORDER REFERENCE: <strong>{orderNumber}</strong>
              </p>
            </div>

            <p className="text-[#57534E] text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              A confirmation dispatch has been sent to <strong>{email}</strong>. Your digital editions are immediately available in your personal reader library.
            </p>

            <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E4] rounded-sm text-left max-w-md mx-auto text-xs font-mono text-[#78716C] space-y-1">
              <div><strong>RECIPIENT:</strong> {fullName}</div>
              <div><strong>TOTAL PAID:</strong> {formatPrice(total)}</div>
              <div><strong>STATUS:</strong> Paid & Processed (Stripe Test Mode)</div>
              {hasPhysicalItems && <div><strong>SHIPPING TO:</strong> {street}, {city}, {postalCode}</div>}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link href="/account/library">
                <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                  <BookOpen className="w-4 h-4 text-[#D97706]" />
                  <span>Access Your Digital Library</span>
                </Button>
              </Link>
              <Link href="/articles">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Continue Reading
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <Container size="narrow">
          <h2 className="font-serif text-2xl font-bold text-[#1C1917] mb-2">
            No items in bag to checkout
          </h2>
          <p className="text-sm text-[#78716C] mb-6">
            Please add an issue or book to your bag first.
          </p>
          <Link href="/magazines">
            <Button variant="primary">Browse Magazines</Button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 space-y-10">
      <Container>
        <div className="pb-6 border-b border-[#E7E5E4]">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#78716C] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Reading Bag</span>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#1C1917] mt-2">
            Publication Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-7 space-y-8">
              {/* Customer Contact */}
              <div className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial space-y-4">
                <h3 className="font-serif font-bold text-lg text-[#1C1917] pb-2 border-b border-[#F3EFE6]">
                  1. Reader & Contact Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-[#78716C] mb-1">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#78716C] mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                    />
                  </div>
                </div>

                <div className="text-[11px] text-[#78716C]">
                  Digital edition access links and receipts will be delivered to this email.
                </div>
              </div>

              {/* Shipping Address (Only if physical products exist) */}
              {hasPhysicalItems && (
                <div className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial space-y-4">
                  <h3 className="font-serif font-bold text-lg text-[#1C1917] pb-2 border-b border-[#F3EFE6]">
                    2. Physical Delivery Destination
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-[#78716C] mb-1">
                        STREET ADDRESS *
                      </label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-[#78716C] mb-1">CITY *</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-[#78716C] mb-1">STATE / REGION</label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                        />
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-xs font-mono text-[#78716C] mb-1">POSTAL CODE *</label>
                        <input
                          type="text"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-[#FAF9F5] border border-[#D6D3D1] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#F3EFE6]">
                  <h3 className="font-serif font-bold text-lg text-[#1C1917]">
                    {hasPhysicalItems ? '3. Payment Information' : '2. Payment Information'}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-mono text-[#166534]">
                    <Lock className="w-3.5 h-3.5" />
                    <span>256-bit Encrypted</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FEF3C7] border border-[#FDE68A] rounded text-xs text-[#92400E]">
                  <strong>DEMO PAYMENT ENVIRONMENT:</strong> Claude Code / Stripe Integration Ready. Card processing is simulated for this test environment.
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-[#78716C] mb-1">
                      CARD NUMBER (TEST MODE)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="4242 •••• •••• 4242"
                        disabled
                        className="w-full px-3 py-2 text-sm bg-[#F3EFE6] border border-[#D6D3D1] rounded-sm font-mono text-[#57534E]"
                      />
                      <CreditCard className="w-4 h-4 text-[#78716C] absolute right-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-[#78716C] mb-1">EXPIRATION</label>
                      <input
                        type="text"
                        defaultValue="12/28"
                        disabled
                        className="w-full px-3 py-2 text-sm bg-[#F3EFE6] border border-[#D6D3D1] rounded-sm font-mono text-[#57534E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#78716C] mb-1">CVC</label>
                      <input
                        type="text"
                        defaultValue="•••"
                        disabled
                        className="w-full px-3 py-2 text-sm bg-[#F3EFE6] border border-[#D6D3D1] rounded-sm font-mono text-[#57534E]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                className="w-full font-serif text-lg tracking-wide py-4"
              >
                Place Order — {formatPrice(total)}
              </Button>
            </div>

            {/* Right Column: Order Review */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 bg-white border border-[#E7E5E4] rounded-sm shadow-editorial space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#1C1917] pb-3 border-b border-[#E7E5E4]">
                  Items to Fulfill ({items.length})
                </h3>

                <div className="divide-y divide-[#F3EFE6] space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="pt-3 flex gap-3 items-center justify-between">
                      <div className="flex gap-3 items-center min-w-0">
                        <div className="relative w-12 h-16 shrink-0 bg-[#F3EFE6] rounded-sm overflow-hidden border border-[#E7E5E4]">
                          {item.coverImage && (
                            <Image
                              src={item.coverImage}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-serif font-medium text-sm text-[#1C1917] truncate">
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-mono text-[#78716C]">
                            {item.format.toUpperCase()} · Qty {item.quantity}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono font-bold text-sm text-[#1C1917] shrink-0">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E7E5E4] space-y-2 text-xs">
                  <div className="flex justify-between text-[#57534E]">
                    <span>Subtotal</span>
                    <span className="font-mono text-[#1C1917]">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#57534E]">
                    <span>Shipping</span>
                    <span className="font-mono text-[#1C1917]">
                      {hasPhysicalItems ? formatPrice(shippingCost) : 'Free'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#E7E5E4] flex justify-between items-baseline text-sm">
                    <span className="font-bold text-[#1C1917]">Total Due</span>
                    <span className="font-mono font-bold text-xl text-[#1C1917]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E4] rounded-sm text-xs font-mono text-[#78716C] space-y-1">
                <div>✓ Instant access to digital downloads</div>
                <div>✓ 100% money-back guarantee within 14 days</div>
                <div>✓ Independent publisher quality</div>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
