import { SubscriptionPlan } from './types';

export const SITE_CONFIG = {
  name: 'Notes From a B.Tech Brain',
  shortName: 'B.Tech Brain',
  tagline: "A place to explore things I don't understand yet.",
  founder: 'Zainab Shujat',
  founderBio:
    'Creative developer, designer, writer, and engineering student. Building worlds that work, exploring careers, curiosity, and the chaos of figuring things out.',
  description:
    'An intellectual home exploring writing, building, careers, curiosity, and the chaos of figuring things out — by Zainab Shujat.',
  copyrightNotice: `© ${new Date().getFullYear()} Notes From a B.Tech Brain by Zainab Shujat. All rights reserved.`,
  contactEmail: 'zainabshujatali@gmail.com',
  authorHandle: '@zainabshujat',
  portfolioUrl: 'https://zainabshujat.dev',
  livePublicationUrl: 'https://btechbrain.zainabshujat.dev',
  socials: {
    github: 'https://github.com/ZainabShujat',
    linkedin: 'https://www.linkedin.com/in/zainab-shujat-web-developer',
    linkedinPage: 'https://www.linkedin.com/company/notes-from-a-b-tech-brain/',
    email: 'mailto:zainabshujatali@gmail.com',
    rss: 'https://btechbrain.zainabshujat.dev/rss.xml',
  },
};

export const NAV_LINKS = [
  { label: 'Articles', href: '/articles' },
  { label: 'Magazines', href: '/magazines' },
  { label: 'Books', href: '/books' },
  { label: 'Subscribe', href: '/subscribe' },
  { label: 'About', href: '/about' },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'sub_monthly',
    tier: 'monthly',
    name: 'Monthly Reader',
    price: 6,
    period: 'per month',
    billingInterval: 'Billed monthly. Cancel anytime.',
    benefits: [
      'Immediate access to current & future monthly digital magazine issues (PDF & ePub)',
      'Full access to all subscriber-only deep dive essays & annotations',
      'Community discussion on published technical papers & essays',
      'Early access to new book previews & digital chapters',
      '15% discount on all physical books & print editions',
    ],
  },
  {
    id: 'sub_annual',
    tier: 'annual',
    name: 'Annual Patron',
    price: 54,
    period: 'per year',
    billingInterval: 'Billed annually ($4.50/month equivalent).',
    savingsBadge: 'Save 25%',
    popular: true,
    benefits: [
      'Everything in the Monthly Reader tier',
      'Complete digital archive access (all past magazine volumes & special issues)',
      '1 complimentary physical copy of the Annual Anthology issue',
      'Exclusive editor field notes & unpublished engineering lab notebooks',
      'Name listed in the printed publication patron colophon',
      '25% discount on all bookstore purchases',
    ],
  },
];
