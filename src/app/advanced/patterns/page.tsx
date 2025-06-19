import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PatternsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Code Reuse Patterns
        </h1>
        <p className="text-xl text-muted-foreground">
          Master advanced React patterns: Higher-Order Components, Render Props, and Compound Components.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-3">Pattern Overview</h2>
        <p className="text-muted-foreground mb-4">
          React patterns help you create reusable, maintainable code by abstracting common functionality. 
          Each pattern solves different problems and has its own use cases.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">Higher-Order Components:</strong>
            <p className="text-muted-foreground">Enhance components with additional functionality</p>
          </div>
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">Render Props:</strong>
            <p className="text-muted-foreground">Share code between components using props</p>
          </div>
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">Compound Components:</strong>
            <p className="text-muted-foreground">Create flexible, composable APIs</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Higher-Order Components (HOCs)</h2>
          <p className="text-muted-foreground mb-4">
            A higher-order component is a function that takes a component and returns a new component with enhanced functionality:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// Basic HOC example
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    if (props.isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

// Usage
const UserList = ({ users }) => (
  <ul>
    {users.map(user => <li key={user.id}>{user.name}</li>)}
  </ul>
);

const UserListWithLoading = withLoading(UserList);

// In parent component
<UserListWithLoading users={users} isLoading={loading} />

// More advanced HOC with authentication
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const { user } = useAuth();
    
    if (!user) {
      return <LoginForm />;
    }
    
    return <WrappedComponent {...props} user={user} />;
  };
}

// Multiple HOCs
const EnhancedComponent = withAuth(withLoading(UserProfile));`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Render Props Pattern</h2>
          <p className="text-muted-foreground mb-4">
            Share code between components by using a prop whose value is a function:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// Mouse tracker with render props
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return render(position);
}

// Usage with render prop
<MouseTracker
  render={({ x, y }) => (
    <div>
      <h2>Mouse position:</h2>
      <p>X: {x}, Y: {y}</p>
    </div>
  )}
/>

// Or using children as a function
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // ... mouse tracking logic
  return children(position);
}

<MouseTracker>
  {({ x, y }) => (
    <div>Mouse is at ({x}, {y})</div>
  )}
</MouseTracker>

// Data fetcher with render props
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return render({ data, loading, error });
}`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Compound Components</h2>
          <p className="text-muted-foreground mb-4">
            Create flexible component APIs that work together as a system:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// Toggle compound component
const ToggleContext = createContext();

function Toggle({ children }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
}

function ToggleButton({ children }) {
  const { on, toggle } = useContext(ToggleContext);
  return (
    <button onClick={toggle}>
      {children}
    </button>
  );
}

function ToggleDisplay({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
}

// Attach sub-components
Toggle.Button = ToggleButton;
Toggle.Display = ToggleDisplay;

// Usage - very flexible API
<Toggle>
  <Toggle.Button>Show/Hide</Toggle.Button>
  <Toggle.Display>
    <div>This content is toggleable!</div>
  </Toggle.Display>
</Toggle>

// Modal compound component
function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalTrigger({ children }) {
  const { setIsOpen } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => setIsOpen(true)
  });
}

function ModalContent({ children }) {
  const { isOpen, setIsOpen } = useContext(ModalContext);
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;

// Usage
<Modal>
  <Modal.Trigger>
    <button>Open Modal</button>
  </Modal.Trigger>
  <Modal.Content>
    <h2>Modal Title</h2>
    <p>Modal content here...</p>
  </Modal.Content>
</Modal>`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Custom Hooks Pattern</h2>
          <p className="text-muted-foreground mb-4">
            Extract component logic into reusable custom hooks:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// Custom hook for API calls
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// Usage in components
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(\`/api/users/\${userId}\`);
  const [preferences, setPreferences] = useLocalStorage('userPrefs', {});

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <UserSettings 
        preferences={preferences} 
        onUpdate={setPreferences} 
      />
    </div>
  );
}`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">When to Use Each Pattern</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Choose HOCs when:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>You need cross-cutting concerns (auth, logging)</li>
                <li>Enhancing existing components</li>
                <li>Working with class components</li>
                <li>Props manipulation is needed</li>
              </ul>
              
              <h3 className="font-semibold text-foreground mb-3 mt-4">Choose Render Props when:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>You need flexible rendering logic</li>
                <li>Sharing stateful logic</li>
                <li>Dynamic component composition</li>
                <li>Multiple render scenarios</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Choose Compound Components when:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Building flexible, composable APIs</li>
                <li>Components work together as a system</li>
                <li>Need implicit state sharing</li>
                <li>Complex component relationships</li>
              </ul>
              
              <h3 className="font-semibold text-foreground mb-3 mt-4">Choose Custom Hooks when:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Extracting stateful logic</li>
                <li>Reusing logic across components</li>
                <li>Simplifying component code</li>
                <li>Modern functional approach preferred</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-border mt-8">
        <Link 
          href="/advanced/performance"
          className="flex items-center text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Previous: Performance Optimization
        </Link>
        
        <Link 
          href="/advanced/virtual-dom"
          className="flex items-center text-primary hover:text-primary/80"
        >
          Next: Virtual DOM
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}