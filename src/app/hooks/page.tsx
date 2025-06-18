import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

export default function HooksPage() {
  const hooks = [
    {
      id: "useState",
      title: "useState Hook",
      description: "Manage component state with the useState hook",
      difficulty: "Beginner",
      duration: "20 min"
    },
    {
      id: "useEffect",
      title: "useEffect Hook",
      description: "Handle side effects and component lifecycle",
      difficulty: "Beginner",
      duration: "25 min"
    },
    {
      id: "useContext",
      title: "useContext Hook",
      description: "Consume context values without prop drilling",
      difficulty: "Intermediate",
      duration: "30 min"
    },
    {
      id: "useReducer",
      title: "useReducer Hook",
      description: "Manage complex state with reducer patterns",
      difficulty: "Intermediate",
      duration: "35 min"
    },
    {
      id: "useMemo",
      title: "useMemo Hook",
      description: "Optimize performance with memoized values",
      difficulty: "Advanced",
      duration: "25 min"
    },
    {
      id: "useCallback",
      title: "useCallback Hook",
      description: "Memoize functions to prevent unnecessary re-renders",
      difficulty: "Advanced",
      duration: "25 min"
    },
    {
      id: "custom-hooks",
      title: "Custom Hooks",
      description: "Create reusable stateful logic with custom hooks",
      difficulty: "Advanced",
      duration: "40 min"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          React Hooks
        </h1>
        <p className="text-xl text-muted-foreground">
          Master React Hooks to manage state and side effects in functional components.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">What are React Hooks?</h2>
        <p className="text-blue-800 mb-4">
          Hooks are functions that let you "hook into" React state and lifecycle features from function components. 
          They were introduced in React 16.8 and allow you to use state and other React features without writing a class.
        </p>
        <div className="text-sm text-blue-700">
          <strong>Rules of Hooks:</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Only call hooks at the top level of your React functions</li>
            <li>Don't call hooks inside loops, conditions, or nested functions</li>
            <li>Only call hooks from React function components or custom hooks</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-6">
        {hooks.map((hook) => (
          <Link
            key={hook.id}
            href={`/hooks/${hook.id}`}
            className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all border border-border group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <FileText className="h-5 w-5 text-blue-600 mr-2" />
                  <h2 className="text-xl font-semibold text-card-foreground group-hover:text-blue-600 transition-colors">
                    {hook.title}
                  </h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  {hook.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    hook.difficulty === 'Beginner' 
                      ? 'bg-green-100 text-green-700' 
                      : hook.difficulty === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {hook.difficulty}
                  </span>
                  <span>{hook.duration}</span>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-green-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Ready for Advanced Topics?
        </h3>
        <p className="text-green-700 mb-4">
          After mastering hooks, explore advanced React concepts like Context API, Performance optimization, and design patterns.
        </p>
        <Link 
          href="/advanced"
          className="inline-flex items-center text-green-600 font-medium hover:text-green-700"
        >
          Explore Advanced Topics <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}