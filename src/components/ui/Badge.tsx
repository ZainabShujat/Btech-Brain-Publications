import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline' | 'subtle' | 'success';
}

export function Badge({
  children,
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-[#F3EFE6] text-[#57534E] border border-[#E7E5E4]',
    accent: 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]',
    outline: 'border border-[#D6D3D1] text-[#57534E]',
    subtle: 'bg-[#FAF9F5] text-[#78716C] border border-[#E7E5E4]',
    success: 'bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center text-xs font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-sm',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
