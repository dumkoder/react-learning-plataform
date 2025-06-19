import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center rounded-full font-medium transition-colors';
    
    const variants = {
      default: 'bg-muted text-muted-foreground',
      success: 'bg-green-500/10 text-green-400',
      warning: 'bg-yellow-500/10 text-yellow-400',
      error: 'bg-red-500/10 text-red-400',
      info: 'bg-blue-500/10 text-blue-400',
    };

    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
    };

    return (
      <span
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, type BadgeProps };