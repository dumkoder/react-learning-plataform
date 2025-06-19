"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent, getContent, getArrayContent } from "@/hooks/useContent";
import { Button, Card } from "@/components/ui";
import { LessonCard } from "@/components/common";
import { PageHeader, Section, Grid } from "@/components/layout";

interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
}

export default function FundamentalsPage() {
  const { content } = useContent();
  const lessons = getArrayContent(content, 'fundamentals.lessons') as Lesson[];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title={getContent(content, 'fundamentals.title', 'React Fundamentals')}
        description={getContent(content, 'fundamentals.description', 'Master the core concepts of React development with comprehensive lessons and examples.')}
      />

      <Section>
        <Grid cols={1}>
          {lessons.map((lesson) => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson} 
              basePath="/fundamentals" 
            />
          ))}
        </Grid>
      </Section>

      <Section>
        <Card className="bg-accent">
          <h3 className="text-lg font-semibold text-accent-foreground mb-2">
            {getContent(content, 'fundamentals.nextSection.title', 'Ready for Advanced Topics?')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {getContent(content, 'fundamentals.nextSection.description', 'Once you\'ve completed the fundamentals, explore advanced React concepts including Hooks, Context, and Performance optimization.')}
          </p>
          <Link href="/hooks">
            <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
              {getContent(content, 'fundamentals.nextSection.linkText', 'Explore Hooks')} <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </Card>
      </Section>
    </div>
  );
}