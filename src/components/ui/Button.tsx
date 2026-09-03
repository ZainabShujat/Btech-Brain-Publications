import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'editorial';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B45309] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variantClasses = {
      primary:
        'bg-[#1C1917] text-[#FAF9F5] hover:bg-[#292524] shadow-sm hover:shadow active:scale-[0.99]',
      secondary:
        'bg-[#F3EFE6] text-[#1C1917] hover:bg-[#E8E2D5] border border-[#E7E5E4]',
      outline:
        'border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF9F5]',
      ghost:
        'text-[#57534E] hover:text-[#1C1917] hover:bg-[#F3EFE6]',
      editorial:
        'bg-[#B45309] text-white hover:bg-[#92400E] shadow-sm font-serif tracking-wide',
    };

    const sizeClasses = {
      sm: 'text-xs px-3 py-1.5 rounded-sm gap-1.5',
      md: 'text-sm px-5 py-2.5 rounded-sm gap-2',
      lg: 'text-base px-7 py-3 rounded-sm gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
