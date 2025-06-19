import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function ReduxIntroductionPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link 
          href="/redux" 
          className="flex items-center text-indigo-600 hover:text-indigo-700 mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Redux
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Redux Introduction
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn Redux fundamentals, core principles, and understand when and why to use Redux for state management.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is Redux?</h2>
          <p className="text-muted-foreground mb-6">
            Redux is a predictable state container for JavaScript applications. It helps you write applications that 
            behave consistently, run in different environments, and are easy to test. Redux centralizes your 
            application's state and logic.
          </p>
          
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-indigo-900 mb-2">Core Benefits</h3>
            <ul className="list-disc list-inside text-indigo-800 space-y-1">
              <li><strong>Predictable:</strong> Same state + same action = same result</li>
              <li><strong>Centralized:</strong> Single source of truth for application state</li>
              <li><strong>Debuggable:</strong> Time-travel debugging with Redux DevTools</li>
              <li><strong>Flexible:</strong> Works with any UI layer or framework</li>
              <li><strong>Testable:</strong> Pure functions make testing straightforward</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Redux Core Principles</h2>
          <p className="text-muted-foreground mb-6">
            Redux is built around three fundamental principles that guide how you structure and manage state:
          </p>
          
          <div className="grid gap-6 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-2">1. Single Source of Truth</h3>
              <p className="text-blue-800 mb-4">
                The global state of your application is stored in an object tree within a single store.
              </p>
              <CodeExample
                title="Single Store Example"
                code={`// The entire application state lives in one place
const store = {
  todos: [
    { id: 1, text: 'Learn Redux', completed: false },
    { id: 2, text: 'Build an app', completed: true }
  ],
  user: {
    name: 'John Doe',
    isLoggedIn: true
  },
  ui: {
    loading: false,
    theme: 'dark'
  }
};

// Instead of scattered state across components:
// Component A: const [todos, setTodos] = useState([])
// Component B: const [user, setUser] = useState(null)
// Component C: const [theme, setTheme] = useState('light')`}
                explanation="All application state is centralized in one store, making it easier to debug and understand."
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-green-900 mb-2">2. State is Read-Only</h3>
              <p className="text-green-800 mb-4">
                The only way to change the state is to emit an action, an object describing what happened.
              </p>
              <CodeExample
                title="Actions Change State"
                code={`// ❌ Never mutate state directly
state.todos.push(newTodo);
state.user.name = 'Jane';

// ✅ Dispatch actions to describe changes
store.dispatch({
  type: 'ADD_TODO',
  payload: { id: 3, text: 'Learn React', completed: false }
});

store.dispatch({
  type: 'UPDATE_USER_NAME',
  payload: 'Jane Doe'
});

// Actions are plain objects that describe "what happened"
const addTodoAction = {
  type: 'ADD_TODO',
  payload: {
    id: Date.now(),
    text: 'New task',
    completed: false
  }
};`}
                explanation="Actions are the only way to trigger state changes, ensuring all updates are traceable."
              />
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-purple-900 mb-2">3. Changes are Made with Pure Functions</h3>
              <p className="text-purple-800 mb-4">
                To specify how the state tree is transformed by actions, you write pure reducers.
              </p>
              <CodeExample
                title="Pure Reducer Functions"
                code={`// Reducer: (previousState, action) => newState
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      // Return new array instead of mutating existing
      return [...state, action.payload];
    
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload.id);
    
    default:
      return state; // Always return current state for unknown actions
  }
}

// Pure function characteristics:
// 1. Same input always produces same output
// 2. No side effects (no API calls, no mutations)
// 3. Doesn't modify input parameters`}
                explanation="Reducers are pure functions that take the previous state and an action, and return the next state."
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Redux Data Flow</h2>
          <p className="text-muted-foreground mb-6">
            Redux follows a strict unidirectional data flow pattern:
          </p>
          
          <CodeExample
            title="Redux Data Flow Example"
            code={`// 1. USER INTERACTION
// User clicks a button in the UI
<button onClick={() => handleAddTodo('Learn Redux')}>
  Add Todo
</button>

// 2. ACTION DISPATCH
// Event handler dispatches an action
function handleAddTodo(text) {
  store.dispatch({
    type: 'ADD_TODO',
    payload: {
      id: Date.now(),
      text: text,
      completed: false
    }
  });
}

// 3. REDUCER PROCESSES ACTION
// Redux calls the reducer with current state and action
function todosReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      console.log('Current state:', state);
      console.log('Action:', action);
      
      const newState = [...state, action.payload];
      console.log('New state:', newState);
      
      return newState;
    
    default:
      return state;
  }
}

// 4. STORE UPDATES
// Redux store updates with the new state returned by reducer

// 5. UI RE-RENDERS
// React components subscribed to the store automatically re-render
function TodoList() {
  const todos = useSelector(state => state.todos); // Gets updated state
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Data Flow: UI → Action → Reducer → Store → UI (repeat)`}
            explanation="Redux enforces unidirectional data flow: actions describe what happened, reducers specify how state changes, and the UI reflects the new state."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">When to Use Redux</h2>
          <p className="text-muted-foreground mb-6">
            Redux isn't always necessary. Here's when you should consider using it:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Use Redux When</h3>
              <ul className="text-green-800 text-sm space-y-2">
                <li><strong>Complex state logic:</strong> Multiple components need the same data</li>
                <li><strong>Frequent updates:</strong> State changes often from many sources</li>
                <li><strong>Large app:</strong> Managing state becomes difficult</li>
                <li><strong>Team development:</strong> Need consistent state management patterns</li>
                <li><strong>Time travel:</strong> Need undo/redo or debugging features</li>
                <li><strong>Caching:</strong> Need to cache data across route changes</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Skip Redux When</h3>
              <ul className="text-red-800 text-sm space-y-2">
                <li><strong>Simple app:</strong> Few components with local state</li>
                <li><strong>Learning React:</strong> Focus on React fundamentals first</li>
                <li><strong>Static data:</strong> Data rarely changes</li>
                <li><strong>Small team:</strong> Overhead isn't worth the benefits</li>
                <li><strong>Quick prototype:</strong> Speed is more important than structure</li>
                <li><strong>Alternative solutions:</strong> Context API or useState might suffice</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Redux vs Alternatives</h2>
          <p className="text-muted-foreground mb-6">
            Understanding how Redux compares to other state management solutions:
          </p>
          
          <CodeExample
            title="State Management Comparison"
            code={`// 1. LOCAL COMPONENT STATE (useState)
function TodoApp() {
  const [todos, setTodos] = useState([]);
  
  // ✅ Good for: Component-specific state
  // ❌ Limited to: Single component, no sharing
  
  return <TodoList todos={todos} onUpdate={setTodos} />;
}

// 2. CONTEXT API
const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  
  // ✅ Good for: Sharing state across components
  // ❌ Limited by: Performance issues with frequent updates
  
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
}

// 3. REDUX
const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    }
  }
});

// ✅ Good for: Complex state, debugging, middleware
// ❌ Overhead: More boilerplate, learning curve

// 4. ZUSTAND (Alternative)
const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] }))
}));

// ✅ Good for: Simpler Redux alternative
// ❌ Limited: Smaller ecosystem, fewer DevTools`}
            explanation="Each state management solution has its place. Choose based on your app's complexity and requirements."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Redux Mental Model</h2>
          <p className="text-muted-foreground mb-6">
            Think of Redux like a bank account system:
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-amber-900 mb-4">🏦 Redux Bank Analogy</h3>
            <div className="grid md:grid-cols-2 gap-6 text-amber-800">
              <div>
                <h4 className="font-medium mb-2">Redux Concepts:</h4>
                <ul className="space-y-1 text-sm">
                  <li><strong>Store:</strong> Bank vault (holds all money)</li>
                  <li><strong>State:</strong> Account balance</li>
                  <li><strong>Action:</strong> Deposit/withdrawal slip</li>
                  <li><strong>Reducer:</strong> Bank teller (processes transactions)</li>
                  <li><strong>Dispatch:</strong> Submitting the slip</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Rules:</h4>
                <ul className="space-y-1 text-sm">
                  <li>You can't change balance directly</li>
                  <li>Must fill out a transaction slip (action)</li>
                  <li>Teller processes it following rules (reducer)</li>
                  <li>New balance is calculated (new state)</li>
                  <li>You receive updated statement (UI update)</li>
                </ul>
              </div>
            </div>
          </div>

          <CodeExample
            title="Redux Bank Example"
            code={`// BANK ACCOUNT REDUX EXAMPLE

// Action Types (Transaction Types)
const DEPOSIT = 'DEPOSIT';
const WITHDRAW = 'WITHDRAW';
const TRANSFER = 'TRANSFER';

// Action Creators (Fill out transaction slips)
function deposit(amount) {
  return {
    type: DEPOSIT,
    payload: { amount }
  };
}

function withdraw(amount) {
  return {
    type: WITHDRAW,
    payload: { amount }
  };
}

// Initial State (Starting balance)
const initialState = {
  balance: 0,
  transactions: []
};

// Reducer (Bank teller following rules)
function bankReducer(state = initialState, action) {
  switch (action.type) {
    case DEPOSIT:
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        transactions: [
          ...state.transactions,
          { type: 'deposit', amount: action.payload.amount, date: new Date() }
        ]
      };
    
    case WITHDRAW:
      if (state.balance < action.payload.amount) {
        console.log('Insufficient funds!');
        return state; // No change if insufficient funds
      }
      
      return {
        ...state,
        balance: state.balance - action.payload.amount,
        transactions: [
          ...state.transactions,
          { type: 'withdrawal', amount: action.payload.amount, date: new Date() }
        ]
      };
    
    default:
      return state;
  }
}

// Using the bank (Dispatching actions)
store.dispatch(deposit(100));  // Balance: $100
store.dispatch(deposit(50));   // Balance: $150
store.dispatch(withdraw(30));  // Balance: $120
store.dispatch(withdraw(200)); // Balance: $120 (insufficient funds)

console.log(store.getState().balance); // $120`}
            explanation="This bank analogy helps understand Redux's structured approach to state changes through actions and reducers."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Getting Started Checklist</h2>
          <p className="text-muted-foreground mb-6">
            Before diving deeper into Redux, make sure you understand these concepts:
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-4">Prerequisites & Next Steps</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">✅ Make sure you know:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>JavaScript ES6+ features</li>
                  <li>React fundamentals (components, props, state)</li>
                  <li>React hooks (useState, useEffect)</li>
                  <li>Array methods (map, filter, reduce)</li>
                  <li>Object destructuring and spread operator</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">📚 What you'll learn next:</h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>Creating stores, actions, and reducers</li>
                  <li>Connecting Redux to React components</li>
                  <li>Using Redux Toolkit for modern Redux</li>
                  <li>Handling async operations</li>
                  <li>Debugging with Redux DevTools</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/redux"
            className="flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Redux Overview
          </Link>
          
          <Link 
            href="/redux/store-actions-reducers"
            className="flex items-center text-indigo-600 hover:text-indigo-700"
          >
            Next: Store, Actions & Reducers
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}