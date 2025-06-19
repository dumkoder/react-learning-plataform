import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function CustomHooksPage() {
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
          Custom Hooks
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn how to create reusable stateful logic with custom hooks and build your own library of powerful React utilities.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What are Custom Hooks?</h2>
          <p className="text-muted-foreground mb-6">
            Custom hooks are JavaScript functions that start with &quot;use&quot; and can call other hooks. They allow you to 
            extract component logic into reusable functions, sharing stateful logic between multiple components.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Key Benefits</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Reuse stateful logic between components</li>
              <li>Keep components focused and clean</li>
              <li>Create testable and maintainable code</li>
              <li>Build your own library of utility hooks</li>
              <li>Share complex state management patterns</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Basic Custom Hook</h2>
          <p className="text-muted-foreground mb-6">
            Let&apos;s start with a simple custom hook for managing a counter:
          </p>
          
          <CodeExample
            title="Simple useCounter Hook"
            code={`import { useState, useCallback } from 'react';

// Custom hook for counter logic
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  const set = useCallback((value) => {
    setCount(value);
  }, []);

  return {
    count,
    increment,
    decrement,
    reset,
    set
  };
}

// Component using the custom hook
function CounterApp() {
  const counter1 = useCounter(0);
  const counter2 = useCounter(10);
  const counter3 = useCounter(-5);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Custom Hook Demo</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {/* Counter 1 */}
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '1rem', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <h3>Counter 1</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{counter1.count}</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button onClick={counter1.decrement}>-</button>
            <button onClick={counter1.increment}>+</button>
            <button onClick={counter1.reset}>Reset</button>
          </div>
        </div>

        {/* Counter 2 */}
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '1rem', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <h3>Counter 2 (starts at 10)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{counter2.count}</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button onClick={counter2.decrement}>-</button>
            <button onClick={counter2.increment}>+</button>
            <button onClick={counter2.reset}>Reset</button>
          </div>
          <div style={{ marginTop: '0.5rem' }}>
            <button onClick={() => counter2.set(100)}>Set to 100</button>
          </div>
        </div>

        {/* Counter 3 */}
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '1rem', 
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <h3>Counter 3 (starts at -5)</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{counter3.count}</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button onClick={counter3.decrement}>-</button>
            <button onClick={counter3.increment}>+</button>
            <button onClick={counter3.reset}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounterApp;`}
            explanation="A custom hook encapsulates state logic and provides a clean API that can be reused across multiple components."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Advanced Custom Hooks</h2>
          <p className="text-muted-foreground mb-6">
            Here are some practical custom hooks for common use cases:
          </p>
          
          <CodeExample
            title="Practical Custom Hooks"
            code={`import { useState, useEffect, useCallback, useRef } from 'react';

// 1. useLocalStorage - Persist state in localStorage
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

  const setStoredValue = useCallback((newValue) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":, error\`);
    }
  }, [key]);

  return [value, setStoredValue];
}

// 2. useFetch - Handle API calls with loading and error states
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}

// 3. useDebounce - Debounce a value
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 4. useToggle - Toggle boolean state
function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, { toggle, setTrue, setFalse }];
}

// 5. useArray - Array manipulation utilities
function useArray(defaultValue = []) {
  const [array, setArray] = useState(defaultValue);

  const push = useCallback((element) => {
    setArray(prev => [...prev, element]);
  }, []);

  const filter = useCallback((callback) => {
    setArray(prev => prev.filter(callback));
  }, []);

  const update = useCallback((index, newElement) => {
    setArray(prev => [
      ...prev.slice(0, index),
      newElement,
      ...prev.slice(index + 1)
    ]);
  }, []);

  const remove = useCallback((index) => {
    setArray(prev => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1)
    ]);
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  return {
    array,
    set: setArray,
    push,
    filter,
    update,
    remove,
    clear
  };
}

// 6. useInterval - Declarative interval
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// Demo component using all hooks
function AdvancedHooksDemo() {
  // useLocalStorage
  const [name, setName] = useLocalStorage('userName', '');
  
  // useToggle
  const [showDetails, toggleActions] = useToggle(false);
  
  // useArray
  const todoList = useArray(['Learn React', 'Build an app']);
  const [newTodo, setNewTodo] = useState('');
  
  // useInterval
  const [time, setTime] = useState(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 1000);
  
  // useDebounce
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // useFetch (using JSONPlaceholder for demo)
  const { data: posts, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=5');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      todoList.push(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Advanced Custom Hooks Demo</h1>
      
      {/* Current Time */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2>Current Time (useInterval)</h2>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          {time.toLocaleTimeString()}
        </p>
      </div>

      {/* Local Storage */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Persistent Name (useLocalStorage)</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{ padding: '0.5rem', marginRight: '1rem', width: '200px' }}
        />
        {name && <span>Hello, {name}!</span>}
      </div>

      {/* Toggle */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Show Details (useToggle)</h2>
        <button onClick={toggleActions.toggle}>
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
        <button onClick={toggleActions.setTrue} style={{ marginLeft: '0.5rem' }}>
          Force Show
        </button>
        <button onClick={toggleActions.setFalse} style={{ marginLeft: '0.5rem' }}>
          Force Hide
        </button>
        
        {showDetails && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem', 
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
          }}>
            <p>These are the details that can be toggled!</p>
            <p>This content is managed by the useToggle hook.</p>
          </div>
        )}
      </div>

      {/* Array Management */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Todo List (useArray)</h2>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new todo"
            style={{ padding: '0.5rem', marginRight: '0.5rem', width: '200px' }}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          />
          <button onClick={handleAddTodo}>Add</button>
          <button onClick={todoList.clear} style={{ marginLeft: '0.5rem' }}>
            Clear All
          </button>
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todoList.array.map((todo, index) => (
            <li key={index} style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem',
              margin: '0.25rem 0',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <span>{todo}</span>
              <div>
                <button 
                  onClick={() => todoList.update(index, \`\${todo} (updated)\`)}
                  style={{ marginRight: '0.5rem' }}
                >
                  Update
                </button>
                <button onClick={() => todoList.remove(index)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Debounced Search */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Debounced Search (useDebounce)</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search with debounce..."
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <p>Debounced value: <strong>{debouncedSearchTerm}</strong></p>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Notice how the debounced value only updates after you stop typing for 300ms
        </p>
      </div>

      {/* API Data */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>API Data (useFetch)</h2>
        <button onClick={refetch} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh Posts'}
        </button>
        
        {error && (
          <div style={{ color: 'red', marginTop: '1rem' }}>
            Error: {error}
          </div>
        )}
        
        {posts && (
          <div style={{ marginTop: '1rem' }}>
            <p>Loaded {posts.length} posts:</p>
            <ul>
              {posts.map(post => (
                <li key={post.id} style={{ marginBottom: '0.5rem' }}>
                  <strong>{post.title}</strong>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.9rem' }}>
                    {post.body.substring(0, 100)}...
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvancedHooksDemo;`}
            explanation="These custom hooks demonstrate common patterns: persistence, API calls, debouncing, state management, and timing utilities."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Form Management Custom Hook</h2>
          <p className="text-muted-foreground mb-6">
            A comprehensive custom hook for handling form state, validation, and submission:
          </p>
          
          <CodeExample
            title="useForm Hook"
            code={`import { useState, useCallback, useMemo } from 'react';

// Custom hook for form management
function useForm(initialValues = {}, validationRules = {}, options = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Validate a single field
  const validateField = useCallback((name, value) => {
    const rule = validationRules[name];
    if (!rule) return null;

    // Required validation
    if (rule.required && (!value || value.toString().trim() === '')) {
      return rule.requiredMessage || 'This field is required';
    }

    // Pattern validation
    if (value && rule.pattern && !rule.pattern.test(value)) {
      return rule.patternMessage || 'Invalid format';
    }

    // Min length validation
    if (value && rule.minLength && value.length < rule.minLength) {
      return rule.minLengthMessage || \`Minimum \${rule.minLength} characters required\`;
    }

    // Max length validation
    if (value && rule.maxLength && value.length > rule.maxLength) {
      return rule.maxLengthMessage || \`Maximum \${rule.maxLength} characters allowed\`;
    }

    // Custom validation function
    if (rule.validate && typeof rule.validate === 'function') {
      return rule.validate(value, values);
    }

    return null;
  }, [validationRules, values]);

  // Validate all fields
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
    return isValid;
  }, [validationRules, values, validateField]);

  // Handle input change
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));

    // Validate on change if field has been touched or form has been submitted
    if (touched[name] || submitCount > 0) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, submitCount, validateField]);

  // Handle input blur
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [values, validateField]);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit) => {
    setSubmitCount(prev => prev + 1);
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate all fields
    if (!validateAll()) {
      return false;
    }

    if (onSubmit && typeof onSubmit === 'function') {
      try {
        setIsSubmitting(true);
        await onSubmit(values);
        
        // Reset form if specified
        if (options.resetOnSubmit) {
          reset();
        }
        
        return true;
      } catch (error) {
        console.error('Form submission error:', error);
        return false;
      } finally {
        setIsSubmitting(false);
      }
    }

    return false;
  }, [validationRules, validateAll, values, options.resetOnSubmit]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitCount(0);
  }, [initialValues]);

  // Set field value
  const setValue = useCallback((name, value) => {
    handleChange(name, value);
  }, [handleChange]);

  // Set field error
  const setError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  // Form state
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0 && 
           Object.values(errors).every(error => !error);
  }, [errors]);

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  const hasErrors = useMemo(() => {
    return Object.values(errors).some(error => error);
  }, [errors]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    hasErrors,
    submitCount,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setError,
    reset,
    validateField,
    validateAll
  };
}

// Demo component using the form hook
function FormDemo() {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    terms: false
  };

  const validationRules = {
    firstName: {
      required: true,
      minLength: 2,
      requiredMessage: 'First name is required',
      minLengthMessage: 'First name must be at least 2 characters'
    },
    lastName: {
      required: true,
      minLength: 2,
      requiredMessage: 'Last name is required',
      minLengthMessage: 'Last name must be at least 2 characters'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      requiredMessage: 'Email is required',
      patternMessage: 'Please enter a valid email address'
    },
    password: {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      requiredMessage: 'Password is required',
      minLengthMessage: 'Password must be at least 8 characters',
      patternMessage: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    },
    confirmPassword: {
      required: true,
      validate: (value, allValues) => {
        if (value !== allValues.password) {
          return 'Passwords do not match';
        }
        return null;
      }
    },
    age: {
      required: true,
      validate: (value) => {
        const age = parseInt(value);
        if (isNaN(age) || age < 18 || age > 100) {
          return 'Age must be between 18 and 100';
        }
        return null;
      }
    },
    terms: {
      validate: (value) => {
        if (!value) {
          return 'You must accept the terms and conditions';
        }
        return null;
      }
    }
  };

  const form = useForm(initialValues, validationRules, { resetOnSubmit: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const success = await form.handleSubmit(async (values) => {
      // Simulate API call
      console.log('Submitting form:', values);
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted successfully!');
    });

    if (success) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Advanced Form with Custom Hook</h1>
      
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>
            First Name *
          </label>
          <input
            type="text"
            value={form.values.firstName}
            onChange={(e) => form.handleChange('firstName', e.target.value)}
            onBlur={() => form.handleBlur('firstName')}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: form.errors.firstName ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          {form.errors.firstName && (
            <small style={{ color: '#dc3545' }}>{form.errors.firstName}</small>
          )}
        </div>

        {/* Last Name */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>
            Last Name *
          </label>
          <input
            type="text"
            value={form.values.lastName}
            onChange={(e) => form.handleChange('lastName', e.target.value)}
            onBlur={() => form.handleBlur('lastName')}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: form.errors.lastName ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          {form.errors.lastName && (
            <small style={{ color: '#dc3545' }}>{form.errors.lastName}</small>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>
            Email *
          </label>
          <input
            type="email"
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

        {/* Password */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>
            Password *
          </label>
          <input
            type="password"
            value={form.values.password}
            onChange={(e) => form.handleChange('password', e.target.value)}
            onBlur={() => form.handleBlur('password')}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: form.errors.password ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          {form.errors.password && (
            <small style={{ color: '#dc3545' }}>{form.errors.password}</small>
          )}
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>
            Confirm Password *
          </label>
          <input
            type="password"
            value={form.values.confirmPassword}
            onChange={(e) => form.handleChange('confirmPassword', e.target.value)}
            onBlur={() => form.handleBlur('confirmPassword')}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: form.errors.confirmPassword ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          {form.errors.confirmPassword && (
            <small style={{ color: '#dc3545' }}>{form.errors.confirmPassword}</small>
          )}
        </div>

        {/* Age */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>
            Age *
          </label>
          <input
            type="number"
            value={form.values.age}
            onChange={(e) => form.handleChange('age', e.target.value)}
            onBlur={() => form.handleBlur('age')}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: form.errors.age ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          {form.errors.age && (
            <small style={{ color: '#dc3545' }}>{form.errors.age}</small>
          )}
        </div>

        {/* Terms */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={form.values.terms}
              onChange={(e) => form.handleChange('terms', e.target.checked)}
              onBlur={() => form.handleBlur('terms')}
              style={{ marginRight: '0.5rem' }}
            />
            I accept the terms and conditions *
          </label>
          {form.errors.terms && (
            <small style={{ color: '#dc3545' }}>{form.errors.terms}</small>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={form.isSubmitting}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: form.isSubmitting ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: form.isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '1rem'
          }}
        >
          {form.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={form.reset}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '0.5rem'
          }}
        >
          Reset Form
        </button>
      </form>

      {/* Form State Debug */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        fontSize: '0.9rem'
      }}>
        <h3>Form State</h3>
        <p>Valid: {form.isValid ? '✅' : '❌'}</p>
        <p>Dirty: {form.isDirty ? '✅' : '❌'}</p>
        <p>Has Errors: {form.hasErrors ? '❌' : '✅'}</p>
        <p>Submit Count: {form.submitCount}</p>
      </div>
    </div>
  );
}

export default FormDemo;`}
            explanation="This comprehensive form hook handles validation, submission, state management, and provides a clean API for complex forms."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Data Fetching Custom Hook</h2>
          <p className="text-muted-foreground mb-6">
            A powerful custom hook for handling API calls with caching, retry, and pagination:
          </p>
          
          <CodeExample
            title="useApiData Hook"
            code={`import { useState, useEffect, useCallback, useRef } from 'react';

// Custom hook for advanced API data fetching
function useApiData(url, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body = null,
    dependencies = [],
    enabled = true,
    retry = 3,
    retryDelay = 1000,
    cache = true,
    refetchOnWindowFocus = false,
    refetchInterval = null
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  
  const retryCount = useRef(0);
  const cacheRef = useRef(new Map());
  const intervalRef = useRef(null);

  // Generate cache key
  const cacheKey = JSON.stringify({ url, method, headers, body });

  // Fetch function with retry logic
  const fetchData = useCallback(async (isRetry = false) => {
    if (!enabled) return;

    // Check cache first
    if (cache && cacheRef.current.has(cacheKey) && !isRetry) {
      const cachedData = cacheRef.current.get(cacheKey);
      setData(cachedData);
      setLastFetched(Date.now());
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      };

      if (body && method !== 'GET') {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      const result = await response.json();
      
      setData(result);
      setLastFetched(Date.now());
      retryCount.current = 0;

      // Cache the result
      if (cache) {
        cacheRef.current.set(cacheKey, result);
      }

    } catch (err) {
      console.error('Fetch error:', err);
      
      if (retryCount.current < retry) {
        retryCount.current++;
        setTimeout(() => {
          fetchData(true);
        }, retryDelay * retryCount.current);
      } else {
        setError(err.message);
        retryCount.current = 0;
      }
    } finally {
      setLoading(false);
    }
  }, [url, method, headers, body, enabled, retry, retryDelay, cache, cacheKey]);

  // Manual refetch
  const refetch = useCallback(() => {
    retryCount.current = 0;
    fetchData(true);
  }, [fetchData]);

  // Clear cache
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  // Initial fetch and dependency-based refetch
  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      if (document.visibilityState === 'visible') {
        refetch();
      }
    };

    document.addEventListener('visibilitychange', handleFocus);
    return () => document.removeEventListener('visibilitychange', handleFocus);
  }, [refetchOnWindowFocus, refetch]);

  // Interval refetch
  useEffect(() => {
    if (!refetchInterval) return;

    intervalRef.current = setInterval(() => {
      refetch();
    }, refetchInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refetchInterval, refetch]);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache,
    lastFetched: lastFetched ? new Date(lastFetched) : null
  };
}

// Custom hook for paginated data
function usePaginatedData(baseUrl, options = {}) {
  const {
    pageSize = 10,
    initialPage = 1,
    ...otherOptions
  } = options;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [allData, setAllData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const url = \`\${baseUrl}?_page=\${currentPage}&_limit=\${pageSize}\`;
  
  const { data, loading, error, refetch } = useApiData(url, {
    dependencies: [currentPage],
    ...otherOptions
  });

  useEffect(() => {
    if (data) {
      setAllData(prev => {
        if (currentPage === 1) {
          return data;
        }
        return [...prev, ...data];
      });
      
      // These would typically come from response headers
      // For demo purposes, we'll simulate them
      setTotalItems(100); // Simulated total
      setTotalPages(Math.ceil(100 / pageSize));
    }
  }, [data, currentPage, pageSize]);

  const loadMore = useCallback(() => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages, loading]);

  const reset = useCallback(() => {
    setCurrentPage(1);
    setAllData([]);
  }, []);

  return {
    data: allData,
    loading,
    error,
    currentPage,
    totalPages,
    totalItems,
    hasMore: currentPage < totalPages,
    loadMore,
    reset,
    refetch
  };
}

// Demo component
function ApiDataDemo() {
  const [userId, setUserId] = useState(1);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Basic API call
  const { 
    data: user, 
    loading: userLoading, 
    error: userError, 
    refetch: refetchUser,
    lastFetched
  } = useApiData(\`https://jsonplaceholder.typicode.com/users/\${userId}\`, {
    dependencies: [userId],
    retry: 2,
    cache: true,
    refetchInterval: autoRefresh ? 5000 : null
  });

  // Paginated data
  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    hasMore,
    loadMore,
    reset: resetPosts,
    totalItems,
    currentPage
  } = usePaginatedData('https://jsonplaceholder.typicode.com/posts', {
    pageSize: 5
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Advanced API Data Fetching</h1>

      {/* User Data Section */}
      <div style={{ marginBottom: '3rem' }}>
        <h2>User Data (with caching & retry)</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <label>
            User ID: 
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(parseInt(e.target.value) || 1)}
              min="1"
              max="10"
              style={{ marginLeft: '0.5rem', padding: '0.25rem', width: '60px' }}
            />
          </label>
          
          <button onClick={refetchUser} style={{ marginLeft: '1rem' }}>
            Refresh User
          </button>
          
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            Auto-refresh (5s)
          </label>
        </div>

        {lastFetched && (
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Last fetched: {lastFetched.toLocaleTimeString()}
          </p>
        )}

        {userLoading && <p>Loading user...</p>}
        {userError && <p style={{ color: 'red' }}>Error: {userError}</p>}
        
        {user && (
          <div style={{ 
            padding: '1rem', 
            border: '1px solid #ccc', 
            borderRadius: '4px',
            backgroundColor: '#f8f9fa'
          }}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Website: {user.website}</p>
            <p>Company: {user.company?.name}</p>
          </div>
        )}
      </div>

      {/* Paginated Posts Section */}
      <div>
        <h2>Paginated Posts</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <p>
            Showing {posts.length} of {totalItems} posts (Page {currentPage})
          </p>
          <button onClick={resetPosts} style={{ marginRight: '0.5rem' }}>
            Reset
          </button>
          <button 
            onClick={loadMore} 
            disabled={!hasMore || postsLoading}
          >
            {postsLoading ? 'Loading...' : hasMore ? 'Load More' : 'No More Posts'}
          </button>
        </div>

        {postsError && <p style={{ color: 'red' }}>Error: {postsError}</p>}
        
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {posts.map(post => (
            <div 
              key={post.id} 
              style={{ 
                padding: '1rem', 
                margin: '0.5rem 0',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <h4>{post.title}</h4>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                {post.body}
              </p>
            </div>
          ))}
        </div>

        {postsLoading && (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            Loading more posts...
          </div>
        )}
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#fff3cd',
        borderRadius: '4px'
      }}>
        <h3>Features Demonstrated</h3>
        <ul style={{ fontSize: '0.9rem', paddingLeft: '1.5rem' }}>
          <li>Automatic retry on failure</li>
          <li>Response caching</li>
          <li>Dependency-based refetching</li>
          <li>Auto-refresh intervals</li>
          <li>Pagination with load more</li>
          <li>Error handling and loading states</li>
        </ul>
      </div>
    </div>
  );
}

export default ApiDataDemo;`}
            explanation="This advanced data fetching hook provides caching, retry logic, pagination, and automatic refresh capabilities."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Custom Hooks Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Start function names with &quot;use&quot;</li>
                <li>Use useCallback for returned functions</li>
                <li>Provide clear and consistent APIs</li>
                <li>Include proper error handling</li>
                <li>Document your hooks with TypeScript or JSDoc</li>
                <li>Test your custom hooks thoroughly</li>
                <li>Keep hooks focused on single responsibilities</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don&apos;t</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Call hooks conditionally or in loops</li>
                <li>Create overly complex hooks</li>
                <li>Ignore dependency arrays in useEffect/useCallback</li>
                <li>Return mutable objects without memoization</li>
                <li>Create hooks that break React&apos;s rules</li>
                <li>Mix too many concerns in one hook</li>
                <li>Forget to handle cleanup in useEffect</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/hooks/useCallback"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: useCallback Hook
          </Link>
          
          <Link 
            href="/hooks"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Back to Hooks Overview
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}