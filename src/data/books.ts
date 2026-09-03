import { Book } from '@/lib/types';

export const BOOKS: Book[] = [
  {
    id: 'book_01',
    slug: 'the-architecture-of-figuring-things-out',
    title: 'The Architecture of Figuring Things Out',
    subtitle: 'A handbook of mental models, structured inquiry, and persistent curiosity for engineers and thinkers.',
    author: 'Zainab Shujat',
    description:
      'A personal, rigorous inquiry into how engineers bridge the chasm between raw theory and practical mastery. Blending computer science fundamentals with philosophical discipline and student candor.',
    longDescription: `
Written across three years of intensive technical study and practical building, *The Architecture of Figuring Things Out* dismantles the mythology of effortless genius in software engineering.

Zainab Shujat examines the psychological and cognitive mechanisms that allow engineers to confront complex, unfamiliar systems without panic. From diagnosing memory corruptions to learning how to sit with ambiguity when an architecture document is missing, this book offers a timeless compass for students, junior architects, and self-taught developers.

Printed on archival 90gsm Italian book-cloth stock with foil-stamped lettering and Smyth-sewn binding designed to lay flat on a workbench.

> *Note: This publication is presented as a demonstration sample of the independent press catalog.*
`,
    coverImage: '/images/covers/book-01.jpg',
    genre: 'Engineering / Philosophy / Learning',
    isbn: '978-0-9981244-0-1 (Sample)',
    pageCount: 248,
    publicationDate: '2026-06-15',
    status: 'published',
    digitalPrice: 16,
    printPrice: 34,
    formats: ['digital', 'paperback', 'hardcover'],
    dimensions: '6.0 × 9.0 in (15.2 × 22.8 cm)',
    publisher: 'Notes From a B.Tech Brain Press',
    tableOfContents: [
      {
        number: 1,
        title: 'The Map is Not the Silicon: Confronting Abstraction Leaks',
        pageCount: 32,
        description: 'Why mental models fail and how to systematically inspect the boundaries where software meets physical reality.',
      },
      {
        number: 2,
        title: 'The Art of the Tiny Invariant',
        pageCount: 38,
        description: 'How simple algebraic properties keep complex systems from spiraling into untraceable chaos.',
      },
      {
        number: 3,
        title: 'Debugging as Epistemic Hygiene',
        pageCount: 42,
        description: 'Overcoming the cognitive biases of confirmation, wishful thinking, and sunk-cost debugging.',
      },
      {
        number: 4,
        title: 'The Lindy Stack: Choosing What to Learn in an Age of Churn',
        pageCount: 40,
        description: 'Distinguishing durable foundations from transient hype cycles in contemporary tech.',
      },
      {
        number: 5,
        title: 'Quiet Competence: Notes on Loneliness, Curiosity, and the Craft',
        pageCount: 56,
        description: 'Navigating engineering school, imposter syndrome, and the joy of solving problems for their own sake.',
      },
    ],
    reviews: [
      {
        id: 'rev_01',
        authorName: 'Prof. Marcus Vance',
        authorTitle: 'Adjunct Professor of Distributed Systems',
        rating: 5,
        comment:
          'Rarely does a book from a student voice carry such mature clarity. Shujat articulates the silent friction of modern software education with poise and surgical precision.',
        date: '2026-07-02',
      },
      {
        id: 'rev_02',
        authorName: 'Aarav Mehta',
        authorTitle: 'Senior Systems Architect',
        rating: 5,
        comment:
          'I bought the hardback for my office desk and finished it in two evenings. It reminded me why I fell in love with computer science twenty years ago.',
        date: '2026-07-28',
      },
    ],
    sampleChapterText: `
### Chapter 1: The Map is Not the Silicon

Every abstraction is a polite conspiracy between the architect who authored it and the programmer who trusts it.

When we write:
\`\`\`
int x = arr[i];
\`\`\`
we are taught to imagine an infinite ribbon of contiguous boxes, numbered cleanly from 0 to N. We imagine that fetching the item takes identical time regardless of whether \`i\` is 0 or 1,000,000. We imagine that memory is a passive filing cabinet waiting quietly for our commands.

None of this is true.

Beneath that innocent expression lies a labyrinth: the instruction cache, the branch predictor, the memory management unit, translation lookaside buffers, three tiers of hardware cache lines, DDR bus arbitration, and capacitor refresh cycles.

To be an engineer is not to hold all of this in your head at once—that is impossible. To be an engineer is to understand exactly when the abstraction ceases to protect you, and to have the courage to step beneath the trapdoor.
`,
  },
  {
    id: 'book_02',
    slug: 'from-silicon-to-synapse',
    title: 'From Silicon to Synapse: Notes on Modern Systems',
    subtitle: 'Connecting low-level computer architecture, neural representation geometry, and modern distributed consensus.',
    author: 'Zainab Shujat',
    description:
      'A technical exploration tracing computation from the gate-level physics of semiconductor transistors to the associative manifolds of modern transformer models. Expected late 2026.',
    longDescription: `
Can a single conceptual thread connect the physical silicon of a CPU ALU to the multi-head self-attention mechanism of modern AI? 

In *From Silicon to Synapse*, editor Zainab Shujat presents an ambitious synthesis of systems engineering and modern statistical learning. The book bridges hardware constraints—cache coherency protocols, SIMD vectorization, and memory bandwidth bottlenecks—with the geometric behaviors of neural network embeddings.

Richly illustrated with two-color mechanical schematics and mathematical derivations designed for working developers.

> *Note: This publication is currently in editorial review. Pre-orders include immediate digital access to Chapters 1–3.*
`,
    coverImage: '/images/covers/book-02.jpg',
    genre: 'Computer Architecture / Machine Learning',
    pageCount: 310,
    publicationDate: '2026-11-20',
    status: 'coming_soon',
    digitalPrice: 18,
    printPrice: 38,
    formats: ['digital', 'hardcover'],
    publisher: 'Notes From a B.Tech Brain Press',
    tableOfContents: [
      {
        number: 1,
        title: 'The Gate and the Gradient: Computation as Physics',
        pageCount: 44,
      },
      {
        number: 2,
        title: 'Memory Walls and Tensor Acceleration: The Architecture of GPUs',
        pageCount: 52,
      },
      {
        number: 3,
        title: 'High-Dimensional Manifolds and Vector Projections',
        pageCount: 60,
      },
      {
        number: 4,
        title: 'Distributed State: From Raft Consensus to Parameter Servers',
        pageCount: 58,
      },
      {
        number: 5,
        title: 'The Limits of Computability and Silicon Scaling',
        pageCount: 48,
      },
    ],
    reviews: [],
  },
];
