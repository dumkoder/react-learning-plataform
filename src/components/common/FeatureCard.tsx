import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui';

interface FeatureCardProps {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
  };
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const IconComponent = feature.icon;

  return (
    <Link href={feature.href}>
      <Card variant="elevated" className="hover:shadow-lg">
        <IconComponent className="h-12 w-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold text-card-foreground mb-2">
          {feature.title}
        </h3>
        <p className="text-muted-foreground">
          {feature.description}
        </p>
      </Card>
    </Link>
  );
}