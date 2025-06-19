import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function UseReducerPage() {
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
          useReducer Hook
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn how to manage complex state logic with the useReducer hook for predictable state updates and better organization.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is useReducer?</h2>
          <p className="text-muted-foreground mb-6">
            useReducer is a React Hook that provides an alternative to useState for managing complex state logic. 
            It&apos;s especially useful when you have complex state updates, multiple sub-values, or when the next state depends on the previous one.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">When to Use useReducer</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Complex state objects with multiple properties</li>
              <li>State transitions that depend on previous state</li>
              <li>Multiple ways to update the same piece of state</li>
              <li>State logic that is better centralized</li>
              <li>When debugging state updates is important</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Basic useReducer Usage</h2>
          <p className="text-muted-foreground mb-6">
            useReducer takes a reducer function and an initial state, returning the current state and a dispatch function:
          </p>
          
          <CodeExample
            title="Basic Counter with useReducer"
            code={`import { useReducer } from 'react';

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    case 'set':
      return { count: action.payload };
    default:
      throw new Error(\`Unknown action type: \${action.type}\`);
  }
}

function Counter() {
  // Initialize useReducer with reducer function and initial state
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      
      <button onClick={() => dispatch({ type: 'increment' })}>
        +1
      </button>
      
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -1
      </button>
      
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
      
      <button onClick={() => dispatch({ type: 'set', payload: 10 })}>
        Set to 10
      </button>
    </div>
  );
}

// Comparison with useState
function CounterWithState() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount(10)}>Set to 10</button>
    </div>
  );
}

export default Counter;`}
            explanation="useReducer provides a more predictable way to handle state updates, especially when multiple actions can modify the same state."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Complex State Management</h2>
          <p className="text-muted-foreground mb-6">
            useReducer shines when managing complex state with multiple properties and relationships:
          </p>
          
          <CodeExample
            title="Complex Form State with useReducer"
            code={`import { useReducer } from 'react';

// Form reducer
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        fields: {
          ...state.fields,
          [action.field]: action.value
        },
        errors: {
          ...state.errors,
          [action.field]: '' // Clear error when user types
        }
      };

    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.loading
      };

    case 'SET_SUBMITTED':
      return {
        ...state,
        submitted: action.submitted
      };

    case 'RESET_FORM':
      return {
        ...state,
        fields: action.initialFields || {},
        errors: {},
        submitted: false
      };

    case 'SET_FORM_STATE':
      return {
        ...state,
        ...action.payload
      };

    default:
      throw new Error(\`Unknown action type: \${action.type}\`);
  }
}

// Initial form state
const initialFormState = {
  fields: {
    name: '',
    email: '',
    message: '',
    newsletter: false
  },
  errors: {},
  loading: false,
  submitted: false
};

function ContactForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  // Field update handler
  const handleFieldChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  // Validation
  const validateForm = () => {
    const errors = {};

    if (!state.fields.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!state.fields.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(state.fields.email)) {
      errors.email = 'Email is invalid';
    }

    if (!state.fields.message.trim()) {
      errors.message = 'Message is required';
    } else if (state.fields.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return errors;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }

    dispatch({ type: 'SET_LOADING', loading: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      dispatch({ type: 'SET_SUBMITTED', submitted: true });
      dispatch({ type: 'RESET_FORM', initialFields: initialFormState.fields });
      
      console.log('Form submitted:', state.fields);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', field: 'submit', error: 'Failed to submit form' });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  const resetForm = () => {
    dispatch({ type: 'RESET_FORM', initialFields: initialFormState.fields });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Contact Form</h2>
      
      {state.submitted && (
        <div style={{ color: 'green', marginBottom: '1rem' }}>
          Form submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Name:
            <input
              type="text"
              value={state.fields.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                borderColor: state.errors.name ? 'red' : '#ccc'
              }}
            />
          </label>
          {state.errors.name && (
            <div style={{ color: 'red', fontSize: '0.8rem' }}>
              {state.errors.name}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Email:
            <input
              type="email"
              value={state.fields.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                borderColor: state.errors.email ? 'red' : '#ccc'
              }}
            />
          </label>
          {state.errors.email && (
            <div style={{ color: 'red', fontSize: '0.8rem' }}>
              {state.errors.email}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Message:
            <textarea
              value={state.fields.message}
              onChange={(e) => handleFieldChange('message', e.target.value)}
              rows={5}
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                borderColor: state.errors.message ? 'red' : '#ccc'
              }}
            />
          </label>
          {state.errors.message && (
            <div style={{ color: 'red', fontSize: '0.8rem' }}>
              {state.errors.message}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={state.fields.newsletter}
              onChange={(e) => handleFieldChange('newsletter', e.target.checked)}
            />
            Subscribe to newsletter
          </label>
        </div>

        {state.errors.submit && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {state.errors.submit}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            type="submit" 
            disabled={state.loading}
            style={{ padding: '0.5rem 1rem' }}
          >
            {state.loading ? 'Submitting...' : 'Submit'}
          </button>
          
          <button 
            type="button" 
            onClick={resetForm}
            style={{ padding: '0.5rem 1rem' }}
          >
            Reset
          </button>
        </div>
      </form>

      {/* Debug information */}
      <details style={{ marginTop: '2rem' }}>
        <summary>Debug Info</summary>
        <pre style={{ fontSize: '0.8rem' }}>
          {JSON.stringify(state, null, 2)}
        </pre>
      </details>
    </div>
  );
}`}
            explanation="useReducer excels at managing complex form state with multiple fields, validation, and loading states."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Advanced Patterns</h2>
          <p className="text-muted-foreground mb-6">
            Advanced useReducer patterns for real-world applications:
          </p>
          
          <CodeExample
            title="Advanced useReducer Patterns"
            code={`import { useReducer, useEffect, useCallback } from 'react';

// Shopping cart reducer with complex logic
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          ),
          lastUpdated: Date.now()
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
        lastUpdated: Date.now()
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        lastUpdated: Date.now()
      };

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: action.payload.id });
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        lastUpdated: Date.now()
      };
    }

    case 'APPLY_DISCOUNT':
      return {
        ...state,
        discount: action.payload,
        lastUpdated: Date.now()
      };

    case 'SET_SHIPPING':
      return {
        ...state,
        shipping: action.payload,
        lastUpdated: Date.now()
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        discount: 0,
        lastUpdated: Date.now()
      };

    case 'LOAD_FROM_STORAGE':
      return {
        ...action.payload,
        lastUpdated: Date.now()
      };

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    default:
      throw new Error(\`Unknown action type: \${action.type}\`);
  }
}

// Initial cart state
const initialCartState = {
  items: [],
  discount: 0,
  shipping: 0,
  loading: false,
  lastUpdated: Date.now()
};

// Custom hook for cart management
function useShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: cartData });
      } catch (error) {
        console.error('Failed to load cart from storage:', error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(state));
  }, [state]);

  // Action creators
  const addItem = useCallback((product, quantity = 1) => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { ...product, quantity } 
    });
  }, []);

  const removeItem = useCallback((productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: productId, quantity } 
    });
  }, []);

  const applyDiscount = useCallback((discountAmount) => {
    dispatch({ type: 'APPLY_DISCOUNT', payload: discountAmount });
  }, []);

  const setShipping = useCallback((shippingCost) => {
    dispatch({ type: 'SET_SHIPPING', payload: shippingCost });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  // Computed values
  const subtotal = state.items.reduce(
    (total, item) => total + (item.price * item.quantity), 
    0
  );

  const total = subtotal - state.discount + state.shipping;

  const itemCount = state.items.reduce(
    (count, item) => count + item.quantity, 
    0
  );

  // Async operations
  const checkout = useCallback(async (paymentInfo) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: state.items,
          total,
          paymentInfo
        })
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const result = await response.json();
      clearCart();
      return result;
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.items, total, clearCart]);

  return {
    state,
    addItem,
    removeItem,
    updateQuantity,
    applyDiscount,
    setShipping,
    clearCart,
    checkout,
    subtotal,
    total,
    itemCount
  };
}

// Shopping cart component
function ShoppingCart() {
  const {
    state,
    addItem,
    removeItem,
    updateQuantity,
    applyDiscount,
    clearCart,
    subtotal,
    total,
    itemCount
  } = useShoppingCart();

  const sampleProducts = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Mouse', price: 29.99 },
    { id: 3, name: 'Keyboard', price: 79.99 }
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Shopping Cart ({itemCount} items)</h1>

      {/* Product selection */}
      <div style={{ marginBottom: '2rem' }}>
        <h2>Products</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {sampleProducts.map(product => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button onClick={() => addItem(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart items */}
      {state.items.length > 0 ? (
        <div>
          <h2>Cart Items</h2>
          {state.items.map(item => (
            <div 
              key={item.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem',
                border: '1px solid #eee',
                marginBottom: '0.5rem'
              }}
            >
              <div>
                <strong>{item.name}</strong>
                <br />
                {item.price} each
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
                <span style={{ marginLeft: '1rem' }}>
                  {(item.price * item.quantity).toFixed(2)}
                </span>
                <button onClick={() => removeItem(item.id)} style={{ marginLeft: '1rem' }}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Cart summary */}
          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5' }}>
            <div>Subtotal: {subtotal.toFixed(2)}</div>
            <div>Discount: -{state.discount.toFixed(2)}</div>
            <div>Shipping: {state.shipping.toFixed(2)}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              Total: {total.toFixed(2)}
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <button onClick={() => applyDiscount(10)}>
                Apply $10 Discount
              </button>
              <button onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Your cart is empty</div>
      )}

      {/* Debug info */}
      <details style={{ marginTop: '2rem' }}>
        <summary>Debug State</summary>
        <pre style={{ fontSize: '0.8rem' }}>
          {JSON.stringify(state, null, 2)}
        </pre>
      </details>
    </div>
  );
}`}
            explanation="This advanced pattern shows useReducer with localStorage persistence, computed values, and async operations."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">useReducer vs useState</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-yellow-900 mb-4">When to Choose Each</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-yellow-900 mb-2">Use useState when:</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>State is simple (string, number, boolean)</li>
                  <li>Few state updates</li>
                  <li>State updates are independent</li>
                  <li>Component is small and simple</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-yellow-900 mb-2">Use useReducer when:</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>Complex state object</li>
                  <li>Multiple related state updates</li>
                  <li>State logic is complex</li>
                  <li>Need predictable state transitions</li>
                  <li>Want to optimize performance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">useReducer Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Keep reducers pure (no side effects)</li>
                <li>Use action types as constants</li>
                <li>Handle all possible action types</li>
                <li>Use TypeScript for better type safety</li>
                <li>Split large reducers into smaller ones</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don&apos;t</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Mutate state directly in reducers</li>
                <li>Perform side effects in reducers</li>
                <li>Use string literals for action types</li>
                <li>Make reducers overly complex</li>
                <li>Forget to handle default cases</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/hooks/useContext"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: useContext Hook
          </Link>
          
          <Link 
            href="/hooks/useMemo"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: useMemo Hook
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}