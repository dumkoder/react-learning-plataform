import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-foreground mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-xl text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}