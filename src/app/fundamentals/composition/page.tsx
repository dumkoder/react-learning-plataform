import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function CompositionPage() {
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
          Component Composition
        </h1>
        <p className="text-xl text-muted-foreground">
          Master the art of combining components to build complex UIs using composition patterns and best practices.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is Component Composition?</h2>
          <p className="text-muted-foreground mb-6">
            Component composition is the practice of combining simple components to build more complex ones. 
            Instead of inheritance, React uses composition to share code between components. This approach makes 
            components more flexible and reusable.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Key Benefits</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Promotes code reusability and modularity</li>
              <li>Makes components easier to test and maintain</li>
              <li>Enables flexible UI layouts and structures</li>
              <li>Follows the principle of &quot;composition over inheritance&quot;</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Using Children Prop</h2>
          <p className="text-muted-foreground mb-6">
            The children prop is the most basic form of composition, allowing components to wrap other components:
          </p>
          
          <CodeExample
            title="Children Prop Pattern"
            code={`// Container component that uses children
function Card({ children, title, className = '' }) {
  return (
    <div className={\`card \${className}\`}>
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage examples
function App() {
  return (
    <div>
      <Card title="User Profile">
        <img src="/avatar.jpg" alt="User" />
        <h3>John Doe</h3>
        <p>Software Developer</p>
        <button>Contact</button>
      </Card>

      <Card title="Statistics" className="stats-card">
        <div className="stat">
          <span className="label">Views:</span>
          <span className="value">1,234</span>
        </div>
        <div className="stat">
          <span className="label">Likes:</span>
          <span className="value">56</span>
        </div>
      </Card>

      <Card>
        <p>This card has no title, just content.</p>
      </Card>
    </div>
  );
}`}
            explanation="The children prop allows any JSX to be passed between component tags, making components highly reusable."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Render Props Pattern</h2>
          <p className="text-muted-foreground mb-6">
            Render props is a technique for sharing code between components using a prop whose value is a function:
          </p>
          
          <CodeExample
            title="Render Props Pattern"
            code={`// Component that provides data through render prop
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return render({ data, loading, error });
}

// Usage with different render functions
function App() {
  return (
    <div>
      <DataFetcher
        url="/api/users"
        render={({ data, loading, error }) => {
          if (loading) return <div>Loading users...</div>;
          if (error) return <div>Error: {error}</div>;
          return (
            <ul>
              {data?.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          );
        }}
      />

      <DataFetcher
        url="/api/posts"
        render={({ data, loading, error }) => {
          if (loading) return <div className="spinner">Loading posts...</div>;
          if (error) return <div className="error">Failed to load posts</div>;
          return (
            <div className="posts">
              {data?.map(post => (
                <article key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </article>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}

// Alternative: using children as a function
function DataProvider({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ... fetch logic
  }, [url]);

  return children({ data, loading });
}

// Usage with children function
function UserList() {
  return (
    <DataProvider url="/api/users">
      {({ data, loading }) => (
        loading ? <div>Loading...</div> : (
          <ul>
            {data?.map(user => <li key={user.id}>{user.name}</li>)}
          </ul>
        )
      )}
    </DataProvider>
  );
}`}
            explanation="Render props enable sharing stateful logic while giving full control over what to render."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Higher-Order Components (HOCs)</h2>
          <p className="text-muted-foreground mb-6">
            HOCs are functions that take a component and return a new component with additional functionality:
          </p>
          
          <CodeExample
            title="Higher-Order Component Pattern"
            code={`// HOC that adds loading functionality
function withLoading(WrappedComponent) {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = useState(false);

    const withLoadingProps = {
      ...props,
      setLoading,
      loading
    };

    return (
      <div>
        {loading && <div className="loading-overlay">Loading...</div>}
        <WrappedComponent {...withLoadingProps} />
      </div>
    );
  };
}

// HOC that adds authentication check
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      // Check authentication status
      const checkAuth = async () => {
        try {
          const response = await fetch('/api/auth/me');
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
        } finally {
          setChecking(false);
        }
      };

      checkAuth();
    }, []);

    if (checking) {
      return <div>Checking authentication...</div>;
    }

    if (!user) {
      return <div>Please log in to access this content.</div>;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

// Original components
function UserProfile({ user, loading, setLoading }) {
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await fetch('/api/profile', { method: 'PUT', body: JSON.stringify(user) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
}

function Dashboard({ user }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, {user.name}!</p>
    </div>
  );
}

// Enhanced components using HOCs
const EnhancedUserProfile = withAuth(withLoading(UserProfile));
const EnhancedDashboard = withAuth(Dashboard);

// Usage
function App() {
  return (
    <div>
      <EnhancedUserProfile />
      <EnhancedDashboard />
    </div>
  );
}`}
            explanation="HOCs allow you to share common functionality across multiple components by wrapping them."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Compound Components</h2>
          <p className="text-muted-foreground mb-6">
            Compound components work together to form a complete UI, similar to HTML elements like select and option:
          </p>
          
          <CodeExample
            title="Compound Component Pattern"
            code={`import { createContext, useContext, useState } from 'react';

// Context for sharing state between compound components
const TabsContext = createContext();

// Main Tabs component
function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

// Tab List component
function TabList({ children }) {
  return (
    <div className="tab-list" role="tablist">
      {children}
    </div>
  );
}

// Individual Tab component
function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === index;

  return (
    <button
      className={\`tab \${isActive ? 'active' : ''}\`}
      onClick={() => setActiveTab(index)}
      role="tab"
      aria-selected={isActive}
    >
      {children}
    </button>
  );
}

// Tab Panels container
function TabPanels({ children }) {
  return (
    <div className="tab-panels">
      {children}
    </div>
  );
}

// Individual Tab Panel
function TabPanel({ children, index }) {
  const { activeTab } = useContext(TabsContext);
  const isActive = activeTab === index;

  if (!isActive) return null;

  return (
    <div className="tab-panel" role="tabpanel">
      {children}
    </div>
  );
}

// Attach sub-components to main component
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage
function App() {
  return (
    <Tabs defaultTab={0}>
      <Tabs.List>
        <Tabs.Tab index={0}>Home</Tabs.Tab>
        <Tabs.Tab index={1}>About</Tabs.Tab>
        <Tabs.Tab index={2}>Contact</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panels>
        <Tabs.Panel index={0}>
          <h2>Home Content</h2>
          <p>Welcome to our website!</p>
        </Tabs.Panel>
        <Tabs.Panel index={1}>
          <h2>About Us</h2>
          <p>We are a company that does things.</p>
        </Tabs.Panel>
        <Tabs.Panel index={2}>
          <h2>Contact Information</h2>
          <p>Email: contact@example.com</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}

export default Tabs;`}
            explanation="Compound components provide a flexible API where related components work together seamlessly."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Composition Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Use composition over inheritance</li>
                <li>Keep components small and focused</li>
                <li>Make components configurable through props</li>
                <li>Use TypeScript for better prop validation</li>
                <li>Consider performance implications</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don&apos;t</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Create overly complex component hierarchies</li>
                <li>Pass too many props through multiple levels</li>
                <li>Use composition when simple props suffice</li>
                <li>Forget to handle edge cases</li>
                <li>Sacrifice readability for flexibility</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Complete Example</h2>
          <p className="text-muted-foreground mb-6">
            A complete example showing a flexible Modal component using multiple composition patterns:
          </p>
          
          <CodeExample
            title="Flexible Modal Component"
            code={`import { createContext, useContext, useState, useEffect } from 'react';

// Modal Context
const ModalContext = createContext();

// Main Modal component
function Modal({ children, isOpen, onClose, size = 'medium' }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ onClose, size }}>
      <div className="modal-overlay" onClick={onClose}>
        <div 
          className={\`modal-content modal-\${size}\`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

// Modal Header
function ModalHeader({ children, showCloseButton = true }) {
  const { onClose } = useContext(ModalContext);

  return (
    <div className="modal-header">
      <div className="modal-title">
        {children}
      </div>
      {showCloseButton && (
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
}

// Modal Body
function ModalBody({ children }) {
  return (
    <div className="modal-body">
      {children}
    </div>
  );
}

// Modal Footer
function ModalFooter({ children }) {
  return (
    <div className="modal-footer">
      {children}
    </div>
  );
}

// Attach sub-components
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

// HOC for modal state management
function withModal(WrappedComponent) {
  return function WithModalComponent(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
      <WrappedComponent
        {...props}
        isModalOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
    );
  };
}

// Usage Example
function UserProfilePage({ isModalOpen, openModal, closeModal }) {
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });

  const handleSave = () => {
    console.log('Saving user:', user);
    closeModal();
  };

  return (
    <div>
      <h1>User Profile</h1>
      <button onClick={openModal}>Edit Profile</button>

      <Modal isOpen={isModalOpen} onClose={closeModal} size="large">
        <Modal.Header>
          Edit Profile
        </Modal.Header>
        
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
            </div>
          </form>
        </Modal.Body>
        
        <Modal.Footer>
          <button onClick={closeModal}>Cancel</button>
          <button onClick={handleSave} className="primary">
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// Enhanced component with modal functionality
const EnhancedUserProfilePage = withModal(UserProfilePage);

export default EnhancedUserProfilePage;`}
            explanation="This example combines compound components, context, HOCs, and proper event handling for a flexible modal system."
          />
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/fundamentals/lifecycle"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: Component Lifecycle
          </Link>
          
          <Link 
            href="/fundamentals/react-dom"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: React DOM
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}