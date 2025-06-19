import Link from "next/link";
import { ArrowLeft, CheckCircle, Bug, TestTube } from "lucide-react";

export default function TestingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Testing React Applications
        </h1>
        <p className="text-xl text-gray-600">
          Learn automated testing strategies for React components and applications.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          <TestTube className="inline h-5 w-5 mr-2" />
          Why Test React Apps?
        </h2>
        <p className="text-blue-800 mb-4">
          Testing ensures your React components work correctly and helps prevent regressions 
          when adding new features or refactoring code.
        </p>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded border border-blue-200">
            <CheckCircle className="h-4 w-4 text-green-600 mb-1" />
            <strong>Confidence:</strong> Deploy with certainty
          </div>
          <div className="bg-white p-3 rounded border border-blue-200">
            <Bug className="h-4 w-4 text-red-600 mb-1" />
            <strong>Bug Prevention:</strong> Catch issues early
          </div>
          <div className="bg-white p-3 rounded border border-blue-200">
            <TestTube className="h-4 w-4 text-blue-600 mb-1" />
            <strong>Documentation:</strong> Tests as specs
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Testing Tools</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Core Testing Libraries</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <strong>Jest:</strong> JavaScript testing framework
                </li>
                <li>
                  <strong>React Testing Library:</strong> Simple component testing
                </li>
                <li>
                  <strong>Vitest:</strong> Fast unit test runner
                </li>
                <li>
                  <strong>Cypress:</strong> End-to-end testing
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Testing Types</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <strong>Unit Tests:</strong> Individual components/functions
                </li>
                <li>
                  <strong>Integration Tests:</strong> Component interactions
                </li>
                <li>
                  <strong>E2E Tests:</strong> Full user workflows
                </li>
                <li>
                  <strong>Snapshot Tests:</strong> Component output consistency
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Component Testing Example</h3>
          <div className="bg-gray-900 p-4 rounded-lg text-gray-100 text-sm font-mono mb-4">
            <pre>{`// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});`}</pre>
          </div>
          <p className="text-gray-600 text-sm">
            This example shows unit testing a Button component with different scenarios.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Testing Best Practices</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">✅ Do</h4>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Test user behavior, not implementation</li>
                <li>Use descriptive test names</li>
                <li>Keep tests simple and focused</li>
                <li>Mock external dependencies</li>
                <li>Test error states and edge cases</li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">❌ Don&apos;t</h4>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Test implementation details</li>
                <li>Write overly complex test setups</li>
                <li>Test third-party libraries</li>
                <li>Have tests that depend on each other</li>
                <li>Ignore test maintenance</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Building & Deployment</h3>
          <p className="text-gray-700 mb-4">
            After testing, you&apos;ll want to build and deploy your React application:
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Build Process</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bundle optimization and minification</li>
                <li>• Code splitting for better performance</li>
                <li>• Asset optimization (images, fonts)</li>
                <li>• Environment variable configuration</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Deployment Options</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Static hosting (Netlify, Vercel)</li>
                <li>• Server-side rendering (Next.js)</li>
                <li>• Static site generation</li>
                <li>• Container deployment (Docker)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
        <Link 
          href="/routing"
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Previous: Routing
        </Link>
        
        <Link 
          href="/playground"
          className="flex items-center text-blue-600 hover:text-blue-700"
        >
          Try the Playground
          <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
        </Link>
      </div>
    </div>
  );
}