import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function UseEffectPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link 
          href="/hooks" 
          className="flex items-center text-blue-600 hover:text-blue-700 mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Hooks
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          useEffect Hook
        </h1>
        <p className="text-xl text-muted-foreground">
          Master the useEffect hook to handle side effects, data fetching, and component lifecycle in React.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is useEffect?</h2>
          <p className="text-muted-foreground mb-6">
            useEffect is a React Hook that lets you perform side effects in functional components. It serves 
            the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount combined in class components.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">What are Side Effects?</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Data fetching (API calls)</li>
              <li>Setting up subscriptions</li>
              <li>Manually changing the DOM</li>
              <li>Timers and intervals</li>
              <li>Cleanup operations</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Basic Usage</h2>
          <p className="text-muted-foreground mb-6">
            useEffect runs after every render by default:
          </p>
          
          <CodeExample
            title="Basic useEffect Examples"
            code={`import { useState, useEffect } from 'react';

function BasicExample() {
  const [count, setCount] = useState(0);

  // Runs after every render (no dependency array)
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

function MountOnlyExample() {
  const [data, setData] = useState(null);

  // Runs only once after initial render (empty dependency array)
  useEffect(() => {
    console.log('Component mounted');
    fetchData();
  }, []); // Empty dependency array

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

function ConditionalEffect() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // Runs only when count changes
  useEffect(() => {
    console.log(\`Count changed to: \${count}\`);
  }, [count]); // Only re-run when count changes

  // Runs only when name changes
  useEffect(() => {
    console.log(\`Name changed to: \${name}\`);
  }, [name]); // Only re-run when name changes

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
    </div>
  );
}`}
            explanation="The dependency array controls when useEffect runs: no array (every render), empty array (once), or with dependencies (when dependencies change)."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Cleanup Functions</h2>
          <p className="text-muted-foreground mb-6">
            Return a cleanup function from useEffect to clean up subscriptions, timers, or event listeners:
          </p>
          
          <CodeExample
            title="Effect Cleanup Examples"
            code={`import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]); // Re-run when isRunning changes

  return (
    <div>
      <p>Timer: {seconds} seconds</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}

function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup function - remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array - only run once

  return (
    <div>
      <p>Window size: {windowSize.width} x {windowSize.height}</p>
    </div>
  );
}

function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (!isTracking) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isTracking]);

  return (
    <div>
      <button onClick={() => setIsTracking(!isTracking)}>
        {isTracking ? 'Stop Tracking' : 'Start Tracking'}
      </button>
      {isTracking && (
        <p>Mouse position: {mousePosition.x}, {mousePosition.y}</p>
      )}
    </div>
  );
}

function WebSocketExample() {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      setConnectionStatus('Connected');
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    ws.onclose = () => {
      setConnectionStatus('Disconnected');
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setConnectionStatus('Error');
    };

    // Cleanup - close WebSocket connection
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <p>Status: {connectionStatus}</p>
      <div>
        <h3>Messages:</h3>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
    </div>
  );
}`}
            explanation="Always clean up subscriptions, timers, and event listeners to prevent memory leaks."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Data Fetching Patterns</h2>
          <p className="text-muted-foreground mb-6">
            Common patterns for fetching data with useEffect:
          </p>
          
          <CodeExample
            title="Data Fetching with useEffect"
            code={`import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state when userId changes
    setUser(null);
    setLoading(true);
    setError(null);

    // Create AbortController for cleanup
    const abortController = new AbortController();

    const fetchUser = async () => {
      try {
        const response = await fetch(\`/api/users/\${userId}\`, {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}\`);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        // Ignore abort errors
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    } else {
      setLoading(false);
    }

    // Cleanup function - abort fetch if component unmounts or userId changes
    return () => {
      abortController.abort();
    };
  }, [userId]); // Re-run when userId changes

  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

// Custom hook for data fetching
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}\`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, loading, error };
}

// Using the custom hook
function PostsList() {
  const { data: posts, loading, error } = useApi('/api/posts');

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Posts</h2>
      {posts?.map(post => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}

// Infinite scroll example
function InfiniteScrollPosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(\`/api/posts?page=\${page}&limit=10\`);
        const newPosts = await response.json();

        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setPosts(prev => [...prev, ...newPosts]);
        }
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        !== document.documentElement.offsetHeight ||
        loading ||
        !hasMore
      ) {
        return;
      }
      setPage(prev => prev + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
      {loading && <div>Loading more posts...</div>}
      {!hasMore && <div>No more posts to load</div>}
    </div>
  );
}`}
            explanation="Always handle loading states, errors, and cleanup when fetching data. Use AbortController to cancel requests."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Advanced Patterns</h2>
          <p className="text-muted-foreground mb-6">
            Advanced useEffect patterns for complex scenarios:
          </p>
          
          <CodeExample
            title="Advanced useEffect Patterns"
            code={`import { useState, useEffect, useRef, useCallback } from 'react';

// Debounced search
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Search failed:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {loading && <div>Searching...</div>}
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

// Previous value tracking
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

function CounterWithPrevious() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Intersection Observer for visibility tracking
function useIntersectionObserver(ref, options = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isVisible;
}

function LazyLoadedImage({ src, alt }) {
  const imgRef = useRef();
  const isVisible = useIntersectionObserver(imgRef, { threshold: 0.1 });
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      ref={imgRef}
      style={{
        height: '200px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {isVisible && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s'
          }}
        />
      )}
      {isVisible && !loaded && <div>Loading...</div>}
      {!isVisible && <div>Image placeholder</div>}
    </div>
  );
}

// Local storage sync
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  // Sync with other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(\`Error parsing localStorage key "\${key}":\`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

// Using the localStorage hook
function SettingsPanel() {
  const [settings, setSettings] = useLocalStorage('userSettings', {
    theme: 'light',
    language: 'en',
    notifications: true
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <h2>Settings (Synced with localStorage)</h2>
      
      <div>
        <label>
          Theme:
          <select
            value={settings.theme}
            onChange={(e) => updateSetting('theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => updateSetting('notifications', e.target.checked)}
          />
          Enable Notifications
        </label>
      </div>

      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </div>
  );
}`}
            explanation="These advanced patterns show how useEffect can be used for debouncing, intersection observing, localStorage syncing, and more complex scenarios."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">useEffect Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Always clean up side effects</li>
                <li>Include all dependencies in the dependency array</li>
                <li>Use AbortController for fetch requests</li>
                <li>Split unrelated effects into separate useEffect calls</li>
                <li>Use custom hooks for reusable effect logic</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don't</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Omit dependencies from the dependency array</li>
                <li>Use effects for synchronous operations</li>
                <li>Create infinite loops with missing dependencies</li>
                <li>Forget to handle component unmounting</li>
                <li>Use effects for computed values (use useMemo instead)</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/hooks/useState"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: useState Hook
          </Link>
          
          <Link 
            href="/hooks/useContext"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: useContext Hook
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}