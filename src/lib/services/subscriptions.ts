import { UserSubscription, SubscriptionPlan } from '@/lib/types';
import { DEMO_SUBSCRIPTION } from '@/data/user';
import { SUBSCRIPTION_PLANS } from '@/lib/constants';

let currentSubscription: UserSubscription | null = { ...DEMO_SUBSCRIPTION };

export async function getUserSubscription(userId?: string): Promise<UserSubscription | null> {
  try {
    if (process.env.DATABASE_URL) {
      const { prisma } = await import('@/lib/prisma');
      const sub = await prisma.userSubscription.findFirst({
        where: userId ? { userId } : undefined,
        orderBy: { startedAt: 'desc' },
      });

      if (sub) {
        return {
          id: sub.id,
          userId: sub.userId,
          tier: sub.tier.toLowerCase() as 'monthly' | 'annual',
          status: sub.status.toLowerCase() as 'active' | 'cancelled' | 'past_due',
          startedAt: sub.startedAt.toISOString(),
          renewsAt: sub.renewsAt.toISOString(),
          cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
          price: Number(sub.price),
        };
      }
    }
  } catch (e) {
    console.warn('Database query failed in getUserSubscription, using mock:', e);
  }

  return currentSubscription;
}

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  return SUBSCRIPTION_PLANS;
}

export async function toggleCancelSubscription(cancelAtEnd: boolean): Promise<UserSubscription | null> {
  if (currentSubscription) {
    currentSubscription = {
      ...currentSubscription,
      cancelAtPeriodEnd: cancelAtEnd,
    };
  }
  return currentSubscription;
}
