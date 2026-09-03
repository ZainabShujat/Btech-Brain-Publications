import { Category } from '@/lib/types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat_all',
    slug: 'all',
    name: 'All Topics',
    description: 'The entire compendium of essays, field notes, and technical treatises.',
  },
  {
    id: 'cat_systems',
    slug: 'systems-compilers',
    name: 'Systems & Compilers',
    description: 'Operating systems, memory models, distributed consensus, and language design.',
    articleCount: 14,
  },
  {
    id: 'cat_ai',
    slug: 'ai-machine-learning',
    name: 'AI & Cognition',
    description: 'Statistical learning, neural network internals, and computational philosophy.',
    articleCount: 18,
  },
  {
    id: 'cat_web',
    slug: 'web-architecture',
    name: 'Web Architecture',
    description: 'Browsers, protocols, edge computing, latency, and resilient client engineering.',
    articleCount: 12,
  },
  {
    id: 'cat_craft',
    slug: 'engineering-craft',
    name: 'The Engineer’s Craft',
    description: 'Mental models, refactoring habits, debugging psychology, and technical writing.',
    articleCount: 22,
  },
  {
    id: 'cat_reflections',
    slug: 'student-reflections',
    name: 'Student Field Notes',
    description: 'Honest accounts of being in the trenches: exams, imposter syndrome, and small triumphs.',
    articleCount: 16,
  },
  {
    id: 'cat_science',
    slug: 'science-physics',
    name: 'Science & Cosmos',
    description: 'Information theory, thermodynamics in computing, and astrophysics parallels.',
    articleCount: 9,
  },
];
