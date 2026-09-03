import { Order } from '@/lib/types';
import { DEMO_ORDERS } from '@/data/orders';

// In-memory store for orders created during the session
let sessionOrders: Order[] = [...DEMO_ORDERS];

export async function getOrders(userId?: string): Promise<Order[]> {
  try {
    if (process.env.DATABASE_URL) {
      // Lazy load prisma to avoid issues when offline/mocking
      const { prisma } = await import('@/lib/prisma');
      const dbOrders = await prisma.order.findMany({
        where: userId ? { userId } : undefined,
        include: { items: true, shippingAddress: true },
        orderBy: { createdAt: 'desc' },
      });

      if (dbOrders && dbOrders.length > 0) {
        return dbOrders.map((o: any) => ({
          id: o.id,
          orderNumber: o.orderNumber,
          userId: o.userId || '',
          createdAt: o.createdAt.toISOString(),
          status: o.status.toLowerCase() as Order['status'],
          items: o.items.map((it: any) => ({
            id: it.id,
            title: it.title,
            format: it.format.toLowerCase() as 'digital' | 'print' | 'bundle',
            productType: 'magazine',
            unitPrice: Number(it.unitPrice),
            quantity: it.quantity,
            coverImage: it.coverImage,
            slug: it.slug,
          })),
          subtotal: Number(o.subtotal),
          shippingFee: Number(o.shippingFee),
          total: Number(o.total),
          isPhysicalDelivery: o.isPhysicalDelivery,
          paymentMethod: o.paymentMethod,
          shippingAddress: o.shippingAddress
            ? {
                fullName: o.shippingAddress.fullName,
                street: o.shippingAddress.street,
                city: o.shippingAddress.city,
                state: o.shippingAddress.state || '',
                postalCode: o.shippingAddress.postalCode,
                country: o.shippingAddress.country,
              }
            : undefined,
        }));
      }
    }
  } catch (e) {
    console.warn('Database query failed in getOrders, falling back to local memory:', e);
  }

  if (userId) {
    return sessionOrders.filter((o) => o.userId === userId);
  }
  return sessionOrders;
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const orders = await getOrders();
  return orders.find((o) => o.id === id || o.orderNumber === id);
}

export async function createOrder(data: {
  userId?: string;
  customerName: string;
  customerEmail: string;
  items: Order['items'];
  subtotal: number;
  shippingFee: number;
  total: number;
  isPhysicalDelivery: boolean;
  shippingAddress?: Order['shippingAddress'];
  paymentMethod?: string;
  stripeSessionId?: string;
}): Promise<Order> {
  const orderNumber = `NBB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    if (process.env.DATABASE_URL) {
      const { prisma } = await import('@/lib/prisma');
      const created = await prisma.order.create({
        data: {
          orderNumber,
          userId: data.userId,
          customerEmail: data.customerEmail,
          customerName: data.customerName,
          status: 'PAID',
          subtotal: data.subtotal,
          shippingFee: data.shippingFee,
          total: data.total,
          isPhysicalDelivery: data.isPhysicalDelivery,
          paymentMethod: data.paymentMethod || 'Credit Card (Stripe)',
          stripeSessionId: data.stripeSessionId,
          items: {
            create: data.items.map((it) => ({
              productId: it.slug,
              variantId: `${it.slug}-${it.format}`,
              title: it.title,
              format: it.format.toUpperCase() as 'DIGITAL' | 'PRINT' | 'BUNDLE',
              unitPrice: it.unitPrice,
              quantity: it.quantity,
              coverImage: it.coverImage,
              slug: it.slug,
            })),
          },
          shippingAddress: data.shippingAddress
            ? {
                create: {
                  fullName: data.shippingAddress.fullName,
                  street: data.shippingAddress.street,
                  city: data.shippingAddress.city,
                  state: data.shippingAddress.state,
                  postalCode: data.shippingAddress.postalCode,
                  country: data.shippingAddress.country,
                },
              }
            : undefined,
        },
        include: { items: true, shippingAddress: true },
      });

      return {
        id: created.id,
        orderNumber: created.orderNumber,
        userId: created.userId || '',
        createdAt: created.createdAt.toISOString(),
        status: 'paid',
        items: data.items,
        subtotal: data.subtotal,
        shippingFee: data.shippingFee,
        total: data.total,
        isPhysicalDelivery: data.isPhysicalDelivery,
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod || 'Credit Card (Stripe)',
      };
    }
  } catch (e) {
    console.warn('Database insert failed in createOrder, storing in session memory:', e);
  }

  // Fallback to in-memory order creation
  const newOrder: Order = {
    id: `ord_${Date.now()}`,
    orderNumber,
    userId: data.userId || 'usr_zainab_reader',
    createdAt: new Date().toISOString(),
    status: 'paid',
    items: data.items,
    subtotal: data.subtotal,
    shippingFee: data.shippingFee,
    total: data.total,
    isPhysicalDelivery: data.isPhysicalDelivery,
    shippingAddress: data.shippingAddress,
    paymentMethod: data.paymentMethod || 'Credit Card (Stripe Test Mode)',
  };

  sessionOrders.unshift(newOrder);
  return newOrder;
}
