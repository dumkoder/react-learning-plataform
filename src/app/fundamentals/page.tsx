import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export default function FundamentalsPage() {
  const lessons = [
    {
      id: "components",
      title: "React Component Definition",
      description: "Learn how to create and structure React components",
      difficulty: "Beginner",
      duration: "15 min"
    },
    {
      id: "jsx",
      title: "JSX Syntax",
      description: "Master JSX syntax and understand how it works under the hood",
      difficulty: "Beginner",
      duration: "20 min"
    },
    {
      id: "state",
      title: "Component State",
      description: "Understand component state and how to manage it",
      difficulty: "Beginner",
      duration: "25 min"
    },
    {
      id: "lifecycle",
      title: "Component Lifecycle",
      description: "Learn about component lifecycle methods and their usage",
      difficulty: "Intermediate",
      duration: "30 min"
    },
    {
      id: "composition",
      title: "Component Composition",
      description: "Master component composition patterns and best practices",
      difficulty: "Intermediate",
      duration: "25 min"
    },
    {
      id: "react-dom",
      title: "React DOM",
      description: "Understand React DOM and rendering concepts",
      difficulty: "Beginner",
      duration: "20 min"
    },
    {
      id: "forms",
      title: "Forms and Events",
      description: "Handle forms and events in React applications",
      difficulty: "Intermediate",
      duration: "35 min"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          React Fundamentals
        </h1>
        <p className="text-xl text-muted-foreground">
          Master the core concepts of React development with comprehensive lessons and examples.
        </p>
      </div>

      <div className="grid gap-6">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/fundamentals/${lesson.id}`}
            className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-border group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-card-foreground group-hover:text-blue-600 transition-colors">
                    {lesson.title}
                  </h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  {lesson.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    lesson.difficulty === 'Beginner' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {lesson.difficulty}
                  </span>
                  <span>{lesson.duration}</span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Ready for Advanced Topics?
        </h3>
        <p className="text-blue-700 mb-4">
          Once you've completed the fundamentals, explore advanced React concepts including Hooks, Context, and Performance optimization.
        </p>
        <Link 
          href="/hooks"
          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
        >
          Explore Hooks <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}