import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function UseContextPage() {
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
          useContext Hook
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn how to consume React Context with the useContext hook to avoid prop drilling and share data across components.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is useContext?</h2>
          <p className="text-muted-foreground mb-6">
            useContext is a React Hook that allows you to consume context values without wrapping your component 
            in a Context Consumer. It provides a cleaner way to access context data that was created with React.createContext().
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Key Benefits</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Eliminates prop drilling</li>
              <li>Provides global state management</li>
              <li>Cleaner syntax than Context.Consumer</li>
              <li>Automatically subscribes to context changes</li>
              <li>Works seamlessly with other hooks</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Basic Context Setup</h2>
          <p className="text-muted-foreground mb-6">
            First, let's create a context and see how to consume it with useContext:
          </p>
          
          <CodeExample
            title="Basic Context Usage"
            code={`import { createContext, useContext, useState } from 'react';

// 1. Create the context
const ThemeContext = createContext();

// 2. Create a provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook to use the context
function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

// 4. Components that consume the context
function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header 
      style={{
        backgroundColor: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '1rem'
      }}
    >
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
}

function Content() {
  const { theme } = useTheme();

  return (
    <main 
      style={{
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#222',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '2rem',
        minHeight: '400px'
      }}
    >
      <h2>Content Area</h2>
      <p>Current theme: {theme}</p>
      <p>This component automatically updates when the theme changes!</p>
    </main>
  );
}

function Sidebar() {
  const { theme } = useTheme();

  return (
    <aside 
      style={{
        backgroundColor: theme === 'light' ? '#e5e5e5' : '#444',
        color: theme === 'light' ? '#333' : '#fff',
        padding: '1rem',
        width: '200px'
      }}
    >
      <h3>Sidebar</h3>
      <p>Theme: {theme}</p>
    </aside>
  );
}

// 5. Main app component
function App() {
  return (
    <ThemeProvider>
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <Header />
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <Content />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;`}
            explanation="This pattern shows the complete setup: context creation, provider component, custom hook, and consuming components."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Multiple Contexts</h2>
          <p className="text-muted-foreground mb-6">
            You can use multiple contexts in the same component and create specialized contexts for different concerns:
          </p>
          
          <CodeExample
            title="Multiple Contexts Example"
            code={`import { createContext, useContext, useState, useReducer } from 'react';

// User Authentication Context
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Shopping Cart Context
const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalPrice = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hooks for each context
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

// Component using multiple contexts
function Navigation() {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>E-Commerce Store</h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Cart ({getTotalItems()})</span>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>Welcome, {user.name}!</span>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <span>Please log in</span>
          )}
        </div>
      </div>
    </nav>
  );
}

function ProductList() {
  const { user } = useAuth();
  const { addItem } = useCart();

  const products = [
    { id: 1, name: 'Laptop', price: 999.99 },
    { id: 2, name: 'Mouse', price: 29.99 },
    { id: 3, name: 'Keyboard', price: 79.99 }
  ];

  if (!user) {
    return <div style={{ padding: '2rem' }}>Please log in to view products.</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Products</h2>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button onClick={() => addItem(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartSummary() {
  const { cart, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();

  if (cart.items.length === 0) {
    return <div style={{ padding: '2rem' }}>Your cart is empty.</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Shopping Cart</h2>
      
      {cart.items.map(item => (
        <div key={item.id} style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '0.5rem',
          borderBottom: '1px solid #eee'
        }}>
          <span>{item.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            <span>\${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      
      <div style={{ marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
        Total: \${getTotalPrice().toFixed(2)}
      </div>
      
      <button onClick={clearCart} style={{ marginTop: '1rem' }}>
        Clear Cart
      </button>
    </div>
  );
}

// Main app with multiple providers
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div>
          <Navigation />
          <ProductList />
          <CartSummary />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}`}
            explanation="Multiple contexts can be used together. Each context handles a specific concern (auth, cart, theme, etc.)."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Context with useReducer</h2>
          <p className="text-muted-foreground mb-6">
            For complex state management, combine useContext with useReducer:
          </p>
          
          <CodeExample
            title="Context with useReducer"
            code={`import { createContext, useContext, useReducer } from 'react';

// Todo Actions
const todoActions = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SET_FILTER: 'SET_FILTER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Todo Reducer
function todoReducer(state, action) {
  switch (action.type) {
    case todoActions.ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
            createdAt: new Date().toISOString()
          }
        ]
      };

    case todoActions.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case todoActions.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case todoActions.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    case todoActions.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case todoActions.SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

// Initial state
const initialState = {
  todos: [],
  filter: 'all', // 'all', 'active', 'completed'
  loading: false,
  error: null
};

// Todo Context
const TodoContext = createContext();

// Todo Provider
function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Action creators
  const addTodo = (text) => {
    dispatch({ type: todoActions.ADD_TODO, payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: todoActions.TOGGLE_TODO, payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: todoActions.DELETE_TODO, payload: id });
  };

  const setFilter = (filter) => {
    dispatch({ type: todoActions.SET_FILTER, payload: filter });
  };

  const setLoading = (loading) => {
    dispatch({ type: todoActions.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: todoActions.SET_ERROR, payload: error });
  };

  // Computed values
  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const todoCounts = {
    all: state.todos.length,
    active: state.todos.filter(todo => !todo.completed).length,
    completed: state.todos.filter(todo => todo.completed).length
  };

  // Async actions
  const saveTodosToServer = async () => {
    setLoading(true);
    try {
      await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.todos)
      });
      setError(null);
    } catch (error) {
      setError('Failed to save todos');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    ...state,
    filteredTodos,
    todoCounts,
    addTodo,
    toggleTodo,
    deleteTodo,
    setFilter,
    saveTodosToServer
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook
function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
}

// Components
function TodoInput() {
  const { addTodo } = useTodos();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
        style={{ marginRight: '0.5rem', padding: '0.5rem' }}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

function TodoList() {
  const { filteredTodos, toggleTodo, deleteTodo } = useTodos();

  if (filteredTodos.length === 0) {
    return <p>No todos found.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {filteredTodos.map(todo => (
        <li 
          key={todo.id} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '0.5rem',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            style={{ marginRight: '0.5rem' }}
          />
          <span 
            style={{ 
              flex: 1, 
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : 'inherit'
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

function TodoFilters() {
  const { filter, setFilter, todoCounts } = useTodos();

  const filters = [
    { key: 'all', label: \`All (\${todoCounts.all})\` },
    { key: 'active', label: \`Active (\${todoCounts.active})\` },
    { key: 'completed', label: \`Completed (\${todoCounts.completed})\` }
  ];

  return (
    <div style={{ marginBottom: '1rem' }}>
      {filters.map(filterOption => (
        <button
          key={filterOption.key}
          onClick={() => setFilter(filterOption.key)}
          style={{
            marginRight: '0.5rem',
            padding: '0.25rem 0.5rem',
            backgroundColor: filter === filterOption.key ? '#007bff' : '#f8f9fa',
            color: filter === filterOption.key ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        >
          {filterOption.label}
        </button>
      ))}
    </div>
  );
}

function TodoApp() {
  const { loading, error, saveTodosToServer } = useTodos();

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <h1>Todo App with Context + useReducer</h1>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          Error: {error}
        </div>
      )}
      
      <TodoInput />
      <TodoFilters />
      <TodoList />
      
      <button 
        onClick={saveTodosToServer}
        disabled={loading}
        style={{ marginTop: '1rem' }}
      >
        {loading ? 'Saving...' : 'Save to Server'}
      </button>
    </div>
  );
}

// Main app
function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}`}
            explanation="useReducer with useContext provides powerful state management for complex applications with multiple related state updates."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">useContext Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Create custom hooks for context consumption</li>
                <li>Add error boundaries for context providers</li>
                <li>Split contexts by concern (auth, theme, etc.)</li>
                <li>Provide default values for contexts</li>
                <li>Use TypeScript for better context type safety</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don't</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Use context for frequently changing values</li>
                <li>Create one giant context for everything</li>
                <li>Use context for local component state</li>
                <li>Forget to handle undefined context values</li>
                <li>Pass objects that change on every render</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/hooks/useEffect"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: useEffect Hook
          </Link>
          
          <Link 
            href="/hooks/useReducer"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: useReducer Hook
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}