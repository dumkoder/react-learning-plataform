"use client";

import Link from "next/link";
import { useContent, getContent, getArrayContent } from "@/hooks/useContent";
import { getFeatureIcons, getFeatureHrefs, createFeatures } from "@/lib/utils";
import { Button } from "@/components/ui";
import { FeatureCard, TopicItem } from "@/components/common";
import { Section, Grid } from "@/components/layout";

export default function Home() {
  const { content } = useContent();
  
  const features = createFeatures(
    getArrayContent(content, 'home.features'),
    getFeatureIcons(),
    getFeatureHrefs()
  );

  const topics = getArrayContent(content, 'home.topics') as string[];

  return (
    <div className="max-w-6xl mx-auto">
      <Section>
        <div className="text-center py-12">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            {getContent(content, 'home.hero.title', 'Master React Development')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {getContent(content, 'home.hero.description', 'Complete React learning platform with interactive lessons, live coding exercises, and comprehensive coverage of all React concepts from fundamentals to advanced patterns.')}
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/fundamentals">
              <Button>
                {getContent(content, 'home.hero.startLearning', 'Start Learning')}
              </Button>
            </Link>
            <Link href="/playground">
              <Button variant="outline">
                {getContent(content, 'home.hero.tryPlayground', 'Try Playground')}
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <Grid cols={4}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </Grid>
      </Section>

      <Section 
        title={getContent(content, 'home.topicsTitle', 'Topics Covered')}
        className="bg-card rounded-lg shadow-md p-8"
      >
        <Grid cols={4}>
          {topics.map((topic, index) => (
            <TopicItem key={index} topic={topic} index={index} />
          ))}
        </Grid>
      </Section>
    </div>
  );
}
