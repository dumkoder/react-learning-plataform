import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function ReactDOMPage() {
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
          React DOM
        </h1>
        <p className="text-xl text-muted-foreground">
          Understand how React interacts with the DOM, the rendering process, and DOM manipulation patterns.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is React DOM?</h2>
          <p className="text-muted-foreground mb-6">
            React DOM is the package that provides DOM-specific methods for React. It serves as the bridge between 
            React components and the browser's DOM. React DOM handles rendering React elements to the DOM and 
            managing updates efficiently through its reconciliation process.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Key Concepts</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>React DOM renders React elements to the browser DOM</li>
              <li>Virtual DOM provides efficient updates through diffing</li>
              <li>ReactDOM.render() is the entry point for React applications</li>
              <li>React 18 introduces ReactDOM.createRoot() for concurrent features</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Rendering to the DOM</h2>
          <p className="text-muted-foreground mb-6">
            Here's how to render React components to the DOM:
          </p>
          
          <CodeExample
            title="Basic DOM Rendering"
            code={`// React 18+ (Current approach)
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// React 17 and earlier (Legacy)
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// Example App component
function App() {
  return (
    <div className="app">
      <header>
        <h1>Welcome to React</h1>
      </header>
      <main>
        <p>This content is rendered to the DOM by React.</p>
      </main>
    </div>
  );
}

export default App;`}
            explanation="React 18 introduces createRoot for better concurrent features and improved performance."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">The Virtual DOM</h2>
          <p className="text-muted-foreground mb-6">
            React uses a Virtual DOM to optimize rendering performance:
          </p>
          
          <CodeExample
            title="Virtual DOM Concept"
            code={`// When you write JSX like this:
function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// React creates a virtual DOM representation like this:
const virtualElement = {
  type: 'div',
  props: {
    className: 'user-card',
    children: [
      {
        type: 'img',
        props: {
          src: user.avatar,
          alt: user.name
        }
      },
      {
        type: 'h2',
        props: {
          children: user.name
        }
      },
      {
        type: 'p',
        props: {
          children: user.email
        }
      }
    ]
  }
};

// React then:
// 1. Compares the new virtual DOM with the previous virtual DOM
// 2. Calculates the minimal set of changes needed
// 3. Updates only the changed parts in the real DOM

// Example of efficient updates
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>My App</h1>
      <p>Count: {count}</p> {/* Only this updates when count changes */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <footer>© 2023 My Company</footer> {/* This never re-renders */}
    </div>
  );
}`}
            explanation="The Virtual DOM allows React to make minimal, efficient updates to the real DOM."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">DOM Refs and Direct Access</h2>
          <p className="text-muted-foreground mb-6">
            Sometimes you need direct access to DOM elements. React provides refs for this purpose:
          </p>
          
          <CodeExample
            title="Using Refs for DOM Access"
            code={`import { useRef, useEffect, useState } from 'react';

function InputFocus() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current.focus();
  }, []);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="This input will be focused on mount"
      />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

function ScrollToTop() {
  const contentRef = useRef(null);

  const scrollToTop = () => {
    contentRef.current.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <button onClick={scrollToTop}>Scroll to Top</button>
      <div 
        ref={contentRef}
        style={{ height: '200px', overflow: 'auto' }}
      >
        {/* Long content here */}
        {Array.from({ length: 100 }, (_, i) => (
          <p key={i}>Line {i + 1}</p>
        ))}
      </div>
    </div>
  );
}

function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}`}
            explanation="Use refs to access DOM elements directly for focus management, scrolling, media controls, and other imperative operations."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Portals</h2>
          <p className="text-muted-foreground mb-6">
            Portals provide a way to render children into a different part of the DOM tree:
          </p>
          
          <CodeExample
            title="Using React Portals"
            code={`import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

// Modal component using portals
function Modal({ children, isOpen, onClose }) {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    // Create or get the modal root element
    let modalDiv = document.getElementById('modal-root');
    if (!modalDiv) {
      modalDiv = document.createElement('div');
      modalDiv.id = 'modal-root';
      document.body.appendChild(modalDiv);
    }
    setModalRoot(modalDiv);

    // Cleanup on unmount
    return () => {
      if (modalDiv && modalDiv.children.length === 0) {
        document.body.removeChild(modalDiv);
      }
    };
  }, []);

  useEffect(() => {
    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

// Tooltip component using portals
function Tooltip({ children, content, position = 'top' }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.target.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setShowTooltip(true);
  };

  const tooltipRoot = document.body;

  return (
    <>
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </span>
      
      {showTooltip && createPortal(
        <div
          className="tooltip"
          style={{
            position: 'fixed',
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translateX(-50%)',
            zIndex: 9999
          }}
        >
          {content}
        </div>,
        tooltipRoot
      )}
    </>
  );
}

// Usage example
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app">
      <h1>Main App Content</h1>
      
      <Tooltip content="This is a helpful tooltip">
        <button>Hover me for tooltip</button>
      </Tooltip>

      <button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Modal Title</h2>
        <p>This modal is rendered outside the main app tree using portals!</p>
        <p>It can still receive props and maintain React's component model.</p>
      </Modal>
    </div>
  );
}`}
            explanation="Portals are useful for modals, tooltips, and other UI elements that need to break out of their parent's DOM hierarchy."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">DOM Event Handling</h2>
          <p className="text-muted-foreground mb-6">
            React provides a synthetic event system that wraps native DOM events:
          </p>
          
          <CodeExample
            title="Event Handling Patterns"
            code={`function EventExamples() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Synthetic event handling
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Preventing default behavior
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  // Event delegation pattern
  const handleButtonClick = (e) => {
    const action = e.target.dataset.action;
    switch (action) {
      case 'save':
        console.log('Saving...');
        break;
      case 'cancel':
        console.log('Cancelling...');
        break;
      case 'delete':
        if (confirm('Are you sure?')) {
          console.log('Deleting...');
        }
        break;
    }
  };

  // Keyboard event handling
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
    if (e.key === 'Escape') {
      setFormData({ name: '', email: '', message: '' });
    }
  };

  // Mouse event handling
  const handleMouseEvents = {
    onMouseEnter: (e) => {
      e.target.style.backgroundColor = '#f0f0f0';
    },
    onMouseLeave: (e) => {
      e.target.style.backgroundColor = '';
    },
    onDoubleClick: (e) => {
      e.target.select();
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          {...handleMouseEvents}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
        />
      </div>

      <div onClick={handleButtonClick}>
        <button type="submit" data-action="save">
          Save (Ctrl+Enter)
        </button>
        <button type="button" data-action="cancel">
          Cancel
        </button>
        <button type="button" data-action="delete">
          Delete
        </button>
      </div>

      <p>Press Escape to clear form, Ctrl+Enter to submit</p>
    </form>
  );
}

// Advanced event handling with custom hooks
function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

function WindowEventsExample() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEventListener('resize', () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  });

  useEventListener('mousemove', (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  });

  return (
    <div>
      <p>Window size: {windowSize.width} x {windowSize.height}</p>
      <p>Mouse position: {mousePosition.x}, {mousePosition.y}</p>
    </div>
  );
}`}
            explanation="React's synthetic events provide consistent behavior across browsers and integrate well with React's component model."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">React DOM Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Use React 18's createRoot for new applications</li>
                <li>Use refs sparingly and only when necessary</li>
                <li>Clean up event listeners and subscriptions</li>
                <li>Use portals for modals and overlays</li>
                <li>Trust React's reconciliation process</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don't</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Manipulate DOM directly when React can handle it</li>
                <li>Use findDOMNode (deprecated)</li>
                <li>Access DOM elements before they're mounted</li>
                <li>Forget to clean up refs and event listeners</li>
                <li>Mix jQuery or other DOM libraries carelessly</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Complete Example</h2>
          <p className="text-muted-foreground mb-6">
            A complete example showing various React DOM concepts in a drag-and-drop interface:
          </p>
          
          <CodeExample
            title="Drag and Drop with React DOM"
            code={`import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

function DragDropExample() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', x: 50, y: 50 },
    { id: 2, text: 'Item 2', x: 150, y: 50 },
    { id: 3, text: 'Item 3', x: 250, y: 50 }
  ]);
  
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseDown = useCallback((e, item) => {
    const rect = e.target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    setDraggedItem(item);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    const handleMouseMove = (e) => {
      const newX = e.clientX - containerRect.left - dragOffset.x;
      const newY = e.clientY - containerRect.top - dragOffset.y;

      setItems(prevItems =>
        prevItems.map(i =>
          i.id === item.id
            ? { ...i, x: Math.max(0, newX), y: Math.max(0, newY) }
            : i
        )
      );
    };

    const handleMouseUp = () => {
      setDraggedItem(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [dragOffset.x, dragOffset.y]);

  const handleDoubleClick = (item) => {
    const newText = prompt('Enter new text:', item.text);
    if (newText) {
      setItems(prevItems =>
        prevItems.map(i =>
          i.id === item.id ? { ...i, text: newText } : i
        )
      );
    }
  };

  const addNewItem = () => {
    const newItem = {
      id: Date.now(),
      text: \`Item \${items.length + 1}\`,
      x: Math.random() * 300,
      y: Math.random() * 200
    };
    setItems(prevItems => [...prevItems, newItem]);
  };

  const deleteItem = (itemId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="drag-drop-container">
      <div className="controls">
        <button onClick={addNewItem}>Add New Item</button>
        <p>Double-click items to edit, drag to move</p>
      </div>

      <div
        ref={containerRef}
        className="drop-zone"
        style={{
          position: 'relative',
          width: '600px',
          height: '400px',
          border: '2px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        {items.map(item => (
          <div
            key={item.id}
            className="draggable-item"
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              padding: '8px 12px',
              backgroundColor: draggedItem?.id === item.id ? '#e3f2fd' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'move',
              userSelect: 'none',
              boxShadow: draggedItem?.id === item.id 
                ? '0 4px 8px rgba(0,0,0,0.2)' 
                : '0 2px 4px rgba(0,0,0,0.1)'
            }}
            onMouseDown={(e) => handleMouseDown(e, item)}
            onDoubleClick={() => handleDoubleClick(item)}
          >
            {item.text}
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteItem(item.id);
              }}
              style={{
                marginLeft: '8px',
                fontSize: '12px',
                color: '#ff4444'
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Portal for drag preview or tooltips could go here */}
      {draggedItem && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
            padding: '8px',
            backgroundColor: '#333',
            color: 'white',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 1000
          }}
        >
          Dragging: {draggedItem.text}
        </div>,
        document.body
      )}
    </div>
  );
}

export default DragDropExample;`}
            explanation="This example demonstrates refs for DOM measurements, event handling, portals for UI feedback, and direct DOM manipulation when needed."
          />
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/fundamentals/composition"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: Component Composition
          </Link>
          
          <Link 
            href="/fundamentals/forms"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: Forms and Events
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}