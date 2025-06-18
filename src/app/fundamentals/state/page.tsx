import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function StatePage() {
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
          Component State
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn how to manage state in React components using the useState hook and understand state best practices.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is State?</h2>
          <p className="text-muted-foreground mb-6">
            State is data that changes over time in your component. Unlike props, which are passed down from parent components, 
            state is owned and managed by the component itself. When state changes, React re-renders the component to reflect the new state.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Key Concepts</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>State is component-specific data that can change</li>
              <li>Changing state triggers a re-render</li>
              <li>State should be treated as immutable</li>
              <li>Use useState hook for state management in function components</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">The useState Hook</h2>
          <p className="text-muted-foreground mb-6">
            The useState hook is the primary way to add state to function components:
          </p>
          
          <CodeExample
            title="Basic useState Example"
            code={`import { useState } from 'react';

function Counter() {
  // Declare state variable with initial value
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}`}
            explanation="useState returns an array with two elements: the current state value and a function to update it."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Different Types of State</h2>
          <p className="text-muted-foreground mb-6">
            State can hold various types of data:
          </p>
          
          <CodeExample
            title="Various State Types"
            code={`function StateExamples() {
  // String state
  const [name, setName] = useState('');
  
  // Boolean state
  const [isVisible, setIsVisible] = useState(false);
  
  // Array state
  const [items, setItems] = useState([]);
  
  // Object state
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  // Adding to array
  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  // Updating object
  const updateUser = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      
      {isVisible && <p>Hello, {name}!</p>}
      
      <button onClick={() => addItem(\`Item \${items.length + 1}\`)}>
        Add Item
      </button>
      
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`}
            explanation="Always use the spread operator (...) when updating arrays and objects to maintain immutability."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Functional Updates</h2>
          <p className="text-muted-foreground mb-6">
            When the new state depends on the previous state, use functional updates to avoid stale closures:
          </p>
          
          <CodeExample
            title="Functional State Updates"
            code={`function Counter() {
  const [count, setCount] = useState(0);

  // ❌ Problematic - may use stale state
  const incrementTwice = () => {
    setCount(count + 1);
    setCount(count + 1); // This might not work as expected
  };

  // ✅ Correct - uses functional update
  const incrementTwiceCorrect = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };

  // ✅ Also correct for arrays
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    setTodos(prevTodos => [...prevTodos, {
      id: Date.now(),
      text,
      completed: false
    }]);
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementTwiceCorrect}>
        Increment Twice
      </button>
    </div>
  );
}`}
            explanation="Functional updates ensure you always work with the most current state value."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">State Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Keep state as simple as possible</li>
                <li>Use functional updates for dependent state</li>
                <li>Initialize state with the correct type</li>
                <li>Group related state into objects</li>
                <li>Use multiple useState calls for unrelated state</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don't</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Mutate state directly</li>
                <li>Store props in state unless necessary</li>
                <li>Use state for computed values</li>
                <li>Create unnecessary state variables</li>
                <li>Store objects in state without spreading</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Complete Example</h2>
          <p className="text-muted-foreground mb-6">
            Here's a complete example of a todo app demonstrating various state management patterns:
          </p>
          
          <CodeExample
            title="Todo App with State"
            code={`import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos(prevTodos => [...prevTodos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.filter(todo => todo.id !== id)
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <h1>Todo App</h1>
      
      <div className="add-todo">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filters">
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="stats">
        Total: {todos.length} | 
        Active: {todos.filter(t => !t.completed).length} | 
        Completed: {todos.filter(t => t.completed).length}
      </div>
    </div>
  );
}

export default TodoApp;`}
            explanation="This example demonstrates adding, updating, deleting, and filtering state with multiple useState hooks."
          />
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/fundamentals/jsx"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: JSX Syntax
          </Link>
          
          <Link 
            href="/fundamentals/lifecycle"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: Component Lifecycle
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}