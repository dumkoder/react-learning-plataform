'use client'

import { useState } from 'react'
import { Play, RotateCcw, BookOpen } from 'lucide-react'
import { CodeEditor } from '@/components/CodeEditor'
import { CodePreview } from '@/components/CodePreview'

const defaultCode = `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('World');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Hello, {name}!</h1>
      
      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Count: {count}
        </button>
        
        <button 
          onClick={() => setCount(0)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
      
      <div style={{ margin: '20px 0' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Change greeting name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '200px'
          }}
        />
      </div>
      
      <p style={{ color: '#666' }}>
        This is a simple React component demonstrating state management with hooks!
      </p>
    </div>
  );
}

export default App;`

const examples = [
  {
    title: 'Hello World',
    description: 'Basic React component',
    code: `import React from 'react';

function App() {
  return <h1>Hello, World!</h1>;
}

export default App;`
  },
  {
    title: 'Counter with State',
    description: 'Using useState hook',
    code: defaultCode
  },
  {
    title: 'Todo List',
    description: 'Managing a list with state',
    code: `import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Todo List</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginRight: '10px',
            width: '250px'
          }}
        />
        <button 
          onClick={addTodo}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            style={{ 
              padding: '10px',
              margin: '5px 0',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#6c757d' : '#000'
            }}>
              {todo.text}
            </span>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && (
        <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
}

export default App;`
  }
]

export default function PlaygroundPage() {
  const [code, setCode] = useState(defaultCode)
  const [selectedExample, setSelectedExample] = useState(1)

  const handleRunCode = () => {
    // Code execution is handled by the CodePreview component
    console.log('Running code...')
  }

  const handleReset = () => {
    setCode(examples[selectedExample].code)
  }

  const loadExample = (index: number) => {
    setSelectedExample(index)
    setCode(examples[index].code)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          React Playground
        </h1>
        <p className="text-xl text-gray-600">
          Write and test React code in real-time. Experiment with components, hooks, and React patterns.
        </p>
      </div>

      {/* Examples */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Examples:</h2>
        <div className="flex flex-wrap gap-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => loadExample(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedExample === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            onClick={handleRunCode}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Play className="h-4 w-4 mr-2" />
            Run Code
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </button>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <BookOpen className="h-4 w-4 mr-1" />
          <span>Live React Environment</span>
        </div>
      </div>

      {/* Editor and Preview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Code Editor</h3>
          <CodeEditor 
            value={code}
            onChange={setCode}
            language="javascript"
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
          <CodePreview code={code} />
        </div>
      </div>

      {/* Tips */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for Using the Playground</h3>
        <ul className="list-disc list-inside text-blue-800 space-y-1 text-sm">
          <li>Import React and any hooks you need at the top of your component</li>
          <li>Your component should be the default export</li>
          <li>Use inline styles or CSS classes for styling</li>
          <li>Try experimenting with different React hooks and patterns</li>
          <li>The preview updates automatically as you type</li>
          <li>Check the browser console for any errors</li>
        </ul>
      </div>
    </div>
  )
}