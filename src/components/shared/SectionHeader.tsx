import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  href?: string;
  actionText?: string;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  href,
  actionText,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#E7E5E4]', className)}>
      <div className="max-w-2xl">
        {label && (
          <div className="text-xs font-mono uppercase tracking-widest text-[#B45309] font-medium mb-1.5">
            {label}
          </div>
        )}
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1917] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm md:text-base text-[#57534E]">
            {description}
          </p>
        )}
      </div>

      {href && actionText && (
        <div className="mt-4 md:mt-0 shrink-0">
          <Link
            href={href}
            className="group inline-flex items-center text-sm font-medium text-[#1C1917] hover:text-[#B45309] transition-colors gap-1.5"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
}
