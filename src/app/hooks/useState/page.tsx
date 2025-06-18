import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function UseStatePage() {
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
          useState Hook
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn how to manage component state using React's useState hook for reactive user interfaces.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is useState?</h2>
          <p className="text-muted-foreground mb-6">
            useState is a React Hook that allows you to add state variables to functional components. 
            It returns an array with two elements: the current state value and a function to update it.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Adds state to functional components</li>
              <li>Returns current state and setter function</li>
              <li>Triggers re-render when state changes</li>
              <li>Preserves state between re-renders</li>
              <li>Can hold any type of value</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Basic Usage</h2>
          <p className="text-muted-foreground mb-6">
            Here's how to use useState in its simplest form:
          </p>
          
          <CodeExample
            title="Basic useState Example"
            code={`import { useState } from 'react';

function Counter() {
  // Declare a state variable called 'count' with initial value 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// Multiple state variables
function UserProfile() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        placeholder="Age"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
    </form>
  );
}

export default Counter;`}
            explanation="useState takes an initial value and returns an array with the current state and a setter function."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">State with Objects and Arrays</h2>
          <p className="text-muted-foreground mb-6">
            When working with objects and arrays, you need to create new instances to trigger re-renders:
          </p>
          
          <CodeExample
            title="Objects and Arrays in State"
            code={`import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      // Create new array with spread operator
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Object state example
function UserSettings() {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'en',
    fontSize: 16
  });

  const updateSetting = (key, value) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [key]: value
    }));
  };

  return (
    <div>
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

      <div>
        <label>
          Font Size:
          <input
            type="range"
            min="12"
            max="24"
            value={settings.fontSize}
            onChange={(e) => updateSetting('fontSize', parseInt(e.target.value))}
          />
          {settings.fontSize}px
        </label>
      </div>

      <div>
        <h3>Current Settings:</h3>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
      </div>
    </div>
  );
}`}
            explanation="Always create new objects/arrays when updating state to ensure React detects the change."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Functional Updates</h2>
          <p className="text-muted-foreground mb-6">
            When the new state depends on the previous state, use functional updates to avoid stale closures:
          </p>
          
          <CodeExample
            title="Functional State Updates"
            code={`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // ❌ Problematic - may use stale state
  const incrementTwiceBad = () => {
    setCount(count + 1);
    setCount(count + 1); // This might not work as expected
  };

  // ✅ Correct - uses functional update
  const incrementTwice = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  // ✅ Also works for async operations
  const incrementAsync = () => {
    setTimeout(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={incrementTwice}>+2 (Functional)</button>
      <button onClick={incrementTwiceBad}>+2 (Bad)</button>
      <button onClick={incrementAsync}>+1 (Async)</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Complex state with functional updates
function ShoppingCart() {
  const [cart, setCart] = useState([]);

  const addItem = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div>
      <div>
        <button onClick={() => addItem({ id: 1, name: 'Apple', price: 1.50 })}>
          Add Apple ($1.50)
        </button>
        <button onClick={() => addItem({ id: 2, name: 'Banana', price: 0.75 })}>
          Add Banana ($0.75)
        </button>
        <button onClick={() => addItem({ id: 3, name: 'Orange', price: 2.00 })}>
          Add Orange ($2.00)
        </button>
      </div>

      <div>
        <h3>Shopping Cart ({cart.length} items)</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
                <span>{item.name} - \${item.price.toFixed(2)}</span>
                <div>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span style={{ margin: '0 10px' }}>Qty: {item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => removeItem(item.id)} style={{ marginLeft: '10px' }}>
                    Remove
                  </button>
                </div>
                <div>Subtotal: \${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
            <div>
              <strong>Total: \${getTotalPrice().toFixed(2)}</strong>
            </div>
            <button onClick={clearCart}>Clear Cart</button>
          </>
        )}
      </div>
    </div>
  );
}`}
            explanation="Functional updates ensure you always work with the most current state value, especially important in async scenarios."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Lazy Initial State</h2>
          <p className="text-muted-foreground mb-6">
            For expensive initial state calculations, you can pass a function to useState:
          </p>
          
          <CodeExample
            title="Lazy Initial State"
            code={`import { useState } from 'react';

function ExpensiveComponent() {
  // ❌ This expensive calculation runs on every render
  const [data, setData] = useState(expensiveCalculation());

  // ✅ This expensive calculation only runs once
  const [lazyData, setLazyData] = useState(() => expensiveCalculation());

  return <div>Component with lazy initialization</div>;
}

function expensiveCalculation() {
  console.log('Running expensive calculation...');
  // Simulate expensive operation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return result;
}

// Practical example with localStorage
function UserPreferences() {
  // ✅ Only read from localStorage once, not on every render
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('userPreferences');
      return saved ? JSON.parse(saved) : {
        theme: 'light',
        language: 'en',
        notifications: true
      };
    } catch (error) {
      console.error('Failed to load preferences:', error);
      return {
        theme: 'light',
        language: 'en',
        notifications: true
      };
    }
  });

  const updatePreference = (key, value) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);
    
    // Save to localStorage
    try {
      localStorage.setItem('userPreferences', JSON.stringify(newPreferences));
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  return (
    <div>
      <h2>User Preferences</h2>
      
      <div>
        <label>
          Theme:
          <select
            value={preferences.theme}
            onChange={(e) => updatePreference('theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Language:
          <select
            value={preferences.language}
            onChange={(e) => updatePreference('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={(e) => updatePreference('notifications', e.target.checked)}
          />
          Enable Notifications
        </label>
      </div>

      <div>
        <h3>Current Preferences:</h3>
        <pre>{JSON.stringify(preferences, null, 2)}</pre>
      </div>
    </div>
  );
}

// Another example with random initial data
function GameBoard() {
  // Generate random initial board only once
  const [board, setBoard] = useState(() => {
    return Array(9).fill(null).map(() => Math.random() > 0.5 ? 'X' : 'O');
  });

  const [score, setScore] = useState(() => {
    // Calculate initial score based on board
    return board.filter(cell => cell === 'X').length;
  });

  const resetBoard = () => {
    const newBoard = Array(9).fill(null).map(() => Math.random() > 0.5 ? 'X' : 'O');
    setBoard(newBoard);
    setScore(newBoard.filter(cell => cell === 'X').length);
  };

  return (
    <div>
      <div>Score: {score}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px', width: '150px' }}>
        {board.map((cell, index) => (
          <div
            key={index}
            style={{
              width: '40px',
              height: '40px',
              border: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <button onClick={resetBoard}>New Game</button>
    </div>
  );
}`}
            explanation="Lazy initialization prevents expensive calculations from running on every render."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">useState Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Use multiple useState calls for unrelated state</li>
                <li>Use functional updates for dependent state</li>
                <li>Initialize state with the correct type</li>
                <li>Use lazy initialization for expensive calculations</li>
                <li>Keep state as simple as possible</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don't</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Mutate state directly</li>
                <li>Store props in state unless necessary</li>
                <li>Use state for computed values</li>
                <li>Create unnecessary state variables</li>
                <li>Forget to handle state updates properly</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Complete Example</h2>
          <p className="text-muted-foreground mb-6">
            A complete example showing a form with multiple useState patterns:
          </p>
          
          <CodeExample
            title="Complete Form with useState"
            code={`import { useState } from 'react';

function ContactForm() {
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium',
    subscribe: false
  });

  // Form state management
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);
  const [lastSubmitted, setLastSubmitted] = useState(null);

  // Character count for message
  const [messageLength, setMessageLength] = useState(0);
  const maxMessageLength = 500;

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length > maxMessageLength) {
      newErrors.message = \`Message must be \${maxMessageLength} characters or less\`;
    }

    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Update message length for real-time feedback
    if (name === 'message') {
      setMessageLength(value.length);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setLastSubmitted(new Date());
      setSubmitCount(prevCount => prevCount + 1);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'medium',
        subscribe: false
      });
      setMessageLength(0);
      setErrors({});
      
      alert('Message sent successfully!');
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium',
      subscribe: false
    });
    setErrors({});
    setMessageLength(0);
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      
      {submitCount > 0 && (
        <div className="success-message">
          You have successfully submitted {submitCount} message(s).
          {lastSubmitted && (
            <div>Last submitted: {lastSubmitted.toLocaleString()}</div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={errors.subject ? 'error' : ''}
          />
          {errors.subject && <span className="error-message">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Message * ({messageLength}/{maxMessageLength})
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={errors.message ? 'error' : ''}
            style={{
              borderColor: messageLength > maxMessageLength ? 'red' : undefined
            }}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            Subscribe to newsletter
          </label>
        </div>

        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}

        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;`}
            explanation="This comprehensive example demonstrates multiple useState patterns including object state, validation, form handling, and state synchronization."
          />
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/hooks"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Hooks
          </Link>
          
          <Link 
            href="/hooks/useEffect"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: useEffect Hook
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}