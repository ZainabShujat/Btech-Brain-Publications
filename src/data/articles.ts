import { Article } from '@/lib/types';
import { CATEGORIES } from './categories';

export const ARTICLES: Article[] = [
  {
    id: 'art_real_01',
    slug: 'the-cursor-knows-when-youre-thinking',
    title: "The Cursor Knows When You're Thinking",
    subtitle: 'A blinking text cursor is doing almost nothing, yet we rarely notice how much it changes a blank screen.',
    excerpt: 'Without it, an empty text box feels unfinished; with it, the same emptiness feels like an invitation. One tiny animation quietly tells your brain: something is waiting to become a thought.',
    content: `
### The Quietest Invitation in Computing

Look at a blank input field with no cursor. It looks like a static rectangle of pixels, indistinguishable from a decorative gray border. It offers nothing. It demands nothing.

Now inject a single vertical line, one or two pixels wide, flashing at roughly 1.06 Hertz.

Suddenly, the psychological architecture of the entire screen shifts. The blinking cursor does not simply inform you of keyboard focus; it produces an expectant tension. It is the digital equivalent of someone leaning forward slightly across a coffee table, waiting for you to finish your sentence.

> "Without a cursor, an empty text box feels unfinished; with it, the same emptiness feels like an invitation. One tiny animation quietly tells your brain: something is waiting to become a thought."

### 1. The Engineering of Waiting

The standard blinking cursor was invented in 1967 by Stephen B. Gray. Before that, video terminals used steady underline blocks. Gray realized that a static mark on a phosphor screen caused cathode-ray tube phosphor burn-in, and more importantly, our peripheral vision is exquisitely tuned to subtle movement.

By pulsing between visible and invisible every 500 milliseconds, the interface taps directly into our evolutionary motion detectors:

- **State 0 (Visible):** Anchors Cartesian coordinates on the canvas.
- **State 1 (Invisible):** Allows the eye to read the character directly beneath or behind without occlusion.
- **State Reset on Keydown:** Notice that the moment you type a letter, the cursor immediately resets its phase to visible. If it continued its arbitrary timer, it would occasionally vanish right as you struck a key, producing a jarring sensation of dropped input.

### 2. Digital Silence

In an era where every website wants to interrupt you with notifications, promotional badges, and autoplaying media, the cursor remains one of the last sanctuaries of digital contemplation.

It does not judge the pause between your words. It does not auto-advance when you hesitate. It simply pulses, patient and rhythmic, keeping the door open for whatever thought is trying to assemble itself next.
`,
    category: CATEGORIES[3], // Design & Interface / Web
    author: {
      name: 'Zainab Shujat',
      role: 'Founder & Editor',
    },
    readingTimeMinutes: 4,
    publishedAt: '2026-08-04',
    status: 'published',
    featured: true,
    tags: ['wonder', 'design', 'interfaces', 'curiosity', 'psychology'],
  },
  {
    id: 'art_real_02',
    slug: 'i-finally-found-out-what-claude-is-doing-while-its-thinking',
    title: 'I Finally Found Out What Claude Is Doing While It\'s "Thinking"',
    subtitle: 'Under the hood of extended reasoning: scratchpads, test-time compute, and what is actually happening when you wait.',
    excerpt: 'I just found out what Claude is actually doing while I wait for it to answer my prompts, and it’s kinda wild. Here is what’s actually happening under the hood when we use reasoning models for our engineering work.',
    content: `
### The Magic Box and the Timer

For months, when using extended thinking models, I would stare at the timer ticking upward: *Thinking for 14s... Thinking for 28s...*

Like most developers, my default mental model was fuzzy: was it spinning up more GPU nodes? Was it executing Python in a sandboxed container? Was it running a Monte Carlo tree search over thousands of potential answers?

The reality turns out to be both simpler and much more fascinating.

### 1. Test-Time Compute vs. Training Compute

In classical machine learning, intelligence was baked into the model strictly during the pre-training and fine-tuning phases. Once weights were frozen, generating an answer was a single, forward pass of fixed compute per token. If you asked a model to write a haiku or derive general relativity, it expended roughly the same computational energy per token.

Reasoning models break this symmetry by leveraging **test-time compute**.

Instead of leaping directly to the final output token, the model generates an internal, private stream of thought tokens—a hidden scratchpad where it can:

1. **Decompose multi-step constraints:** Breaking an ambiguous prompt into explicit sub-tasks.
2. **Formulate internal hypotheses:** "If approach $A$ fails at the boundary condition, I should pivot to approach $B$."
3. **Backtrack and self-correct:** Spotting a logical hallucination *before* printing it to the user-facing transcript.

### 2. The Cognitive Scratchpad

What is fascinating as a student and software engineer is reading these reasoning traces. You see the model behaving remarkably like a developer writing notes on the margin of an exam paper:

\`\`\`
Checking edge cases:
- What if array length is zero? -> Handled.
- What if input contains negative integers? -> Wait, line 14 assumes positive values. Let me rewrite the accumulator logic.
\`\`\`

It turns out that "thinking" is not a mystical biological process; in language models, thinking is the luxury of talking to oneself before speaking in public.
`,
    category: CATEGORIES[2], // AI & Cognition
    author: {
      name: 'Zainab Shujat',
      role: 'Founder & Editor',
    },
    readingTimeMinutes: 7,
    publishedAt: '2026-07-08',
    status: 'published',
    featured: false,
    tags: ['ai', 'claude', 'deep-learning', 'reasoning', 'under-the-hood'],
  },
  {
    id: 'art_real_03',
    slug: 'vibe-coding-without-losing-brain',
    title: 'The Code Was the Last Thing I Did',
    subtitle: 'Vibe coding, originality, software engineering, debugging, writing, and the Spiral Model.',
    excerpt: 'Vibe coding, originality, software engineering, debugging, writing, the Spiral Model, and why I think the conversation around AI is often focused on the wrong thing.',
    content: `
### When Generating Code Becomes Trivial

We are currently living through a strange inflection point where generating thirty lines of syntactically valid TypeScript takes approximately 800 milliseconds. People call it "vibe coding": describing an intuition into a chat window and watching an entire application assemble itself in real time.

And yet, every serious engineer knows a secret that the hype merchants omit:

> "The code was always the easiest part of software engineering. Understanding the problem was the work."

### 1. The Spiral Model Reborn

In traditional software engineering textbooks, Barry Boehm's **Spiral Model** (1986) emphasized iterative risk analysis before writing a single implementation line:

1. Determine objectives and constraints.
2. Identify and resolve risks (architectural leaks, latency bottlenecks).
3. Evaluate alternatives.
4. *Only then* write the implementation.

When you use AI assistants effectively, you don't use them to avoid thinking. You use them to accelerate the iteration cycles of the spiral. You brainstorm edge cases, you test conceptual boundaries, and you prototype throwaway architectures in minutes instead of days.

### 2. Originality in the Age of Synthesis

If a machine can synthesize existing patterns from public GitHub repositories, where does human engineering value reside?

It resides in:
- **Taste:** Deciding what *not* to build.
- **System boundary definition:** Knowing where two modules should touch and where they must remain strictly isolated.
- **Ownership:** When a production system fails at 2:00 AM, the AI does not feel the responsibility. You do.

The code was the last thing I did because the thinking had to happen first.
`,
    category: CATEGORIES[4], // The Engineer's Craft
    author: {
      name: 'Zainab Shujat',
      role: 'Founder & Editor',
    },
    readingTimeMinutes: 6,
    publishedAt: '2026-05-31',
    status: 'published',
    featured: false,
    tags: ['tech-journey', 'learning', 'career', 'storytelling', 'vibe-coding'],
  },
  {
    id: 'art_real_04',
    slug: 'an-inventory-of-everything-ive-said-yes-to-in-final-year',
    title: "An Inventory of Everything I've Said Yes To in Final Year",
    subtitle: 'A fourth-year engineering reflection on ambition, over-commitment, and learning to protect your intellectual focus.',
    excerpt: 'I sat down to write a fourth year reflection. Instead, I accidentally discovered I might already be overworked.',
    content: `
### The Compounding Cost of "Yes"

Early in college, saying "yes" is the only strategy that makes sense. You say yes to every hackathon, yes to every student club committee, yes to every open-source repository, yes to every late-night debugging session in the hostel common room.

When you have no track record, saying yes is how you generate serendipity.

Then you arrive at your final year.

### 1. The Spreadsheet of Obligations

Last month, feeling a vague, persistent knot in my stomach, I opened a plain text file and listed every single commitment I had agreed to carry:

- Final year engineering capstone project & documentation
- Editorial writing and publishing for *Notes From a B.Tech Brain*
- Open-source frontend library maintenance
- Placement interview preparation & system design problem sets
- Two freelance creative development commissions
- Student mentorship calls

Looking at the list in black and white was an eerie experience. None of these projects was bad. Every single one was something I genuinely cared about.

And that is precisely why it was dangerous.

### 2. The Discipline of the Edit

In publishing, a good editor is not someone who adds words; a good editor is someone who ruthlessly cuts away everything that dilutes the central thesis.

Your life as an engineering student requires the exact same editorial courage. When you try to be an architect, a prolific writer, a competitive programmer, and a full-time student simultaneously, you don't become superhuman. You simply become exhausted.

Learning to say a gentle, firm "no" to good opportunities is the only way you preserve the energy required to say an ecstatic "yes" to great ones.
`,
    category: CATEGORIES[5], // Student Field Notes
    author: {
      name: 'Zainab Shujat',
      role: 'Founder & Editor',
    },
    readingTimeMinutes: 5,
    publishedAt: '2026-06-17',
    status: 'published',
    featured: false,
    tags: ['student-life', 'personal-growth', 'burnout', 'resilience', 'final-year'],
  },
  {
    id: 'art_01',
    slug: 'the-art-of-the-first-principles-debugger',
    title: 'The Art of the First-Principles Debugger: What Really Happens When Code Silently Lies',
    subtitle: 'Why tracing the call stack backwards through hardware interrupts teaches you more about computer science than any tutorial.',
    excerpt: 'When a distributed consensus algorithm stalls at 3:00 AM, the bug rarely lives where you think. A journey down the rabbit hole of memory alignments, compiler reorderings, and why disciplined observation beats blind speculation.',
    content: `
### The Illusion of Determinism

Every programmer remembers the first time they felt betrayed by a machine. You wrote the loop. You typed the condition. The types checked out, the test suite passed with green badges, and yet, in the heat of a production-style simulation, the invariant crumbled.

In computing curricula, we are conditioned to believe that software is a branch of pure applied logic. But software running on physical silicon is fundamentally a physical artifact. It is governed by voltage thresholds, thermal throttling, cache-line invalidation cascades, and kernel preemptions.

> "To debug without a hypothesis is like navigating an unmapped ocean without stars: every direction feels plausible, and all of them lead to exhaustion."

### 1. The Anatomy of Silent Failure

Consider what happens during a subtle race condition in an asynchronous state machine:

1. **State divergence:** Thread $A$ assumes an exclusive lease on a memory buffer while Thread $B$ is preempted halfway through updating a pointer.
2. **The invisible corruptor:** Because no immediate segmentation fault occurs, the corrupted pointer quietly pollutes downstream structures.
3. **Delayed detonation:** Three hours later, an unrelated batch job fails on an out-of-bounds error.

When you inspect the core dump, the victim is not the culprit. The code you blame is merely the unlucky bystander who stepped on the landmine left by someone else milliseconds earlier.

\`\`\`rust
// A simplified depiction of an unguarded write-state pattern
pub struct LeaseState<T> {
    data: UnsafeCell<T>,
    owner_epoch: AtomicU64,
}

impl<T> LeaseState<T> {
    pub fn try_acquire(&self, epoch: u64) -> Option<&mut T> {
        // Subtle race: epoch updated before barrier synchronization
        if self.owner_epoch.load(Ordering::Relaxed) == epoch {
            Some(unsafe { &mut *self.data.get() })
        } else {
            None
        }
    }
}
\`\`\`

### 2. Building an Internal Dialectic

When debugging deep systems, you must conduct a rigorous dialogue with yourself:

- **What did I assume was true without verifying?** (e.g., *Is the clock monotonic across all virtual CPU sockets?*)
- **Can I reproduce the failure in miniature?** If your reproduction requires fifty microservices, you do not yet understand the boundary of failure.
- **What is the simplest impossible state that has manifested?**

### 3. The Humility of the Engineering Mind

In the end, first-principles debugging is not merely a technical skill—it is an exercise in intellectual humility. The compiler does not hate you. The Linux kernel scheduler is not malicious. The machine is simply executing what was specified, with indifferent precision.

Once you realize that your mental model is the bug, you stop fighting the machine and start listening to it.
`,
    category: CATEGORIES[1], // Systems & Compilers
    author: {
      name: 'Zainab Shujat',
      role: 'Editor',
    },
    readingTimeMinutes: 8,
    publishedAt: '2026-08-28',
    status: 'published',
    featured: true,
    issueSlug: 'issue-01',
    tags: ['Compilers', 'Concurrency', 'Mental Models', 'Rust'],
  },
  {
    id: 'art_02',
    slug: 'attention-weights-and-epistemic-illusions',
    title: 'Attention Weights, Latent Manifolds, and Epistemic Illusions',
    subtitle: 'An engineering dissection of transformer self-attention and why human intuition fails in 4,096 dimensions.',
    excerpt: 'We often speak of large language models as though they "understand" syntax. In reality, they trace geometric geodesics across hyper-dimensional manifold spaces. Here is an intuitive derivation for engineers.',
    content: `
### The Geometry of Semantic Association

When we compute scaled dot-product attention:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

we are not simulating consciousness. We are performing pairwise cosine similarity projections in an ultra-high dimensional vector space, weighted by learnable projections that minimize cross-entropy loss over billions of token transitions.

### Why High-Dimensional Intuition Fails

In three dimensions, distance is intuitive. In 4,096 dimensions, almost all vectors are orthogonal to each other. The "curse of dimensionality" becomes a blessing for linear separability: concepts that appear hopelessly tangled in low dimensions can be cleanly cleaved apart with a single hyperplane.

\`\`\`python
# Vector similarity intuition in high dimensions
import numpy as np

def sample_orthogonality(dim=4096, n_pairs=1000):
    v1 = np.random.randn(n_pairs, dim)
    v2 = np.random.randn(n_pairs, dim)
    
    # Normalize vectors
    v1 /= np.linalg.norm(v1, axis=1, keepdims=True)
    v2 /= np.linalg.norm(v2, axis=1, keepdims=True)
    
    # Cosine similarities cluster tightly around zero
    cosine_sims = np.sum(v1 * v2, axis=1)
    return np.mean(np.abs(cosine_sims)), np.std(cosine_sims)
\`\`\`

### The Epistemic Trap

The real danger is not that machines will become sentient overnight; the danger is that we anthropomorphize their geometric approximations. As engineering students and software architects, our obligation is to see the matrix multiplications clearly, stripped of marketing mythology.
`,
    category: CATEGORIES[2], // AI & Cognition
    author: {
      name: 'Zainab Shujat',
      role: 'Editor',
    },
    readingTimeMinutes: 11,
    publishedAt: '2026-08-14',
    status: 'published',
    featured: false,
    issueSlug: 'issue-01',
    tags: ['Machine Learning', 'Linear Algebra', 'Transformers', 'Math'],
  },
  {
    id: 'art_03',
    slug: 'why-i-stopped-chasing-every-new-framework',
    title: 'Why I Stopped Chasing Every New Framework: A Manifesto for Durable Foundations',
    subtitle: 'From frontend churn to distributed databases: how learning things that change slowly gave me my sanity back.',
    excerpt: 'Every six months, a new build tool promises to change everything. But POSIX, TCP/IP, relational algebra, and tree traversals remain stubborn fixtures. Here is my personal framework for choosing what to study.',
    content: `
### The Half-Life of Technical Knowledge

Early in my engineering studies, I felt an unrelenting anxiety. Every week on Hacker News or GitHub trending, a new framework was crowned as the singular future of software development. I spent countless evenings memorizing ephemeral configuration flags and bespoke reactive primitives.

Then I calculated the half-life of what I was learning:

- **Specific CLI flag:** ~18 months
- **State management library API:** ~2 years
- **Relational algebra & SQL indexes:** 40+ years
- **TCP slow-start and flow control:** 45+ years
- **Algorithm complexity & cache hierarchies:** 50+ years

### The Lindy Effect in Software

The Lindy Effect posits that the future life expectancy of a non-perishable technology is proportional to its current age. A tool that has survived 30 years is far more likely to be relevant in another 30 years than a tool released last Tuesday.

Invest your finite cognitive bandwidth where compounding interest works in your favor.
`,
    category: CATEGORIES[4], // The Engineer's Craft
    author: {
      name: 'Zainab Shujat',
      role: 'Editor',
    },
    readingTimeMinutes: 6,
    publishedAt: '2026-07-30',
    status: 'published',
    featured: false,
    issueSlug: 'issue-01',
    tags: ['Learning', 'Career', 'Foundations', 'Craft'],
  },
  {
    id: 'art_04',
    slug: 'the-anatomy-of-a-btech-night',
    title: 'The Anatomy of a 2:00 AM Lab Session: When the Breadboard Finally Talks',
    subtitle: 'Field notes on the sensory chaos of engineering school: oscilloscope hums, solder smoke, and the sudden silence of a working circuit.',
    excerpt: 'An evocative look into the quiet hours of an engineering college lab, where theoretical equations from morning lectures collide violently with physical wires, loose resistors, and unexpected signal noise.',
    content: `
### The Smell of Burnt Flux and Fluorescent Light

There is a particular acoustic signature to a university hardware lab after midnight. The fans on the digital oscilloscopes hum with a droning B-flat. Somewhere in row four, a soldering iron sits idling in its coiled brass cradle, emitting the faint sweet sting of rosin core flux.

You have been staring at an SPI communication handshake between a microcontroller and an external EEPROM for six hours. On the logic analyzer, the clock line oscillates with crisp square waves, but MISO remains stubbornly pulled low.

### The Breakthrough

And then, you notice it: a single floating ground lead on pin 14. You seat the jumper wire into the bus bar with a tiny tactile snap. 

Instantly, the logic analyzer bursts into blue and orange packets. '0xAA', '0x55', '0x7E'. The EEPROM has answered.

Nobody will throw a parade for your working SPI bus. But in that solitary moment, in an empty classroom with cold tea on your desk, you made a tiny corner of the physical universe obey the laws of mathematics.
`,
    category: CATEGORIES[5], // Student Field Notes
    author: {
      name: 'Zainab Shujat',
      role: 'Editor',
    },
    readingTimeMinutes: 5,
    publishedAt: '2026-07-12',
    status: 'published',
    featured: false,
    issueSlug: 'issue-01',
    tags: ['Student Life', 'Hardware', 'Reflections', 'Lab Notes'],
  },
  {
    id: 'art_05',
    slug: 'designing-software-that-feels-like-paper',
    title: 'Designing Software That Feels Like Fine Paper: An Essay on Digital Texture',
    subtitle: 'Why modern web interfaces feel so sterile and how editorial typography can restore warmth, dignity, and calm.',
    excerpt: 'Between blinding neon glassmorphism and hyperactive SaaS micro-animations, digital reading has become an assault on attention. We explore how book design, ink-density, and restrained typographic cadence create interfaces worth lingering over.',
    content: `
### The Depletion of Digital Silence

Pick up a well-bound book printed on 90gsm wood-free cream stock. Notice how your breathing alters. There are no banners pulsing in your peripheral vision. There are no popups pleading for your email address within four seconds of arrival. The typography has a weight, a deliberate horizontal cadence, and generous margins that allow ideas to breathe.

Now compare that with the contemporary web: floating sticky headers that consume 20% of your viewport, animated badges competing for dopamine, and stark white backgrounds with 100% black text that fatigue the retina.

### The Four Principles of Editorial Interface Design

1. **Warm White, Not Clinical White:** Our visual cortex did not evolve to stare into a bare fluorescent bulb. A warm off-white (\`#FAFAF8\` or \`#F6F4EE\`) mimics natural paper reflectance.
2. **Serif Dignity:** While sans-serif excels at small navigational labels, an editorial headline demands the typographic authority of an ink-inspired serif.
3. **Respectful Information Density:** White space is not empty space; it is the frame that gives text its value.
4. **Permanent Goods vs. Ephemeral Feeds:** When we treat an article like a publication rather than a "content post," the entire relationship between reader and author shifts from scrolling to contemplative engagement.
`,
    category: CATEGORIES[4], // The Engineer's Craft
    author: {
      name: 'Zainab Shujat',
      role: 'Editor',
    },
    readingTimeMinutes: 7,
    publishedAt: '2026-06-25',
    status: 'published',
    featured: false,
    issueSlug: 'issue-02',
    tags: ['UI/UX', 'Design', 'Typography', 'Aesthetics'],
  },
  {
    id: 'art_06',
    slug: 'the-physics-of-cache-misses',
    title: 'The Physics of Cache Misses: Memory Latency and Cosmic Distances',
    subtitle: 'Translating nanoseconds to human scale reveals the startling geography of modern computer architecture.',
    excerpt: 'To a modern 4GHz processor, fetching data from main memory is the cognitive equivalent of walking to another city. When you understand the physical latency hierarchy, software optimization becomes intuitive.',
    content: `
### A Human Metaphor for Silicon Speed

Humans are notoriously poor at comprehending micro-durations. A nanosecond ($10^{-9}$ seconds) feels identical to a millisecond ($10^{-3}$ seconds). But to a processor executing four cycles per nanosecond, they are different planetary epochs.

Let us scale one CPU cycle (0.3 nanoseconds) to **one human second**:

| Hardware Event | Silicon Time | Human Scaled Time | Metaphorical Distance |
| :--- | :--- | :--- | :--- |
| **L1 Cache Reference** | 0.5 ns | ~1.5 seconds | Grabbing a pen from your desk |
| **Branch Mispredict** | 5 ns | ~15 seconds | Looking around the room |
| **L2 Cache Reference** | 7 ns | ~21 seconds | Grabbing a book from the shelf |
| **L3 Cache Reference** | 20 ns | ~1 minute | Walking to the lab door |
| **Main Memory (DRAM)** | 60–100 ns | ~3 to 5 minutes | Walking down the street for coffee |
| **NVMe SSD Read** | 25,000 ns | ~1.5 days | Taking a flight to another continent |
| **Network roundtrip (SF to NY)**| 40,000,000 ns| ~4.5 years | Traveling to Jupiter and back |

### Why Data Locality Dominates Algorithmic Big-O

In introductory algorithms, we are taught that binary search trees provide $O(\\log N)$ operations and arrays provide $O(N)$ insertions. But in practical benchmarks on modern hardware, traversing a pointer-chasing tree can be twenty times slower than scanning a contiguous vector.

Why? Because the tree constantly forces the CPU to wait four minutes for DRAM, while the sequential array allows hardware prefetchers to feed the L1 cache like a conveyor belt.
`,
    category: CATEGORIES[6], // Science & Physics
    author: {
      name: 'Zainab Shujat',
      role: 'Editor',
    },
    readingTimeMinutes: 9,
    publishedAt: '2026-06-10',
    status: 'published',
    featured: false,
    issueSlug: 'issue-02',
    tags: ['Computer Architecture', 'Hardware', 'Performance', 'Physics'],
  },
  {
    id: 'art_07',
    slug: 'the-loneliness-of-the-self-taught-engineer',
    title: 'The Loneliness of the Self-Taught Engineer: What No Roadmap Tells You',
    subtitle: 'Beyond the roadmap repositories and curated bootcamps: navigating the wilderness of not knowing what you do not know.',
    excerpt: 'An intimate reflection on the emotional arc of learning technical craft in isolation, the mirage of competence from video courses, and the moment you finally build something without looking at the answer key.',
    content: `
### The Roadmap Illusion

Open any popular developer repository today and you will find sprawling SVG diagrams: hundreds of colorful rectangular nodes connecting HTML to Docker, Kubernetes, WebAssembly, and GraphQL. The arrows point forward with the confident certainty of a train schedule.

What the diagrams do not depict is the vast, desolate fog between node 12 and node 13.

### The Pit of Despair Between Tutorial and Reality

When you follow a step-by-step tutorial, you are driving with GPS on a sunny day in someone else's car. Everything is paved. The author has already absorbed the compile errors, smoothed over the incompatible package versions, and pruned away the dead ends.

Real engineering begins precisely when the GPS loses signal in a thunderstorm.

You open an empty terminal. You type \`mkdir project\`. And suddenly, you are paralyzed by fifty trivial decisions: Which bundler? What directory layout? How should errors propagate?

### The Remedy: Build Ugly Things

The only antidote to the loneliness of the autodidact is to accept the indignity of building embarrassing, brittle, imperfect prototypes. Your first parser will be ugly. Your first relational schema will have denormalized redundancies. Your first CSS will have specificity wars.

Good. Build it anyway. Because true competence is not the absence of struggle—it is the familiarity with it.
`,
    category: CATEGORIES[5], // Student Field Notes
    author: {
      name: 'Zainab Shujat',
      role: 'Editor',
    },
    readingTimeMinutes: 6,
    publishedAt: '2026-05-18',
    status: 'published',
    featured: false,
    tags: ['Reflections', 'Career', 'Mental Health', 'Learning'],
  },
  {
    id: 'art_08',
    slug: 'building-resilient-distributed-queues-from-scratch',
    title: 'Building Resilient Message Queues: Notes on At-Least-Once Delivery',
    subtitle: 'A technical deep-dive into write-ahead logs, consumer heartbeats, and disk fsync semantics.',
    excerpt: 'Message queues power modern asynchronous architectures. But behind the friendly client libraries of Kafka and RabbitMQ lies a brutal reality of network partitions and disk write caches.',
    content: `
### The Guarantee Trap

Every engineer eventually encounters the three classic fallacies of message brokers:

1. "Messages will always arrive in order."
2. "Messages will be delivered exactly once without coordinated two-phase commit."
3. "The disk write is persisted as soon as the OS returns from \`write()\`."

### The Reality of Fsync and Disk Controllers

When an application calls \`write()\` on a POSIX socket or file descriptor, the operating system kernel copies the bytes into page cache memory. The return code is immediate. But if power fails a millisecond later, the data evaporates into the ether.

To truly guarantee durability, an append-only log must issue an explicit \`fsync(fd)\` or \`fdatasync(fd)\`. And even then, drive manufacturers frequently lie about physical platter flush completion unless ordered by a battery-backed write cache.

\`\`\`c
// The fundamental persistence barrier
int append_entry(int log_fd, const void *record, size_t len) {
    ssize_t written = write(log_fd, record, len);
    if (written != (ssize_t)len) {
        return -1; // Partial write error
    }
    // Force disk controller to flush internal volatile DRAM cache
    if (fdatasync(log_fd) != 0) {
        return -2; // Persistence failure
    }
    return 0;
}
\`\`\`

Designing for failure from day one is what separates hobbyist scripts from mission-critical infrastructure.
`,
    category: CATEGORIES[1], // Systems & Compilers
    author: {
      name: 'Zainab Shujat',
      role: 'Editor',
    },
    readingTimeMinutes: 10,
    publishedAt: '2026-04-29',
    status: 'published',
    featured: false,
    tags: ['Distributed Systems', 'Databases', 'C', 'Queues'],
  },
];
