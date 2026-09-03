import { User, UserSubscription, LibraryItem } from '@/lib/types';

export const DEMO_USER: User = {
  id: 'usr_zainab_reader',
  name: 'Elena Rostova',
  email: 'elena.rostova@example.com',
  role: 'subscriber',
  bio: 'Systems software enthusiast & distributed algorithms researcher. Voracious reader of engineering monographs.',
  joinedDate: '2026-06-12',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
};

export const DEMO_SUBSCRIPTION: UserSubscription = {
  id: 'sub_live_01',
  userId: 'usr_zainab_reader',
  tier: 'annual',
  status: 'active',
  startedAt: '2026-06-12',
  renewsAt: '2027-06-12',
  cancelAtPeriodEnd: false,
  price: 54,
};

export const DEMO_LIBRARY: LibraryItem[] = [
  {
    id: 'lib_01',
    title: 'Notes From a B.Tech Brain — Issue 01',
    subtitle: 'The Thinking Machine & The Restless Mind',
    type: 'magazine',
    coverImage: '/images/covers/magazine-01.jpg',
    acquiredDate: '2026-09-01',
    slug: 'issue-01-autumn-2026',
    format: 'digital',
    downloadUrl: '/downloads/samples/issue-01.pdf',
    readingProgressPercent: 68,
    lastReadDate: '2026-09-02',
  },
  {
    id: 'lib_02',
    title: 'The Architecture of Figuring Things Out',
    subtitle: 'A handbook of mental models, structured inquiry, and persistent curiosity',
    type: 'book',
    coverImage: '/images/covers/book-01.jpg',
    acquiredDate: '2026-06-20',
    slug: 'the-architecture-of-figuring-things-out',
    format: 'print_digital_access',
    downloadUrl: '/downloads/samples/the-architecture-of-figuring-things-out.epub',
    readingProgressPercent: 100,
    lastReadDate: '2026-08-15',
  },
  {
    id: 'lib_03',
    title: 'Notes From a B.Tech Brain — Issue 02',
    subtitle: 'Systems, Orbits & Compilers',
    type: 'magazine',
    coverImage: '/images/covers/magazine-02.jpg',
    acquiredDate: '2026-10-01',
    slug: 'issue-02-winter-2026',
    format: 'digital',
    downloadUrl: '/downloads/samples/issue-02.pdf',
    readingProgressPercent: 24,
    lastReadDate: '2026-10-02',
  },
];
