import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Feather, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'About the Publication',
  description: 'The story, philosophy, and colophon behind Notes From a B.Tech Brain by Zainab Shujat.',
};

export default function AboutPage() {
  const authorLinks = [
    {
      label: 'Portfolio Website',
      href: 'https://zainabshujat.dev',
      description: 'zainabshujat.dev',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn Profile',
      href: 'https://www.linkedin.com/in/zainab-shujat-web-developer',
      description: 'in/zainab-shujat-web-developer',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: 'https://github.com/ZainabShujat',
      description: 'github.com/ZainabShujat',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: 'Interactive Experience',
      href: 'https://zainabshujat.dev/explore',
      description: 'zainabshujat.dev/explore',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn Publication Page',
      href: 'https://www.linkedin.com/company/notes-from-a-b-tech-brain/',
      description: 'Notes From a B.Tech Brain',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      label: 'Email',
      href: 'mailto:zainabshujatali@gmail.com',
      description: 'zainabshujatali@gmail.com',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="py-12 space-y-16">
      <Container size="narrow">
        {/* Masthead Header */}
        <header className="space-y-4 text-center max-w-2xl mx-auto pb-10 border-b border-[#E7E5E4]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFE6] text-[#92400E] text-xs font-mono uppercase tracking-wider">
            <Feather className="w-3.5 h-3.5 text-[#B45309]" />
            <span>About</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1C1917] tracking-tight">
            About Notes From a B.Tech Brain
          </h1>

          <p className="font-serif italic text-xl text-[#78716C]">
            Turn things worth reading into things worth keeping.
          </p>
        </header>

        {/* The Narrative Essay */}
        <div className="prose-editorial mx-auto space-y-6 text-base sm:text-lg leading-relaxed text-[#57534E] pt-6">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-[#1C1917] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            Notes From a B.Tech Brain is an independent publication by Zainab Shujat, a B.Tech Computer Science &amp; Engineering student in India.
          </p>

          <p>
            It started with a fairly simple habit: writing down things I was learning, wondering about, building, getting wrong, and occasionally understanding.
          </p>

          <p>
            Some of those notes became essays. Some became experiments. Some turned into questions that were more interesting than the answers.
          </p>

          <p>
            The publication is a place for all of them.
          </p>

          {/* What I Write About */}
          <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-10 mb-4">
            What I Write About
          </h3>

          <p>
            Technology, AI, web development, science, careers, college, learning, and the strange experience of trying to become an engineer while still figuring out what that actually means.
          </p>

          <p>
            Some pieces are technical.
          </p>

          <p>
            Some are reflective.
          </p>

          <p>
            Some begin with a question that I probably should have Googled first.
          </p>

          <p>
            The common thread is curiosity.
          </p>

          {/* From Notes to Publications */}
          <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-10 mb-4">
            From Notes to Publications
          </h3>

          <p>
            Most of the writing begins online, as individual articles on Notes From a B.Tech Brain.
          </p>

          <p>
            Over time, I want some of those pieces to become something more permanent.
          </p>

          <p>
            A month&apos;s writing might become a small magazine.
          </p>

          <p>
            A collection of related ideas might become a book.
          </p>

          <p>
            And some things may simply remain notes on the internet, because not everything needs to become a hardcover edition. Humanity has enough hardcover editions.
          </p>

          <p>
            This platform is where those longer forms live.
          </p>

          <p>
            You can read the archive for free, explore monthly issues, collect books, or subscribe to future editions.
          </p>

          {/* Why Build This? */}
          <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-10 mb-4">
            Why Build This?
          </h3>

          <p>
            Because I like the idea of making things that last a little longer than a post in a feed.
          </p>

          <p>
            A LinkedIn post might disappear tomorrow.
          </p>

          <p>
            An article might get buried under the next hundred things published.
          </p>

          <p>
            A magazine can sit on a shelf.
          </p>

          <p>
            A book can be returned to years later.
          </p>

          <p>
            So this is partly a publishing experiment, partly an e-commerce project, and partly me figuring out what happens when a B.Tech student&apos;s notes start turning into actual publications.
          </p>

          {/* The Person Behind It */}
          <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-10 mb-4">
            The Person Behind It
          </h3>

          <div className="bg-white border border-[#E7E5E4] rounded-sm p-6 sm:p-8 my-8 not-prose shadow-editorial">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#E7E5E4]">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-full overflow-hidden border-2 border-[#B45309]/30 shadow-md bg-[#FAF9F5]">
                <Image
                  src="/images/zainab-shujat.png"
                  alt="Zainab Shujat"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 112px, 128px"
                  priority
                />
              </div>

              <div className="text-center sm:text-left space-y-1.5 flex-1">
                <h4 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
                  Zainab Shujat
                </h4>
                <p className="text-xs sm:text-sm font-mono text-[#B45309] font-medium">
                  B.Tech CSE student · Developer · Writer · Perpetually curious
                </p>
                <p className="text-sm text-[#57534E] leading-relaxed pt-1">
                  Building worlds that work. Developer, designer, and maker of thoughtful things.
                </p>
              </div>
            </div>

            {/* Links Grid */}
            <div className="pt-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#78716C] font-semibold block mb-3">
                Connect & Explore
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {authorLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="group flex items-center justify-between p-3 rounded-sm bg-[#FAF9F5] border border-[#E7E5E4] hover:border-[#B45309] hover:bg-white transition-all text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[#78716C] group-hover:text-[#B45309] shrink-0 transition-colors">
                        {link.icon}
                      </span>
                      <div className="truncate">
                        <span className="font-medium text-[#1C1917] block group-hover:text-[#B45309] transition-colors truncate">
                          {link.label}
                        </span>
                        <span className="text-[10px] font-mono text-[#78716C] truncate block">
                          {link.description}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A8A29E] group-hover:text-[#B45309] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-2" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <p>
            Currently learning, building, writing, and trying to understand things well enough to explain them to someone else.
          </p>

          <p>
            That&apos;s what Notes From a B.Tech Brain has always been about.
          </p>

          <p>
            Not having everything figured out.
          </p>

          <p>
            Just keeping the notes.
          </p>

          {/* Colophon */}
          <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-10 mb-4">
            Colophon
          </h3>

          <p className="text-sm font-mono text-[#78716C] leading-relaxed">
            Notes From a B.Tech Brain is an independent publication created and edited by Zainab Shujat.
            The website is built with Next.js, TypeScript, and Tailwind CSS, with an editorial visual system inspired by printed publications and modern independent presses.
          </p>

          <div className="pt-8 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-4 not-prose">
            <div>
              <span className="text-xs font-mono text-[#78716C] block">EDITORIAL INQUIRIES</span>
              <a
                href="mailto:zainabshujatali@gmail.com"
                className="text-sm font-medium text-[#1C1917] hover:text-[#B45309] transition-colors"
              >
                zainabshujatali@gmail.com
              </a>
            </div>
            <Link href="/subscribe">
              <Button variant="primary" size="md" className="gap-2">
                <span>Support the Publication</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
