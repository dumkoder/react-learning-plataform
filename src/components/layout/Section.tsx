import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg';
}

export function Section({ 
  title, 
  description, 
  children, 
  className,
  spacing = 'md' 
}: SectionProps) {
  const spacingClasses = {
    sm: 'mb-6',
    md: 'mb-12',
    lg: 'mb-16',
  };

  return (
    <section className={cn(spacingClasses[spacing], className)}>
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}