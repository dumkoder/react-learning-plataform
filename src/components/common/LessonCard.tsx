import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { Card, Badge } from '@/components/ui';

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    duration: string;
  };
  basePath: string;
}

export function LessonCard({ lesson, basePath }: LessonCardProps) {
  const difficultyVariant = lesson.difficulty.toLowerCase() === 'beginner' 
    ? 'success' 
    : lesson.difficulty.toLowerCase() === 'intermediate' 
    ? 'warning' 
    : 'error';

  return (
    <Link
      href={`${basePath}/${lesson.id}`}
      className="group"
    >
      <Card variant="elevated" className="group-hover:shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <FileText className="h-5 w-5 text-primary mr-2" />
              <h2 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {lesson.title}
              </h2>
            </div>
            <p className="text-muted-foreground mb-4">
              {lesson.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Badge variant={difficultyVariant}>
                {lesson.difficulty}
              </Badge>
              <span>{lesson.duration}</span>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </Card>
    </Link>
  );
}