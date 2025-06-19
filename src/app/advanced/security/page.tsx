import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Security & TypeChecking
        </h1>
        <p className="text-xl text-muted-foreground">
          Secure React applications and implement proper type checking with TypeScript and PropTypes.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-card-foreground mb-3">Security in React</h2>
        <p className="text-muted-foreground mb-4">
          React applications face various security challenges. Understanding common vulnerabilities 
          and implementing proper security measures is crucial for protecting users and data.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">XSS Prevention:</strong>
            <p className="text-muted-foreground">Escape user input and sanitize HTML</p>
          </div>
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">Authentication:</strong>
            <p className="text-muted-foreground">Secure user authentication flows</p>
          </div>
          <div className="bg-muted p-3 rounded">
            <strong className="text-foreground">Type Safety:</strong>
            <p className="text-muted-foreground">Prevent runtime errors with typing</p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Cross-Site Scripting (XSS) Prevention</h2>
          <p className="text-muted-foreground mb-4">
            React has built-in XSS protection, but you need to be careful with certain patterns:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// ✅ Safe: React automatically escapes content
function SafeComponent({ userInput }) {
  return <div>{userInput}</div>; // React escapes this
}

// ❌ Dangerous: dangerouslySetInnerHTML bypasses escaping
function DangerousComponent({ htmlContent }) {
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  ); // Can execute malicious scripts!
}

// ✅ Safe: Sanitize HTML before using dangerouslySetInnerHTML
import DOMPurify from 'dompurify';

function SafeHTMLComponent({ htmlContent }) {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent);
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }} 
    />
  );
}

// ❌ Dangerous: URL injection
function DangerousLink({ userURL }) {
  return <a href={userURL}>Click here</a>; // Can be javascript:alert('xss')
}

// ✅ Safe: Validate URLs
function SafeLink({ userURL }) {
  const isValidURL = (url) => {
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:', 'mailto:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  };

  if (!isValidURL(userURL)) {
    return <span>Invalid link</span>;
  }

  return <a href={userURL}>Click here</a>;
}`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Authentication & Authorization</h2>
          <p className="text-muted-foreground mb-4">
            Implement secure authentication patterns in React applications:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// Secure authentication context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Validate token with server
        const response = await fetch('/api/auth/validate', {
          headers: { Authorization: \`Bearer \${token}\` }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Invalid token, remove it
          localStorage.removeItem('authToken');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const { user, token } = await response.json();
        localStorage.setItem('authToken', token);
        setUser(user);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Protected route component
function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <div>Access denied</div>;
  }

  return children;
}`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">TypeScript Integration</h2>
          <p className="text-muted-foreground mb-4">
            TypeScript provides compile-time type checking to prevent runtime errors:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// Define interfaces for your data
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
  loading?: boolean;
}

// Type-safe React component
const UserList: React.FC<UserListProps> = ({ 
  users, 
  onUserSelect, 
  loading = false 
}) => {
  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <button onClick={() => onUserSelect(user)}>
            {user.name} ({user.role})
          </button>
        </li>
      ))}
    </ul>
  );
};

// Generic API hook with TypeScript
function useApi<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage with type safety
function UserProfile({ userId }: { userId: number }) {
  const { data: user, loading, error } = useApi<User>(\`/api/users/\${userId}\`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <span>Role: {user.role}</span>
    </div>
  );
}`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">PropTypes for JavaScript</h2>
          <p className="text-muted-foreground mb-4">
            If you&apos;re not using TypeScript, PropTypes provide runtime type checking:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`import PropTypes from 'prop-types';

function UserCard({ user, onEdit, showActions }) {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {showActions && (
        <button onClick={() => onEdit(user.id)}>
          Edit User
        </button>
      )}
    </div>
  );
}

// PropTypes validation
UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['admin', 'user']).isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

// Default props
UserCard.defaultProps = {
  showActions: true
};

// Custom validator
function customEmailValidator(props, propName, componentName) {
  const email = props[propName];
  if (email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return new Error(
      \`Invalid prop \`\${propName}\` passed to \`\${componentName}\`. Expected a valid email.\`
    );
  }
}

// Using custom validator
UserCard.propTypes = {
  // ... other props
  email: customEmailValidator
};`}
            </code>
          </pre>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Security Best Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Input Validation:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Validate all user inputs</li>
                <li>Sanitize HTML content</li>
                <li>Use allowlists for URLs</li>
                <li>Implement rate limiting</li>
                <li>Validate file uploads</li>
              </ul>

              <h3 className="font-semibold text-foreground mb-3 mt-4">Data Protection:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Encrypt sensitive data</li>
                <li>Use HTTPS everywhere</li>
                <li>Implement proper CORS</li>
                <li>Secure API endpoints</li>
                <li>Avoid logging sensitive data</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Authentication Security:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Use secure session management</li>
                <li>Implement JWT properly</li>
                <li>Add multi-factor authentication</li>
                <li>Use secure password policies</li>
                <li>Implement session timeouts</li>
              </ul>

              <h3 className="font-semibold text-foreground mb-3 mt-4">Dependency Security:</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Regular security audits (npm audit)</li>
                <li>Keep dependencies updated</li>
                <li>Use tools like Snyk</li>
                <li>Review third-party packages</li>
                <li>Minimize dependency surface</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Security Tools & Linting</h2>
          <p className="text-muted-foreground mb-4">
            Use automated tools to catch security issues early:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm text-foreground">
{`// ESLint security rules
// .eslintrc.js
module.exports = {
  extends: [
    'plugin:security/recommended'
  ],
  plugins: ['security'],
  rules: {
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'error',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-non-literal-require': 'error',
    'security/detect-possible-timing-attacks': 'error',
    'security/detect-pseudoRandomBytes': 'error'
  }
};

// Package.json security scripts
{
  "scripts": {
    "security:audit": "npm audit",
    "security:fix": "npm audit fix",
    "security:check": "npm audit --audit-level high",
    "lint:security": "eslint . --ext .js,.jsx,.ts,.tsx"
  }
}

// Content Security Policy (CSP) for Next.js
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: \`
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      connect-src 'self' https://api.example.com;
    \`.replace(/\\s+/g, ' ').trim()
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};`}
            </code>
          </pre>
        </section>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-border mt-8">
        <Link 
          href="/advanced/virtual-dom"
          className="flex items-center text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Previous: Virtual DOM
        </Link>
        
        <Link 
          href="/advanced"
          className="flex items-center text-primary hover:text-primary/80"
        >
          Back to Advanced Topics
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}