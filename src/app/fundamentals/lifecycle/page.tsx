import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function LifecyclePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link 
          href="/fundamentals" 
          className="flex items-center text-blue-600 hover:text-blue-700 mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Fundamentals
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Component Lifecycle
        </h1>
        <p className="text-xl text-muted-foreground">
          Understand React component lifecycle and how to use useEffect hook to manage side effects and lifecycle events.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Component Lifecycle Overview</h2>
          <p className="text-muted-foreground mb-6">
            React components go through different phases during their existence: mounting, updating, and unmounting. 
            In function components, we use the useEffect hook to handle lifecycle events and side effects.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Lifecycle Phases</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li><strong>Mounting:</strong> Component is being created and inserted into the DOM</li>
              <li><strong>Updating:</strong> Component is being re-rendered due to props or state changes</li>
              <li><strong>Unmounting:</strong> Component is being removed from the DOM</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">The useEffect Hook</h2>
          <p className="text-muted-foreground mb-6">
            useEffect is the primary way to handle side effects and lifecycle events in function components:
          </p>
          
          <CodeExample
            title="Basic useEffect Usage"
            code={`import { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  // Runs after every render (mounting and updating)
  useEffect(() => {
    console.log('Component rendered');
  });

  // Runs only once after initial render (mounting)
  useEffect(() => {
    console.log('Component mounted');
  }, []); // Empty dependency array

  // Runs when count changes
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]); // count in dependency array

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
            explanation="useEffect accepts a function and an optional dependency array to control when the effect runs."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Effect Cleanup</h2>
          <p className="text-muted-foreground mb-6">
            Sometimes effects need cleanup to prevent memory leaks or cancel ongoing operations:
          </p>
          
          <CodeExample
            title="Effect Cleanup"
            code={`import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Set up the timer
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Cleanup function - runs when component unmounts
    // or before the effect runs again
    return () => {
      clearInterval(interval);
      console.log('Timer cleaned up');
    };
  }, []); // Empty dependency array - runs once

  return <div>Timer: {seconds} seconds</div>;
}

function EventListener() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div>Window width: {windowWidth}px</div>;
}`}
            explanation="Return a cleanup function from useEffect to clean up subscriptions, timers, or event listeners."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Dependency Arrays</h2>
          <p className="text-muted-foreground mb-6">
            The dependency array controls when your effect runs:
          </p>
          
          <CodeExample
            title="Dependency Array Patterns"
            code={`import { useState, useEffect } from 'react';

function DependencyExamples({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);

  // No dependency array - runs after every render
  useEffect(() => {
    console.log('Runs after every render');
  });

  // Empty dependency array - runs only once (on mount)
  useEffect(() => {
    console.log('Runs only once on mount');
  }, []);

  // Dependency on userId - runs when userId changes
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    }

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  // Multiple dependencies
  useEffect(() => {
    if (user && count > 0) {
      console.log(\`User \${user.name} clicked \${count} times\`);
    }
  }, [user, count]);

  // Effect with cleanup that depends on userId
  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        const response = await fetch(\`/api/users/\${userId}/posts\`, {
          signal: controller.signal
        });
        const postsData = await response.json();
        setPosts(postsData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch posts:', error);
        }
      }
    }

    if (userId) {
      fetchPosts();
    }

    return () => {
      controller.abort(); // Cancel request if component unmounts or userId changes
    };
  }, [userId]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
      {user && <p>Hello, {user.name}!</p>}
      <p>Posts: {posts.length}</p>
    </div>
  );
}`}
            explanation="Be careful with dependency arrays - include all values from component scope that are used inside the effect."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Common Lifecycle Patterns</h2>
          <p className="text-muted-foreground mb-6">
            Here are some common patterns for handling different lifecycle scenarios:
          </p>
          
          <CodeExample
            title="Common Lifecycle Patterns"
            code={`import { useState, useEffect, useRef } from 'react';

function LifecyclePatterns() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  // Pattern 1: Data fetching on mount
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch('/api/data');
        const result = await response.json();
        
        // Only update state if component is still mounted
        if (mountedRef.current) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(err.message);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup: mark component as unmounted
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Pattern 2: Subscription management
  useEffect(() => {
    const subscription = someExternalAPI.subscribe(data => {
      console.log('Received data:', data);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Pattern 3: Conditional effects
  useEffect(() => {
    if (!data) return; // Exit early if no data

    const processData = () => {
      console.log('Processing data:', data);
    };

    processData();
  }, [data]);

  // Pattern 4: Debounced effects
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Debounced operation');
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [data]); // This will debounce when data changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Data loaded successfully!</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}`}
            explanation="These patterns handle common scenarios like data fetching, subscriptions, and preventing memory leaks."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Lifecycle Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Always clean up subscriptions and timers</li>
                <li>Include all dependencies in the dependency array</li>
                <li>Use AbortController for cancelling fetch requests</li>
                <li>Check if component is mounted before setting state</li>
                <li>Use separate effects for unrelated logic</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don&apos;t</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Forget to clean up effects</li>
                <li>Omit dependencies from the dependency array</li>
                <li>Use effects for synchronous operations</li>
                <li>Create infinite loops with missing dependencies</li>
                <li>Perform expensive operations in every render</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Complete Example</h2>
          <p className="text-muted-foreground mb-6">
            A complete example showing a user profile component with proper lifecycle management:
          </p>
          
          <CodeExample
            title="User Profile with Lifecycle"
            code={`import { useState, useEffect, useRef } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const mountedRef = useRef(true);
  const retryTimeoutRef = useRef(null);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch user data when userId changes
  useEffect(() => {
    mountedRef.current = true;

    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(\`/api/users/\${userId}\`, {
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}\`);
        }

        const userData = await response.json();

        if (mountedRef.current) {
          setUser(userData);
          setLoading(false);
        }
      } catch (err) {
        if (mountedRef.current) {
          setError(err.message);
          setLoading(false);

          // Retry after 5 seconds if network error
          if (err.name === 'TypeError') {
            retryTimeoutRef.current = setTimeout(() => {
              if (mountedRef.current) {
                fetchUser();
              }
            }, 5000);
          }
        }
      }
    }

    if (userId && isOnline) {
      fetchUser();
    }

    return () => {
      mountedRef.current = false;
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [userId, isOnline]);

  // Update document title
  useEffect(() => {
    if (user) {
      document.title = \`Profile: \${user.name}\`;
    }

    return () => {
      document.title = 'React App';
    };
  }, [user]);

  if (!isOnline) {
    return <div className="error">You are offline. Please check your connection.</div>;
  }

  if (loading) {
    return <div className="loading">Loading user profile...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>Failed to load user profile: {error}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (!user) {
    return <div>No user found.</div>;
  }

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
      <div className="status">
        Status: {isOnline ? '🟢 Online' : '🔴 Offline'}
      </div>
    </div>
  );
}

export default UserProfile;`}
            explanation="This example demonstrates proper cleanup, error handling, network status monitoring, and preventing memory leaks."
          />
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/fundamentals/state"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: Component State
          </Link>
          
          <Link 
            href="/fundamentals/composition"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: Component Composition
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}