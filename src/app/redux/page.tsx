import Link from "next/link";
import { ArrowRight, ArrowLeft, FileText, Database, Workflow } from "lucide-react";

export default function ReduxPage() {
  const topics = [
    {
      id: "introduction",
      title: "Redux Introduction",
      description: "Understand Redux principles and when to use it",
      icon: FileText,
      difficulty: "Intermediate",
      duration: "25 min"
    },
    {
      id: "store-actions-reducers",
      title: "Store, Actions & Reducers",
      description: "Learn the core building blocks of Redux",
      icon: Database,
      difficulty: "Intermediate",
      duration: "35 min"
    },
    {
      id: "react-redux",
      title: "React Redux",
      description: "Connect Redux with React using React-Redux",
      icon: Workflow,
      difficulty: "Intermediate",
      duration: "30 min"
    },
    {
      id: "redux-toolkit",
      title: "Redux Toolkit",
      description: "Modern Redux with Redux Toolkit (RTK)",
      icon: FileText,
      difficulty: "Advanced",
      duration: "40 min"
    },
    {
      id: "async-flow",
      title: "Redux Async Flow",
      description: "Handle async operations with Redux Thunk and RTK Query",
      icon: Workflow,
      difficulty: "Advanced",
      duration: "45 min"
    },
    {
      id: "best-practices",
      title: "Redux Best Practices",
      description: "Patterns and best practices for scalable Redux apps",
      icon: FileText,
      difficulty: "Advanced",
      duration: "30 min"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Redux & State Management
        </h1>
        <p className="text-xl text-muted-foreground">
          Master Redux for predictable state management in complex React applications.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-2">What is Redux?</h2>
        <p className="text-muted-foreground mb-4">
          Redux is a predictable state container for JavaScript apps. It helps you manage application state 
          in a consistent way across client, server, and native environments.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-foreground">
          <div className="bg-muted p-3 rounded border border-border">
            <strong>Predictable:</strong> Same state + same action = same result
          </div>
          <div className="bg-muted p-3 rounded border border-border">
            <strong>Centralized:</strong> All state in a single store
          </div>
          <div className="bg-muted p-3 rounded border border-border">
            <strong>Debuggable:</strong> Time-travel debugging with DevTools
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {topics.map((topic) => {
          const IconComponent = topic.icon;
          return (
            <Link
              key={topic.id}
              href={`/redux/${topic.id}`}
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

      <div className="mt-12 bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          When to Use Redux
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-foreground mb-2">✅ Good Use Cases:</h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Large applications with complex state</li>
              <li>State shared across many components</li>
              <li>Frequent state updates</li>
              <li>Need for time-travel debugging</li>
              <li>Team development with consistent patterns</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">❌ Might Be Overkill:</h4>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Simple applications</li>
              <li>Local component state only</li>
              <li>Few state updates</li>
              <li>Small development team</li>
              <li>Just starting to learn React</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-border mt-8">
        <Link 
          href="/advanced"
          className="flex items-center text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Advanced Topics
        </Link>
        
        <Link 
          href="/routing"
          className="flex items-center text-primary hover:text-primary/80"
        >
          Next: Routing
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}