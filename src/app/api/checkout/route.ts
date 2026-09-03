import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/services/orders';
import { addLibraryItem } from '@/lib/services/library';
import { getProductById, getProducts } from '@/lib/services/products';
import { CartItem } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, customerEmail, customerName, shippingAddress } = body as {
      items: CartItem[];
      customerEmail: string;
      customerName: string;
      shippingAddress?: {
        fullName: string;
        street: string;
        city: string;
        state?: string;
        postalCode: string;
        country: string;
      };
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Reading bag is empty.' }, { status: 400 });
    }

    if (!customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Customer name and email are required.' },
        { status: 400 }
      );
    }

    // Verify prices & calculate server-side subtotal
    const allProducts = await getProducts();
    let calculatedSubtotal = 0;
    const verifiedItems = items.map((cartItem) => {
      // Find matching product variant or fallback to cart price
      const product = allProducts.find((p) => p.slug === cartItem.slug || p.id === cartItem.productId);
      let unitPrice = cartItem.unitPrice;

      if (product) {
        const variant = product.variants.find((v) => v.format === cartItem.format);
        if (variant) {
          unitPrice = variant.price;
        }
      }

      calculatedSubtotal += unitPrice * cartItem.quantity;
      return {
        ...cartItem,
        unitPrice,
      };
    });

    const hasPhysicalItems = verifiedItems.some(
      (item) => item.format === 'print' || item.format === 'bundle'
    );
    const shippingCost = hasPhysicalItems ? 5.0 : 0.0;
    const total = calculatedSubtotal + shippingCost;

    // Check if real Stripe is configured
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    if (stripeKey && !stripeKey.startsWith('sk_test_placeholder')) {
      // Real Stripe Checkout Session
      const Stripe = (await import('stripe')).default;
      const stripe = new Stripe(stripeKey, { apiVersion: '2025-02-24.acacia' as any });

      const lineItems = verifiedItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${item.title} (${item.format.toUpperCase()})`,
            images: item.coverImage ? [`${appUrl}${item.coverImage}`] : undefined,
          },
          unit_amount: Math.round(item.unitPrice * 100),
        },
        quantity: item.quantity,
      }));

      if (hasPhysicalItems && shippingCost > 0) {
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Standard Publication Shipping (Packaging & Tracking)',
              images: undefined,
            },
            unit_amount: Math.round(shippingCost * 100),
          },
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        customer_email: customerEmail,
        success_url: `${appUrl}/checkout?session_id={CHECKOUT_SESSION_ID}&success=true`,
        cancel_url: `${appUrl}/cart`,
        metadata: {
          customerName,
          hasPhysicalItems: hasPhysicalItems ? 'true' : 'false',
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // Direct / Local Demo Fulfillment Mode (when running without live Stripe secret key)
    const order = await createOrder({
      customerName,
      customerEmail,
      items: verifiedItems,
      subtotal: calculatedSubtotal,
      shippingFee: shippingCost,
      total,
      isPhysicalDelivery: hasPhysicalItems,
      shippingAddress: shippingAddress
        ? {
            ...shippingAddress,
            state: shippingAddress.state || '',
          }
        : undefined,
      paymentMethod: 'Credit Card (Stripe Test Mode)',
    });

    // Automatically grant acquired digital editions to the customer's library
    for (const it of verifiedItems) {
      if (it.format === 'digital' || it.format === 'bundle') {
        await addLibraryItem({
          title: it.title,
          subtitle: it.subtitle,
          type: it.productType === 'magazine' ? 'magazine' : 'book',
          coverImage: it.coverImage,
          slug: it.slug,
          format: 'digital',
          downloadUrl: `/downloads/samples/${it.slug}.pdf`,
          readingProgressPercent: 0,
        });
      }
    }

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
      total,
      customerEmail,
      customerName,
    });
  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred during checkout.' },
      { status: 500 }
    );
  }
}
