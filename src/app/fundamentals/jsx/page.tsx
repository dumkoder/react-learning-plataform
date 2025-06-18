import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { CodeExample } from "@/components/CodeExample"

export default function JSXPage() {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          JSX Syntax
        </h1>
        <p className="text-xl text-gray-600">
          Master JSX syntax and understand how it works under the hood to write React components effectively.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is JSX?</h2>
          <p className="text-gray-700 mb-6">
            JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like 
            code within JavaScript. It makes React components more readable and easier to write.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Key Points</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>JSX is not HTML - it's JavaScript that looks like HTML</li>
              <li>JSX gets compiled to React.createElement() calls</li>
              <li>JSX expressions must have one parent element</li>
              <li>JSX uses camelCase for HTML attributes</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Basic JSX Syntax</h2>
          
          <CodeExample
            title="JSX vs HTML"
            code={`// JSX
function MyComponent() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <p>This is JSX!</p>
    </div>
  );
}

// What JSX compiles to (React.createElement)
function MyComponent() {
  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement('h1', null, 'Hello World'),
    React.createElement('p', null, 'This is JSX!')
  );
}`}
            explanation="JSX provides a more readable way to create React elements compared to React.createElement calls."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">JavaScript Expressions in JSX</h2>
          <p className="text-gray-700 mb-6">
            You can embed any JavaScript expression in JSX by wrapping it in curly braces:
          </p>
          
          <CodeExample
            title="Embedding JavaScript"
            code={`function Greeting({ name, age }) {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;
  
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old</p>
      <p>Born in: {birthYear}</p>
      <p>Random number: {Math.random()}</p>
      <p>Uppercase name: {name.toUpperCase()}</p>
    </div>
  );
}`}
            explanation="Any valid JavaScript expression can be used inside curly braces in JSX."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">JSX Attributes</h2>
          <p className="text-gray-700 mb-6">
            JSX uses camelCase for attributes and some attributes have different names than HTML:
          </p>
          
          <CodeExample
            title="JSX Attributes"
            code={`function MyForm() {
  const isDisabled = true;
  const inputStyle = { backgroundColor: 'lightblue' };
  
  return (
    <form>
      {/* className instead of class */}
      <div className="form-group">
        
        {/* htmlFor instead of for */}
        <label htmlFor="email">Email:</label>
        
        {/* style as an object */}
        <input
          id="email"
          type="email"
          style={inputStyle}
          disabled={isDisabled}
          onChange={(e) => console.log(e.target.value)}
        />
      </div>
      
      {/* Self-closing tags must end with /> */}
      <input type="submit" value="Submit" />
      <br />
      <hr />
    </form>
  );
}`}
            explanation="Notice className instead of class, htmlFor instead of for, and that all tags must be properly closed."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Conditional Rendering</h2>
          <p className="text-gray-700 mb-6">
            JSX allows you to conditionally render elements using JavaScript expressions:
          </p>
          
          <CodeExample
            title="Conditional Rendering"
            code={`function UserProfile({ user, isLoggedIn }) {
  return (
    <div>
      {/* Conditional rendering with && */}
      {isLoggedIn && <h1>Welcome back, {user.name}!</h1>}
      
      {/* Conditional rendering with ternary operator */}
      {isLoggedIn ? (
        <button>Logout</button>
      ) : (
        <button>Login</button>
      )}
      
      {/* Conditional rendering with if statement (outside JSX) */}
      {renderUserInfo()}
    </div>
  );
  
  function renderUserInfo() {
    if (!isLoggedIn) {
      return <p>Please log in to see your profile</p>;
    }
    
    if (user.isPremium) {
      return <div className="premium-badge">Premium User</div>;
    }
    
    return <div className="regular-badge">Regular User</div>;
  }
}`}
            explanation="Use && for simple conditional rendering, ternary operators for either/or cases, and functions for complex logic."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rendering Lists</h2>
          <p className="text-gray-700 mb-6">
            Use JavaScript's map function to render lists of elements:
          </p>
          
          <CodeExample
            title="Rendering Lists"
            code={`function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// More complex list rendering
function UserList({ users }) {
  return (
    <div>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div>
          <h2>Users ({users.length})</h2>
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              {user.isAdmin && <span className="admin-badge">Admin</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}`}
            explanation="Always provide a unique 'key' prop when rendering lists. This helps React efficiently update the DOM."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">JSX Fragments</h2>
          <p className="text-gray-700 mb-6">
            When you need to return multiple elements without adding an extra DOM node:
          </p>
          
          <CodeExample
            title="JSX Fragments"
            code={`function MyComponent() {
  // Using React.Fragment
  return (
    <React.Fragment>
      <h1>Title</h1>
      <p>Paragraph</p>
    </React.Fragment>
  );
}

// Using short syntax
function MyComponent() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}

// Useful in lists
function TableRows({ data }) {
  return (
    <>
      {data.map(item => (
        <React.Fragment key={item.id}>
          <tr>
            <td>{item.name}</td>
            <td>{item.value}</td>
          </tr>
          <tr>
            <td colSpan="2">{item.description}</td>
          </tr>
        </React.Fragment>
      ))}
    </>
  );
}`}
            explanation="Fragments let you group elements without adding extra nodes to the DOM. Use React.Fragment when you need keys."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common JSX Gotchas</h2>
          
          <div className="grid md:grid-cols-1 gap-6 mb-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-yellow-900 mb-2">⚠️ Common Mistakes</h3>
              <ul className="text-yellow-800 text-sm space-y-2">
                <li><strong>class vs className:</strong> Use className, not class</li>
                <li><strong>for vs htmlFor:</strong> Use htmlFor for labels</li>
                <li><strong>Self-closing tags:</strong> Always close tags like &lt;br /&gt;, &lt;img /&gt;</li>
                <li><strong>Return multiple elements:</strong> Wrap in Fragment or parent element</li>
                <li><strong>Style attribute:</strong> Must be an object, not a string</li>
                <li><strong>Event handlers:</strong> Use camelCase (onClick, not onclick)</li>
              </ul>
            </div>
          </div>

          <CodeExample
            title="Common Mistakes and Fixes"
            code={`// ❌ Wrong
function BadComponent() {
  return (
    <div class="container" style="color: red;">
      <label for="name">Name:</label>
      <input type="text" id="name">
      <br>
      <img src="photo.jpg" alt="Photo">
    </div>
    <p>This will cause an error - multiple elements!</p>
  );
}

// ✅ Correct
function GoodComponent() {
  return (
    <div className="container" style={{ color: 'red' }}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" />
      <br />
      <img src="photo.jpg" alt="Photo" />
      <p>All wrapped in a parent element!</p>
    </div>
  );
}`}
            explanation="Always use JSX syntax rules: className, htmlFor, self-closing tags, and single parent element."
          />
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link 
            href="/fundamentals/components"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: Components
          </Link>
          
          <Link 
            href="/fundamentals/state"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: Component State
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}