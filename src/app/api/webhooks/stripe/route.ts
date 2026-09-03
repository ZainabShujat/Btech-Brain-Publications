import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/services/orders';
import { addLibraryItem } from '@/lib/services/library';

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ message: 'Stripe webhook not configured in environment.' }, { status: 200 });
  }

  const Stripe = (await import('stripe')).default;
  const stripe = new Stripe(stripeKey, { apiVersion: '2025-02-24.acacia' as any });

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe signature.' }, { status: 400 });
  }

  try {
    const rawBody = await req.text();
    const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        console.log(`💰 Stripe checkout completed for ${session.customer_email}`);

        // If line items are present, fulfill digital items to library
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        for (const item of lineItems.data) {
          if (item.description?.toLowerCase().includes('digital')) {
            await addLibraryItem({
              title: item.description,
              type: item.description.toLowerCase().includes('book') ? 'book' : 'magazine',
              coverImage: '/images/covers/magazine-01.jpg',
              slug: 'purchased-digital-edition',
              format: 'digital',
              downloadUrl: '/downloads/samples/issue-01.pdf',
              readingProgressPercent: 0,
            });
          }
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as any;
        console.log(`🎟️ Subscription status updated: ${subscription.status}`);
        break;
      }

      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Webhook signature verification failed.' }, { status: 400 });
  }
}
