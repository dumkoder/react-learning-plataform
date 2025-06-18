import Link from "next/link";
import { BookOpen, Code, PlayCircle, Users } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Lessons",
      description: "Learn React from basics to advanced concepts with detailed explanations and examples.",
      href: "/fundamentals"
    },
    {
      icon: Code,
      title: "Interactive Coding",
      description: "Practice React concepts with live coding exercises and instant feedback.",
      href: "/playground"
    },
    {
      icon: PlayCircle,
      title: "Hands-on Examples",
      description: "Explore real-world examples and patterns used in modern React applications.",
      href: "/advanced"
    },
    {
      icon: Users,
      title: "Progressive Learning",
      description: "Follow a structured learning path from beginner to advanced React developer.",
      href: "/hooks"
    }
  ];

  const topics = [
    "React Component Definition",
    "JSX",
    "Component State & Lifecycle",
    "Hooks",
    "Component Composition",
    "React DOM",
    "Forms & Context",
    "Performance Optimization",
    "Code Reuse Patterns",
    "Virtual DOM",
    "Security & TypeChecking",
    "Redux & State Management",
    "Routing",
    "Testing",
    "Building & Deployment",
    "Server-Side Rendering"
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12 mb-12">
        <h1 className="text-5xl font-bold text-foreground mb-6">
          Master React Development
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Complete React learning platform with interactive lessons, live coding exercises, 
          and comprehensive coverage of all React concepts from fundamentals to advanced patterns.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/fundamentals"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Learning
          </Link>
          <Link 
            href="/playground"
            className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Try Playground
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Link 
              key={index} 
              href={feature.href}
              className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border"
            >
              <IconComponent className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Topics Covered */}
      <div className="bg-card rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-card-foreground mb-6 text-center">
          Topics Covered
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topics.map((topic, index) => (
            <div 
              key={index}
              className="bg-muted p-4 rounded-lg border border-border"
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                <span className="text-foreground font-medium">{topic}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
