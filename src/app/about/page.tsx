import React from 'react';
import { Container } from '@/components/layout/Container';
import { Feather, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'About the Publication',
  description: 'The story, philosophy, and colophon behind Notes From a B.Tech Brain by Zainab Shujat.',
};

export default function AboutPage() {
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

          <div className="bg-white border border-[#E7E5E4] rounded-sm p-6 my-6 not-prose">
            <p className="font-serif text-xl font-bold text-[#1C1917]">Zainab Shujat</p>
            <p className="text-sm font-mono text-[#78716C] mt-1">
              B.Tech CSE student · Developer · Writer · Perpetually curious
            </p>
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
