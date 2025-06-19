import Link from "next/link";
import { ArrowRight, FileText, Zap, Shield, Cpu } from "lucide-react";

export default function AdvancedPage() {
  const topics = [
    {
      id: "context",
      title: "Context API",
      description: "Share data across components without prop drilling",
      icon: FileText,
      difficulty: "Intermediate",
      duration: "30 min"
    },
    {
      id: "performance",
      title: "Performance Optimization",
      description: "Optimize React apps with memoization and code splitting",
      icon: Zap,
      difficulty: "Advanced",
      duration: "45 min"
    },
    {
      id: "patterns",
      title: "Code Reuse Patterns",
      description: "Higher-Order Components, Render Props, and Compound Components",
      icon: Cpu,
      difficulty: "Advanced",
      duration: "50 min"
    },
    {
      id: "virtual-dom",
      title: "Virtual DOM",
      description: "Understand how React's Virtual DOM works and reconciliation",
      icon: FileText,
      difficulty: "Advanced",
      duration: "35 min"
    },
    {
      id: "security",
      title: "Security & TypeChecking",
      description: "Secure React apps and implement proper type checking",
      icon: Shield,
      difficulty: "Intermediate",
      duration: "40 min"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Advanced React Concepts
        </h1>
        <p className="text-xl text-muted-foreground">
          Deep dive into advanced React patterns, performance optimization, and architectural concepts.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-2">Prerequisites</h2>
        <p className="text-muted-foreground mb-4">
          Before diving into advanced topics, make sure you&apos;re comfortable with:
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <ul className="list-disc list-inside space-y-1">
            <li>React components and JSX</li>
            <li>State management with hooks</li>
            <li>Event handling and forms</li>
          </ul>
          <ul className="list-disc list-inside space-y-1">
            <li>useEffect and lifecycle concepts</li>
            <li>Component composition</li>
            <li>Basic performance considerations</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-6">
        {topics.map((topic) => {
          const IconComponent = topic.icon;
          return (
            <Link
              key={topic.id}
              href={`/advanced/${topic.id}`}
              className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-border group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <IconComponent className="h-5 w-5 text-primary mr-2" />
                    <h2 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {topic.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {topic.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      topic.difficulty === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {topic.difficulty}
                    </span>
                    <span>{topic.duration}</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            State Management
          </h3>
          <p className="text-muted-foreground mb-4">
            Ready to tackle complex state management? Learn Redux and advanced state patterns.
          </p>
          <Link 
            href="/redux"
            className="inline-flex items-center text-primary font-medium hover:text-primary/80"
          >
            Learn Redux <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Testing & Deployment
          </h3>
          <p className="text-muted-foreground mb-4">
            Learn testing strategies and deployment techniques for React applications.
          </p>
          <Link 
            href="/testing"
            className="inline-flex items-center text-primary font-medium hover:text-primary/80"
          >
            Explore Testing <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}