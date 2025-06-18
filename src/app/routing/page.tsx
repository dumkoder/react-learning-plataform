import Link from "next/link";
import { ArrowRight, ArrowLeft, Route, Map } from "lucide-react";

export default function RoutingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Routing in React
        </h1>
        <p className="text-xl text-gray-600">
          Learn how to implement navigation and routing in React applications with React Router.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-green-900 mb-2">
          <Route className="inline h-5 w-5 mr-2" />
          What is Routing?
        </h2>
        <p className="text-green-800">
          Routing allows you to create single-page applications (SPAs) with multiple views. 
          React Router is the standard library for routing in React applications, enabling 
          navigation between different components based on the URL.
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Concepts</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">React Router Components</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• BrowserRouter - Provides routing context</li>
                <li>• Routes - Container for route definitions</li>
                <li>• Route - Defines path-component mapping</li>
                <li>• Link - Navigation without page refresh</li>
                <li>• Navigate - Programmatic navigation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Advanced Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Nested routing</li>
                <li>• Route parameters</li>
                <li>• Query strings</li>
                <li>• Protected routes</li>
                <li>• Lazy loading</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Setup</h3>
          <div className="bg-gray-900 p-4 rounded-lg text-gray-100 text-sm font-mono">
            <pre>{`npm install react-router-dom

// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`}</pre>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            <Map className="inline h-5 w-5 mr-2" />
            Next.js Routing
          </h3>
          <p className="text-gray-700 mb-4">
            This application uses Next.js App Router, which provides file-system based routing. 
            Each folder in the app directory becomes a route, and page.tsx files define the UI for that route.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <p className="font-medium text-blue-900 mb-2">File Structure:</p>
            <pre className="text-blue-800">{`app/
├── page.tsx              # /
├── fundamentals/
│   └── page.tsx          # /fundamentals
├── hooks/
│   └── page.tsx          # /hooks
└── playground/
    └── page.tsx          # /playground`}</pre>
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
        <Link 
          href="/redux"
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Previous: Redux
        </Link>
        
        <Link 
          href="/testing"
          className="flex items-center text-green-600 hover:text-green-700"
        >
          Next: Testing
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}