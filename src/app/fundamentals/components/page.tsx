import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { CodeExample } from "@/components/CodeExample"

export default function ComponentsPage() {
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
          React Component Definition
        </h1>
        <p className="text-xl text-gray-600">
          Learn how to create and structure React components, the building blocks of React applications.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What are React Components?</h2>
          <p className="text-gray-700 mb-6">
            React components are reusable pieces of code that return JSX elements to be rendered to the page. 
            They are the building blocks of React applications and can be thought of as custom HTML elements.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Key Concepts</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Components are JavaScript functions that return JSX</li>
              <li>Component names must start with a capital letter</li>
              <li>Components can accept props (properties) as parameters</li>
              <li>Components should be pure functions when possible</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Function Components</h2>
          <p className="text-gray-700 mb-6">
            The most common way to define a component is as a JavaScript function. Here&apos;s a simple example:
          </p>
          
          <CodeExample
            title="Basic Function Component"
            code={`function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Arrow function syntax
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};

// Shorthand for simple returns
const Welcome = () => <h1>Hello, World!</h1>;`}
            explanation="This component returns a simple heading element. Notice the capital letter in the component name."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Components with Props</h2>
          <p className="text-gray-700 mb-6">
            Props allow you to pass data to components, making them dynamic and reusable:
          </p>
          
          <CodeExample
            title="Component with Props"
            code={`function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Using destructuring
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

// With TypeScript
interface WelcomeProps {
  name: string;
  age: number;
}

function Welcome({ name, age }: WelcomeProps) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}`}
            explanation="Props are passed as an object to the component function. You can destructure them for cleaner code."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Using Components</h2>
          <p className="text-gray-700 mb-6">
            Once defined, components can be used like HTML elements in JSX:
          </p>
          
          <CodeExample
            title="Using Components"
            code={`function App() {
  return (
    <div>
      <Welcome />
      <Welcome name="Alice" age={25} />
      <Welcome name="Bob" age={30} />
    </div>
  );
}

// Components can also use other components
function UserCard({ user }) {
  return (
    <div className="card">
      <Welcome name={user.name} age={user.age} />
      <p>Email: {user.email}</p>
    </div>
  );
}`}
            explanation="Components can be reused multiple times with different props. They can also compose other components."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Component Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Use PascalCase for component names</li>
                <li>Keep components small and focused</li>
                <li>Use descriptive prop names</li>
                <li>Return a single parent element</li>
                <li>Use TypeScript for better type safety</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don't</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Use lowercase for component names</li>
                <li>Create overly complex components</li>
                <li>Mutate props directly</li>
                <li>Return multiple elements without a wrapper</li>
                <li>Use components for everything (sometimes plain HTML is fine)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Complete Example</h2>
          <p className="text-gray-700 mb-6">
            Here's a complete example showing multiple components working together:
          </p>
          
          <CodeExample
            title="Complete Component Example"
            code={`// UserProfile.tsx
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface UserProfileProps {
  user: User;
  onEdit: (user: User) => void;
}

function UserProfile({ user, onEdit }: UserProfileProps) {
  return (
    <div className="user-profile">
      <Avatar src={user.avatar} alt={user.name} />
      <UserInfo name={user.name} email={user.email} />
      <button onClick={() => onEdit(user)}>
        Edit Profile
      </button>
    </div>
  );
}

function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className="avatar"
    />
  );
}

function UserInfo({ name, email }: { name: string; email: string }) {
  return (
    <div className="user-info">
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}

export default UserProfile;`}
            explanation="This example shows component composition, TypeScript interfaces, and how components can work together to create a larger feature."
          />
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-gray-200">
          <Link 
            href="/fundamentals"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Fundamentals
          </Link>
          
          <Link 
            href="/fundamentals/jsx"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: JSX Syntax
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}