import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PerformancePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Performance Optimization
        </h1>
        <p className="text-xl text-muted-foreground">
          Optimize React apps with memoization, code splitting, and performance best practices.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-3">Why Performance Matters</h2>
        <p className="text-muted-foreground mb-4">
          Performance optimization in React is crucial for creating smooth, responsive user experiences. 
          Poor performance can lead to slow interactions, high bounce rates, and frustrated users.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">Faster Loading:</strong>
            <p className="text-muted-foreground">Reduced initial bundle size</p>
          </div>
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">Smooth Interactions:</strong>
            <p className="text-muted-foreground">Fewer unnecessary re-renders</p>
          </div>
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">Better UX:</strong>
            <p className="text-muted-foreground">Responsive interface</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">React.memo</h2>
          <p className="text-muted-foreground mb-4">
            Prevent unnecessary re-renders by memoizing components:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`import React, { memo } from 'react';

// Without memo - re-renders on every parent update
function ExpensiveComponent({ data, onUpdate }) {
  console.log('ExpensiveComponent rendered');
  return (
    <div>
      <h3>{data.title}</h3>
      <button onClick={onUpdate}>Update</button>
    </div>
  );
}

// With memo - only re-renders when props change
const MemoizedComponent = memo(ExpensiveComponent);

// Custom comparison function
const MemoizedWithCustom = memo(ExpensiveComponent, (prevProps, nextProps) => {
  return prevProps.data.id === nextProps.data.id;
});`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">useMemo Hook</h2>
          <p className="text-muted-foreground mb-4">
            Memoize expensive calculations to avoid recalculating on every render:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`import { useMemo } from 'react';

function DataProcessor({ items, filter }) {
  // Expensive calculation memoized
  const processedItems = useMemo(() => {
    console.log('Processing items...');
    return items
      .filter(item => item.category === filter)
      .map(item => ({
        ...item,
        processed: true,
        score: calculateComplexScore(item)
      }));
  }, [items, filter]); // Only recalculate when items or filter change

  return (
    <ul>
      {processedItems.map(item => (
        <li key={item.id}>{item.name} - Score: {item.score}</li>
      ))}
    </ul>
  );
}

function calculateComplexScore(item) {
  // Expensive calculation
  let score = 0;
  for (let i = 0; i < 1000000; i++) {
    score += item.value * Math.random();
  }
  return score;
}`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">useCallback Hook</h2>
          <p className="text-muted-foreground mb-4">
            Memoize functions to prevent unnecessary re-renders of child components:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`import { useCallback, useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // Without useCallback - new function on every render
  const handleBadClick = (id) => {
    console.log('Clicked:', id);
  };

  // With useCallback - stable function reference
  const handleGoodClick = useCallback((id) => {
    console.log('Clicked:', id);
    // Function is stable unless dependencies change
  }, []); // Empty deps = function never changes

  const handleAddItem = useCallback((newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  }, []); // Stable function using functional update

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ChildComponent 
        onItemClick={handleGoodClick} 
        onAddItem={handleAddItem}
      />
    </div>
  );
}`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Code Splitting</h2>
          <p className="text-muted-foreground mb-4">
            Reduce initial bundle size by splitting code and loading components on demand:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`import { lazy, Suspense } from 'react';

// Lazy load components
const LazyComponent = lazy(() => import('./LazyComponent'));
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
      
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <Dashboard />
      </Suspense>
    </div>
  );
}

// Route-based code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
}`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Virtualization</h2>
          <p className="text-muted-foreground mb-4">
            Handle large lists efficiently by only rendering visible items:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// Using react-window for virtualization
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <div className="item">
        {items[index].name}
      </div>
    </div>
  );

  return (
    <List
      height={400}        // Container height
      itemCount={items.length}
      itemSize={50}       // Height of each item
      width="100%"
    >
      {Row}
    </List>
  );
}

// For variable heights, use VariableSizeList
import { VariableSizeList } from 'react-window';

function VariableList({ items }) {
  const getItemSize = (index) => {
    // Return height based on content
    return items[index].content.length > 100 ? 120 : 60;
  };

  return (
    <VariableSizeList
      height={400}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </VariableSizeList>
  );
}`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Performance Monitoring</h2>
          <p className="text-muted-foreground mb-4">
            Use React DevTools and browser tools to identify performance bottlenecks:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">React DevTools Profiler:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Identify slow components</li>
                <li>Track render times</li>
                <li>Find unnecessary re-renders</li>
                <li>Analyze component interactions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Browser Performance:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Chrome DevTools Performance tab</li>
                <li>Lighthouse performance audits</li>
                <li>Core Web Vitals monitoring</li>
                <li>Bundle analysis tools</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-border mt-8">
        <Link 
          href="/advanced/context"
          className="flex items-center text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Previous: Context API
        </Link>
        
        <Link 
          href="/advanced/patterns"
          className="flex items-center text-primary hover:text-primary/80"
        >
          Next: Code Reuse Patterns
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}