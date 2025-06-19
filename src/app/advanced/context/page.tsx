import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ContextPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Context API
        </h1>
        <p className="text-xl text-muted-foreground">
          Share data across components without prop drilling using React&apos;s Context API.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-3">What is Context API?</h2>
        <p className="text-muted-foreground mb-4">
          The Context API is a React feature that allows you to share state between components without 
          having to pass props down through every level of the component tree. It&apos;s designed to share 
          data that can be considered &quot;global&quot; for a tree of React components.
        </p>
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">When to use Context:</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Theme data (light/dark mode)</li>
            <li>Current authenticated user</li>
            <li>Language/locale settings</li>
            <li>Preferred settings</li>
          </ul>
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Creating a Context</h2>
          <p className="text-muted-foreground mb-4">
            First, create a context using React.createContext():
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`import React, { createContext, useContext, useState } from 'react';

// Create the context
const ThemeContext = createContext();

// Create a provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Using the Context</h2>
          <p className="text-muted-foreground mb-4">
            Wrap your app with the provider and consume the context in components:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// App.js
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
    </ThemeProvider>
  );
}

// Any component that needs theme
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={\`header \${theme}\`}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">✅ Do:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Create custom hooks for context consumption</li>
                <li>Add error boundaries for context providers</li>
                <li>Split contexts by concern</li>
                <li>Use multiple contexts for different data types</li>
                <li>Memoize context values to prevent unnecessary renders</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">❌ Don&apos;t:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Use context for frequently changing data</li>
                <li>Put everything in a single context</li>
                <li>Use context for local component state</li>
                <li>Forget to provide default values</li>
                <li>Nest too many context providers</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Performance Optimization</h2>
          <p className="text-muted-foreground mb-4">
            Optimize context performance by memoizing the value:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`import { useMemo } from 'react';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme]);

  // Memoize the context value
  const value = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}`}
            </code>
          </pre>
        </section>
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
          href="/advanced/performance"
          className="flex items-center text-primary hover:text-primary/80"
        >
          Next: Performance Optimization
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}