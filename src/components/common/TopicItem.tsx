import { Badge } from '@/components/ui';

interface TopicItemProps {
  topic: string;
  index?: number;
}

export function TopicItem({ topic, index }: TopicItemProps) {
  return (
    <div className="bg-muted p-4 rounded-lg border border-border">
      <div className="flex items-center">
        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
        <span className="text-foreground font-medium">{topic}</span>
        {index !== undefined && (
          <Badge variant="info" className="ml-auto">
            {index + 1}
          </Badge>
        )}
      </div>
    </div>
  );
}