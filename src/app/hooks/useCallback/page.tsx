import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function UseCallbackPage() {
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
          useCallback Hook
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn how to optimize performance with useCallback by memoizing function definitions and preventing unnecessary re-renders.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is useCallback?</h2>
          <p className="text-muted-foreground mb-6">
            useCallback is a React Hook that lets you cache a function definition between re-renders. 
            It returns a memoized version of the callback that only changes if one of its dependencies changes.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Key Benefits</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Prevents unnecessary re-renders of child components</li>
              <li>Maintains referential equality of functions</li>
              <li>Optimizes performance in React.memo components</li>
              <li>Reduces memory allocation for function objects</li>
              <li>Essential for stable dependencies in other hooks</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Basic useCallback Usage</h2>
          <p className="text-muted-foreground mb-6">
            Here's a simple example showing how useCallback prevents unnecessary re-renders:
          </p>
          
          <CodeExample
            title="Basic useCallback Example"
            code={`import { useState, useCallback, memo } from 'react';

// Memoized child component
const Button = memo(({ onClick, children }) => {
  console.log(\`Button "\${children}" rendered\`);
  
  return (
    <button 
      onClick={onClick}
      style={{
        padding: '0.5rem 1rem',
        margin: '0.25rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ Without useCallback - creates new function on every render
  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  // ✅ With useCallback - same function reference if dependencies don't change
  const handleDecrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []); // Empty dependency array - function never changes

  // ✅ With useCallback and dependencies
  const handleReset = useCallback(() => {
    setCount(0);
    console.log(\`Reset triggered by \${name || 'anonymous'}\`);
  }, [name]); // Only recreates when 'name' changes

  return (
    <div style={{ padding: '2rem' }}>
      <h1>useCallback Demo</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Count: {count}</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <Button onClick={handleIncrement}>
            Increment (no useCallback)
          </Button>
          
          <Button onClick={handleDecrement}>
            Decrement (useCallback)
          </Button>
          
          <Button onClick={handleReset}>
            Reset (useCallback with deps)
          </Button>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label>
          Your name: 
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
          />
        </label>
      </div>
      
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px',
        fontSize: '0.9rem'
      }}>
        <p><strong>Check the console:</strong></p>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
          <li>The "Increment" button re-renders every time you type in the input</li>
          <li>The "Decrement" button only renders once (no dependencies)</li>
          <li>The "Reset" button only re-renders when the name changes</li>
        </ul>
      </div>
    </div>
  );
}

export default App;`}
            explanation="useCallback prevents the Button components from re-rendering unnecessarily by maintaining stable function references."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Preventing Child Re-renders</h2>
          <p className="text-muted-foreground mb-6">
            useCallback is particularly useful for preventing expensive child components from re-rendering:
          </p>
          
          <CodeExample
            title="Preventing Child Re-renders"
            code={`import { useState, useCallback, memo } from 'react';

// Expensive child component that processes data
const DataProcessor = memo(({ data, onProcess, onFilter, onSort }) => {
  console.log('DataProcessor rendered');
  
  const processedData = data.map(item => ({
    ...item,
    processed: true,
    timestamp: Date.now()
  }));

  return (
    <div style={{ 
      border: '2px solid #28a745', 
      padding: '1rem', 
      margin: '1rem 0',
      borderRadius: '4px'
    }}>
      <h3>Data Processor Component</h3>
      <p>Processing {data.length} items...</p>
      
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => onProcess(processedData)}>
          Process Data
        </button>
        <button onClick={() => onFilter('active')} style={{ marginLeft: '0.5rem' }}>
          Filter Active
        </button>
        <button onClick={() => onSort('name')} style={{ marginLeft: '0.5rem' }}>
          Sort by Name
        </button>
      </div>
      
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {processedData.map(item => (
          <div key={item.id} style={{ 
            padding: '0.5rem', 
            margin: '0.25rem 0',
            backgroundColor: '#f8f9fa',
            borderRadius: '2px'
          }}>
            <strong>{item.name}</strong> - {item.status}
          </div>
        ))}
      </div>
    </div>
  );
});

// Another child component
const Counter = memo(({ count, onIncrement, onDecrement }) => {
  console.log('Counter rendered');
  
  return (
    <div style={{ 
      border: '2px solid #dc3545', 
      padding: '1rem', 
      margin: '1rem 0',
      borderRadius: '4px'
    }}>
      <h3>Counter Component</h3>
      <p>Current count: {count}</p>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement} style={{ marginLeft: '0.5rem' }}>-</button>
    </div>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([
    { id: 1, name: 'Task A', status: 'active' },
    { id: 2, name: 'Task B', status: 'inactive' },
    { id: 3, name: 'Task C', status: 'active' }
  ]);
  const [filter, setFilter] = useState('all');
  const [triggerRender, setTriggerRender] = useState(0);

  // ❌ Without useCallback - these functions recreate on every render
  const handleProcessWithoutCallback = (processedData) => {
    console.log('Processing data without callback:', processedData.length);
  };

  // ✅ With useCallback - stable function references
  const handleProcess = useCallback((processedData) => {
    console.log('Processing data:', processedData.length);
    // Simulate API call or expensive operation
    setTimeout(() => {
      console.log('Data processed successfully');
    }, 1000);
  }, []); // No dependencies - function never changes

  const handleFilter = useCallback((filterType) => {
    console.log(\`Filtering by: \${filterType}\`);
    setFilter(filterType);
    // Filter data based on type
    if (filterType === 'active') {
      setData(prev => prev.filter(item => item.status === 'active'));
    } else if (filterType === 'inactive') {
      setData(prev => prev.filter(item => item.status === 'inactive'));
    }
  }, []); // No dependencies needed for this implementation

  const handleSort = useCallback((sortBy) => {
    console.log(\`Sorting by: \${sortBy}\`);
    setData(prev => [...prev].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.id - b.id;
    }));
  }, []); // No dependencies needed

  // Counter callbacks
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []); // No dependencies

  const handleDecrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []); // No dependencies

  // Callback with dependencies
  const handleReset = useCallback(() => {
    setCount(0);
    setData([
      { id: 1, name: 'Task A', status: 'active' },
      { id: 2, name: 'Task B', status: 'inactive' },
      { id: 3, name: 'Task C', status: 'active' }
    ]);
    console.log(\`Reset with filter: \${filter}\`);
  }, [filter]); // Depends on filter

  return (
    <div style={{ padding: '2rem' }}>
      <h1>useCallback with Child Components</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Parent Controls</h2>
        <button onClick={() => setTriggerRender(prev => prev + 1)}>
          Force Parent Re-render ({triggerRender})
        </button>
        <button onClick={handleReset} style={{ marginLeft: '0.5rem' }}>
          Reset Everything
        </button>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          Current filter: {filter}
        </p>
      </div>

      {/* These components will re-render unnecessarily without useCallback */}
      <Counter 
        count={count}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />

      <DataProcessor 
        data={data}
        onProcess={handleProcess}
        onFilter={handleFilter}
        onSort={handleSort}
      />
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#fff3cd', 
        borderRadius: '4px' 
      }}>
        <h3>Performance Comparison</h3>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          Check the console to see when components re-render. With useCallback, 
          child components only re-render when their props actually change, 
          not when the parent re-renders for unrelated reasons.
        </p>
      </div>
    </div>
  );
}

export default App;`}
            explanation="useCallback prevents expensive child components from re-rendering when parent state changes don't affect their props."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">useCallback with Custom Hooks</h2>
          <p className="text-muted-foreground mb-6">
            useCallback is essential when creating custom hooks that return functions:
          </p>
          
          <CodeExample
            title="useCallback in Custom Hooks"
            code={`import { useState, useCallback, useEffect } from 'react';

// Custom hook for API calls
function useApi(baseUrl) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ useCallback ensures stable function references
  const get = useCallback(async (endpoint) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`\${baseUrl}\${endpoint}\`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]); // Recreate only when baseUrl changes

  const post = useCallback(async (endpoint, data) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(\`\${baseUrl}\${endpoint}\`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]); // Recreate only when baseUrl changes

  return { get, post, loading, error };
}

// Custom hook for debounced search
function useDebounce(callback, delay) {
  const [debounceTimer, setDebounceTimer] = useState(null);

  const debouncedCallback = useCallback((...args) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    const newTimer = setTimeout(() => {
      callback(...args);
    }, delay);
    
    setDebounceTimer(newTimer);
  }, [callback, delay, debounceTimer]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return debouncedCallback;
}

// Custom hook for local storage
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":, error\`);
      return defaultValue;
    }
  });

  // ✅ useCallback ensures stable function reference
  const setStoredValue = useCallback((newValue) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":, error\`);
    }
  }, [key]);

  const removeValue = useCallback(() => {
    try {
      setValue(defaultValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(\`Error removing localStorage key "\${key}":, error\`);
    }
  }, [key, defaultValue]);

  return [value, setStoredValue, removeValue];
}

// Custom hook for form validation
function useFormValidation(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = useCallback((name, value) => {
    const rule = validationRules[name];
    if (!rule) return null;
    
    if (typeof rule === 'function') {
      return rule(value);
    }
    
    if (rule.required && (!value || value.toString().trim() === '')) {
      return rule.message || 'This field is required';
    }
    
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message || 'Invalid format';
    }
    
    return null;
  }, [validationRules]);

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField]);

  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}));
    
    return isValid;
  }, [values, validationRules, validateField]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset
  };
}

// Component using the custom hooks
function UserForm() {
  const { get, post, loading, error } = useApi('https://jsonplaceholder.typicode.com');
  const [users, setUsers] = useLocalStorage('users', []);
  
  const validationRules = {
    name: {
      required: true,
      message: 'Name is required'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email'
    }
  };

  const form = useFormValidation(
    { name: '', email: '' },
    validationRules
  );

  const handleSearch = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) return;
    
    try {
      console.log(\`Searching for: \${searchTerm}\`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Search completed');
    } catch (err) {
      console.error('Search failed:', err);
    }
  }, []);

  const debouncedSearch = useDebounce(handleSearch, 300);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!form.validateAll()) {
      return;
    }

    try {
      const newUser = await post('/users', form.values);
      setUsers(prev => [...prev, newUser]);
      form.reset();
      console.log('User created:', newUser);
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  }, [form, post, setUsers]);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Custom Hooks with useCallback</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Search Users</h3>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => debouncedSearch(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '0.5rem', 
            marginBottom: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h3>Add New User</h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Name"
            value={form.values.name}
            onChange={(e) => form.handleChange('name', e.target.value)}
            onBlur={() => form.handleBlur('name')}
            style={{ 
              width: '100%', 
              padding: '0.5rem',
              border: form.errors.name ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          {form.errors.name && (
            <small style={{ color: '#dc3545' }}>{form.errors.name}</small>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={form.values.email}
            onChange={(e) => form.handleChange('email', e.target.value)}
            onBlur={() => form.handleBlur('email')}
            style={{ 
              width: '100%', 
              padding: '0.5rem',
              border: form.errors.email ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          {form.errors.email && (
            <small style={{ color: '#dc3545' }}>{form.errors.email}</small>
          )}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>

      {error && (
        <div style={{ color: '#dc3545', marginBottom: '1rem' }}>
          Error: {error}
        </div>
      )}

      <div>
        <h3>Stored Users ({users.length})</h3>
        {users.map((user, index) => (
          <div key={index} style={{ 
            padding: '0.5rem', 
            margin: '0.25rem 0',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
          }}>
            <strong>{user.name}</strong> - {user.email}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserForm;`}
            explanation="Custom hooks use useCallback to provide stable function references, preventing unnecessary re-renders and infinite loops."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">useCallback vs useMemo</h2>
          <p className="text-muted-foreground mb-6">
            Understanding when to use useCallback vs useMemo:
          </p>
          
          <CodeExample
            title="useCallback vs useMemo Comparison"
            code={`import { useState, useCallback, useMemo, memo } from 'react';

// Child component that displays results
const ResultDisplay = memo(({ data, onUpdate, onDelete }) => {
  console.log('ResultDisplay rendered');
  
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '1rem', 
      margin: '1rem 0',
      borderRadius: '4px'
    }}>
      <h3>Results ({data.length} items)</h3>
      {data.map(item => (
        <div key={item.id} style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0',
          borderBottom: '1px solid #eee'
        }}>
          <span>{item.name} - {item.value}</span>
          <div>
            <button onClick={() => onUpdate(item.id)} style={{ marginRight: '0.5rem' }}>
              Update
            </button>
            <button onClick={() => onDelete(item.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
});

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item A', value: 10, category: 'tools' },
    { id: 2, name: 'Item B', value: 25, category: 'books' },
    { id: 3, name: 'Item C', value: 15, category: 'tools' },
    { id: 4, name: 'Item D', value: 30, category: 'books' }
  ]);
  const [filter, setFilter] = useState('all');
  const [multiplier, setMultiplier] = useState(1);

  // ✅ useMemo - for caching computed values
  const filteredItems = useMemo(() => {
    console.log('Computing filtered items...');
    return filter === 'all' 
      ? items 
      : items.filter(item => item.category === filter);
  }, [items, filter]);

  // ✅ useMemo - for expensive calculations
  const statistics = useMemo(() => {
    console.log('Computing statistics...');
    const total = filteredItems.reduce((sum, item) => sum + item.value, 0);
    const average = filteredItems.length > 0 ? total / filteredItems.length : 0;
    const maxValue = filteredItems.length > 0 ? Math.max(...filteredItems.map(item => item.value)) : 0;
    
    return {
      total: total * multiplier,
      average: average * multiplier,
      maxValue: maxValue * multiplier,
      count: filteredItems.length
    };
  }, [filteredItems, multiplier]);

  // ✅ useMemo - for creating objects that would cause re-renders
  const chartData = useMemo(() => {
    console.log('Computing chart data...');
    return filteredItems.map(item => ({
      x: item.name,
      y: item.value * multiplier,
      category: item.category
    }));
  }, [filteredItems, multiplier]);

  // ✅ useCallback - for memoizing functions passed to child components
  const handleUpdate = useCallback((id) => {
    console.log(\`Updating item \${id}\`);
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, value: item.value + 1 }
        : item
    ));
  }, []); // No dependencies needed for this implementation

  const handleDelete = useCallback((id) => {
    console.log(\`Deleting item \${id}\`);
    setItems(prev => prev.filter(item => item.id !== id));
  }, []); // No dependencies needed

  // ✅ useCallback - for functions that depend on state
  const handleAddItem = useCallback(() => {
    const newId = Math.max(...items.map(i => i.id)) + 1;
    const newItem = {
      id: newId,
      name: \`Item \${String.fromCharCode(65 + newId - 1)}\`,
      value: Math.floor(Math.random() * 50) + 1,
      category: Math.random() > 0.5 ? 'tools' : 'books'
    };
    setItems(prev => [...prev, newItem]);
  }, [items]); // Depends on items array

  // ✅ useCallback - for event handlers
  const handleFilterChange = useCallback((newFilter) => {
    console.log(\`Changing filter to: \${newFilter}\`);
    setFilter(newFilter);
  }, []); // No dependencies needed

  // ❌ Wrong usage examples (for demonstration)
  
  // Don't use useMemo for simple calculations
  const simpleCalculation = useMemo(() => {
    return multiplier * 2; // Too simple, just use: multiplier * 2
  }, [multiplier]);

  // Don't use useCallback for functions that don't get passed as props
  const localFunction = useCallback(() => {
    console.log('This function is only used locally');
  }, []); // Unnecessary - just define it normally

  return (
    <div style={{ padding: '2rem' }}>
      <h1>useCallback vs useMemo</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Controls</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Filter: 
            <select 
              value={filter} 
              onChange={(e) => handleFilterChange(e.target.value)}
              style={{ marginLeft: '0.5rem' }}
            >
              <option value="all">All</option>
              <option value="tools">Tools</option>
              <option value="books">Books</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Multiplier: 
            <input
              type="number"
              value={multiplier}
              onChange={(e) => setMultiplier(Number(e.target.value) || 1)}
              style={{ marginLeft: '0.5rem', width: '60px' }}
            />
          </label>
        </div>

        <button onClick={handleAddItem}>Add Random Item</button>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Statistics (useMemo)</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          <div>Total: {statistics.total}</div>
          <div>Average: {statistics.average.toFixed(2)}</div>
          <div>Max: {statistics.maxValue}</div>
          <div>Count: {statistics.count}</div>
        </div>
      </div>

      <ResultDisplay 
        data={filteredItems}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#e8f4f8', 
        borderRadius: '4px' 
      }}>
        <h3>Key Differences</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4>useMemo</h4>
            <ul style={{ fontSize: '0.9rem', paddingLeft: '1.5rem' }}>
              <li>Caches computed <strong>values</strong></li>
              <li>Returns the cached result</li>
              <li>Use for expensive calculations</li>
              <li>Use for objects/arrays that cause re-renders</li>
            </ul>
          </div>
          <div>
            <h4>useCallback</h4>
            <ul style={{ fontSize: '0.9rem', paddingLeft: '1.5rem' }}>
              <li>Caches <strong>functions</strong></li>
              <li>Returns the cached function</li>
              <li>Use for functions passed as props</li>
              <li>Use for stable dependencies in other hooks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;`}
            explanation="useMemo caches computed values while useCallback caches functions. Use them appropriately based on what you need to optimize."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">useCallback Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Use for functions passed to child components</li>
                <li>Use for functions in dependency arrays</li>
                <li>Include all dependencies in the dependency array</li>
                <li>Combine with React.memo for optimal performance</li>
                <li>Use in custom hooks that return functions</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don't</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Overuse it for functions that don't need optimization</li>
                <li>Use for functions that are only called locally</li>
                <li>Forget dependencies in the dependency array</li>
                <li>Use as a replacement for proper component design</li>
                <li>Assume it always improves performance</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/hooks/useMemo"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: useMemo Hook
          </Link>
          
          <Link 
            href="/hooks/custom-hooks"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: Custom Hooks
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}