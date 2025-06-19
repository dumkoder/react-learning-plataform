import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function VirtualDomPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Virtual DOM
        </h1>
        <p className="text-xl text-muted-foreground">
          Understand how React's Virtual DOM works, the reconciliation process, and performance implications.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-3">What is the Virtual DOM?</h2>
        <p className="text-muted-foreground mb-4">
          The Virtual DOM is a JavaScript representation of the actual DOM (Document Object Model). 
          It's a programming concept where a virtual representation of the UI is kept in memory and 
          synced with the "real" DOM through a process called reconciliation.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">Fast:</strong>
            <p className="text-muted-foreground">JavaScript operations are faster than DOM manipulation</p>
          </div>
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">Predictable:</strong>
            <p className="text-muted-foreground">Declarative programming model</p>
          </div>
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">Optimized:</strong>
            <p className="text-muted-foreground">Batches and minimizes DOM updates</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">How Virtual DOM Works</h2>
          <p className="text-muted-foreground mb-4">
            The Virtual DOM process involves three main steps:
          </p>
          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-foreground">1. Render</h3>
              <p className="text-muted-foreground">
                When state changes, React creates a new Virtual DOM tree representing the new state of the UI.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-foreground">2. Diff</h3>
              <p className="text-muted-foreground">
                React compares (diffs) the new Virtual DOM tree with the previous Virtual DOM tree to identify what changed.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <h3 className="font-semibold text-foreground">3. Reconcile</h3>
              <p className="text-muted-foreground">
                React updates the real DOM with only the minimum necessary changes (reconciliation).
              </p>
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Virtual DOM vs Real DOM</h2>
          <p className="text-muted-foreground mb-4">
            Understanding the differences helps explain why React is performant:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-muted p-4 rounded">
              <h3 className="font-semibold text-foreground mb-2">Real DOM</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Heavy and slow</li>
                <li>Directly manipulates HTML</li>
                <li>Updates are expensive</li>
                <li>Causes layout recalculation</li>
                <li>Memory intensive</li>
              </ul>
            </div>
            <div className="bg-muted p-4 rounded">
              <h3 className="font-semibold text-foreground mb-2">Virtual DOM</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Lightweight JavaScript objects</li>
                <li>Abstract representation</li>
                <li>Fast updates and comparisons</li>
                <li>Batches DOM operations</li>
                <li>Memory efficient</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Reconciliation Algorithm</h2>
          <p className="text-muted-foreground mb-4">
            React's diffing algorithm makes certain assumptions to optimize performance:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// Example of how React diffs elements

// Before: Virtual DOM tree
<div>
  <h1>Title</h1>
  <ul>
    <li key="1">Item 1</li>
    <li key="2">Item 2</li>
  </ul>
</div>

// After: New Virtual DOM tree
<div>
  <h1>New Title</h1>  {/* Text content changed */}
  <ul>
    <li key="1">Item 1</li>      {/* Unchanged */}
    <li key="2">Item 2 Updated</li>  {/* Text changed */}
    <li key="3">Item 3</li>      {/* New item added */}
  </ul>
</div>

// React will:
// 1. Update the h1 text content
// 2. Keep the first li unchanged
// 3. Update the second li text
// 4. Add the third li element
// Result: Only 3 DOM operations instead of rebuilding everything`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Keys and Reconciliation</h2>
          <p className="text-muted-foreground mb-4">
            Keys help React identify which list items have changed, been added, or removed:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// Bad: Using array indices as keys
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo.text}</li>  {/* ❌ Don't use index */}
      ))}
    </ul>
  );
}

// Good: Using stable, unique keys
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>  {/* ✅ Use unique ID */}
      ))}
    </ul>
  );
}

// Why keys matter:
const initialList = [
  { id: 1, text: "Buy milk" },
  { id: 2, text: "Walk dog" },
  { id: 3, text: "Write code" }
];

// After removing first item:
const updatedList = [
  { id: 2, text: "Walk dog" },
  { id: 3, text: "Write code" }
];

// With proper keys: React knows items 2 and 3 stayed the same
// With index keys: React thinks all items changed`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">React Fiber</h2>
          <p className="text-muted-foreground mb-4">
            React Fiber is the reimplementation of React's reconciliation algorithm, introduced in React 16:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Key Features:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Incremental rendering</li>
                <li>Ability to pause and resume work</li>
                <li>Priority-based updates</li>
                <li>Better error handling</li>
                <li>Concurrent features</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Benefits:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Smoother user interactions</li>
                <li>Better performance for complex UIs</li>
                <li>Prevents UI blocking</li>
                <li>Enables concurrent rendering</li>
                <li>Improved user experience</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Performance Implications</h2>
          <p className="text-muted-foreground mb-4">
            Understanding Virtual DOM helps you write more performant React code:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// Performance tips for Virtual DOM

// 1. Minimize renders with React.memo
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Complex rendering logic */}</div>;
});

// 2. Use stable keys for lists
const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>  {/* Stable key */}
        {todo.text}
      </li>
    ))}
  </ul>
);

// 3. Avoid creating new objects in render
// Bad
function BadComponent({ items }) {
  return (
    <List 
      items={items}
      style={{ margin: 10 }}  {/* New object every render */}
      onClick={() => console.log('clicked')}  {/* New function every render */}
    />
  );
}

// Good
const listStyle = { margin: 10 };
function GoodComponent({ items }) {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <List 
      items={items}
      style={listStyle}
      onClick={handleClick}
    />
  );
}

// 4. Use React DevTools Profiler
// Enable profiling in development to identify performance bottlenecks`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Common Misconceptions</h2>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded">
              <h3 className="font-semibold text-foreground mb-2">❌ "Virtual DOM is always faster than direct DOM manipulation"</h3>
              <p className="text-muted-foreground">
                Virtual DOM adds overhead. For simple operations, direct DOM manipulation can be faster. 
                Virtual DOM's benefit is in complex UIs with many updates.
              </p>
            </div>
            <div className="bg-muted p-4 rounded">
              <h3 className="font-semibold text-foreground mb-2">❌ "Virtual DOM prevents all unnecessary re-renders"</h3>
              <p className="text-muted-foreground">
                Virtual DOM minimizes DOM updates, but React components can still re-render unnecessarily. 
                You need additional optimization techniques like memo, useMemo, and useCallback.
              </p>
            </div>
            <div className="bg-muted p-4 rounded">
              <h3 className="font-semibold text-foreground mb-2">❌ "Virtual DOM is unique to React"</h3>
              <p className="text-muted-foreground">
                Other frameworks like Vue.js also use Virtual DOM concepts. The implementation details 
                and optimization strategies may differ.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-border mt-8">
        <Link 
          href="/advanced/patterns"
          className="flex items-center text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Previous: Code Reuse Patterns
        </Link>
        
        <Link 
          href="/advanced/security"
          className="flex items-center text-primary hover:text-primary/80"
        >
          Next: Security & TypeChecking
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}