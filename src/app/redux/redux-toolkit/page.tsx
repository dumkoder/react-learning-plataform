import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function ReduxToolkitPage() {
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
          Redux Toolkit (RTK)
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn modern Redux with Redux Toolkit - the official, opinionated, batteries-included toolset for efficient Redux development.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is Redux Toolkit?</h2>
          <p className="text-muted-foreground mb-6">
            Redux Toolkit (RTK) is the official, recommended way to write Redux logic. It includes utilities that 
            simplify the most common Redux use cases, reduce boilerplate, prevent common mistakes, and make Redux 
            code more readable.
          </p>
          
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-indigo-900 mb-2">Why Use Redux Toolkit?</h3>
            <ul className="list-disc list-inside text-indigo-800 space-y-1">
              <li><strong>Less Boilerplate:</strong> Dramatically reduces the amount of code you need to write</li>
              <li><strong>Immutability:</strong> Uses Immer under the hood for safe state mutations</li>
              <li><strong>DevTools:</strong> Redux DevTools extension configured by default</li>
              <li><strong>Best Practices:</strong> Encourages good Redux patterns and architecture</li>
              <li><strong>TypeScript:</strong> Excellent TypeScript support out of the box</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Setting Up Redux Toolkit</h2>
          <p className="text-muted-foreground mb-6">
            Getting started with Redux Toolkit in a React application:
          </p>
          
          <CodeExample
            title="Installation and Setup"
            code={`# Install Redux Toolkit and React-Redux
npm install @reduxjs/toolkit react-redux

# Or with yarn
yarn add @reduxjs/toolkit react-redux

# For TypeScript projects
npm install @reduxjs/toolkit react-redux @types/react-redux`}
            explanation="Redux Toolkit includes Redux core, Immer, Redux Thunk, and other useful packages."
          />

          <CodeExample
            title="Basic Store Setup"
            code={`// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counterSlice';
import todoSlice from './features/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    todos: todoSlice
  },
  // Redux DevTools, middleware, and other enhancements are included by default
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}
            explanation="configureStore automatically sets up the Redux DevTools, middleware, and combines reducers."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Creating Slices</h2>
          <p className="text-muted-foreground mb-6">
            The heart of Redux Toolkit is createSlice, which generates action creators and reducers together:
          </p>
          
          <CodeExample
            title="Counter Slice Example"
            code={`// features/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers
    // It doesn't actually mutate the state because it uses the Immer library
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
      state.status = 'idle';
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export the reducer
export default counterSlice.reducer;

// Selectors can be defined here and exported for reuse
export const selectCount = (state) => state.counter.value;
export const selectStatus = (state) => state.counter.status;`}
            explanation="createSlice automatically generates action creators and action types based on reducer names."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Complex State Management</h2>
          <p className="text-muted-foreground mb-6">
            Redux Toolkit excels at managing complex state with nested objects and arrays:
          </p>
          
          <CodeExample
            title="Todo Slice with Complex Operations"
            code={`// features/todoSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  filter: 'all', // 'all' | 'active' | 'completed'
  loading: false,
  error: null
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Add a new todo
    addTodo: {
      reducer: (state, action) => {
        state.todos.push(action.payload);
      },
      // Prepare callback to customize the action payload
      prepare: (text) => ({
        payload: {
          id: nanoid(),
          text,
          completed: false,
          createdAt: new Date().toISOString()
        }
      })
    },
    
    // Toggle todo completion
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    
    // Edit todo text
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        todo.text = text;
        todo.updatedAt = new Date().toISOString();
      }
    },
    
    // Delete todo
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    
    // Clear completed todos
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    
    // Set filter
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    
    // Bulk operations
    toggleAll: (state) => {
      const allCompleted = state.todos.every(todo => todo.completed);
      state.todos.forEach(todo => {
        todo.completed = !allCompleted;
      });
    },
    
    // Reorder todos (for drag and drop)
    reorderTodos: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const result = Array.from(state.todos);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      state.todos = result;
    }
  }
});

export const {
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
  clearCompleted,
  setFilter,
  toggleAll,
  reorderTodos
} = todoSlice.actions;

// Complex selectors
export const selectAllTodos = (state) => state.todos.todos;
export const selectFilter = (state) => state.todos.filter;

export const selectFilteredTodos = (state) => {
  const todos = selectAllTodos(state);
  const filter = selectFilter(state);
  
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

export const selectTodoStats = (state) => {
  const todos = selectAllTodos(state);
  return {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  };
};

export default todoSlice.reducer;`}
            explanation="Redux Toolkit's Immer integration allows you to write code that looks like mutations but creates immutable updates."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Async Operations with createAsyncThunk</h2>
          <p className="text-muted-foreground mb-6">
            Redux Toolkit provides createAsyncThunk for handling async operations like API calls:
          </p>
          
          <CodeExample
            title="Async Thunks for API Calls"
            code={`// features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching user data
export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating user
export const updateUser = createAsyncThunk(
  'users/update',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await fetch(\`/api/users/\${id}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: {},
  loading: false,
  error: null
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  // Handle async thunk actions
  extraReducers: (builder) => {
    builder
      // Fetch user cases
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users[action.payload.id] = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update user cases
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users[action.payload.id] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = userSlice.actions;

// Selectors
export const selectUserById = (state, userId) => state.users.users[userId];
export const selectUserLoading = (state) => state.users.loading;
export const selectUserError = (state) => state.users.error;

export default userSlice.reducer;`}
            explanation="createAsyncThunk automatically generates pending, fulfilled, and rejected action types and creators."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Using Redux Toolkit in React</h2>
          <p className="text-muted-foreground mb-6">
            Connecting Redux Toolkit to React components with modern patterns:
          </p>
          
          <CodeExample
            title="React Component with Redux Toolkit"
            code={`// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import TodoApp from './components/TodoApp';

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  );
}

export default App;

// hooks/redux.js - Typed hooks for better TypeScript support
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// components/TodoApp.js
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  setFilter,
  selectFilteredTodos,
  selectTodoStats
} from '../features/todoSlice';

function TodoApp() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectFilteredTodos);
  const stats = useAppSelector(selectTodoStats);
  const filter = useAppSelector(state => state.todos.filter);
  
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      dispatch(addTodo(newTodoText));
      setNewTodoText('');
    }
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="todo-app">
      <h1>Redux Toolkit Todo App</h1>
      
      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button type="submit">Add Todo</button>
      </form>

      {/* Stats */}
      <div className="stats">
        <span>Total: {stats.total}</span>
        <span>Active: {stats.active}</span>
        <span>Completed: {stats.completed}</span>
      </div>

      {/* Filter Buttons */}
      <div className="filters">
        {['all', 'active', 'completed'].map(filterOption => (
          <button
            key={filterOption}
            onClick={() => handleFilterChange(filterOption)}
            className={filter === filterOption ? 'active' : ''}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;`}
            explanation="Redux Toolkit integrates seamlessly with React using the same useSelector and useDispatch hooks."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">RTK Query for Data Fetching</h2>
          <p className="text-muted-foreground mb-6">
            RTK Query is a powerful data fetching and caching solution built on top of Redux Toolkit:
          </p>
          
          <CodeExample
            title="RTK Query API Slice"
            code={`// api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      // Add auth token if available
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', \`Bearer \${token}\`);
      }
      return headers;
    }
  }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    // Query endpoints (for fetching data)
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post']
    }),
    
    getPost: builder.query({
      query: (id) => \`/posts/\${id}\`,
      providesTags: (result, error, id) => [{ type: 'Post', id }]
    }),
    
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User']
    }),
    
    // Mutation endpoints (for creating/updating/deleting data)
    addPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost
      }),
      invalidatesTags: ['Post']
    }),
    
    updatePost: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: \`/posts/\${id}\`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }]
    }),
    
    deletePost: builder.mutation({
      query: (id) => ({
        url: \`/posts/\${id}\`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Post']
    })
  })
});

// Export hooks for usage in functional components
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUsersQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = apiSlice;

// Using RTK Query in a component
import React from 'react';
import {
  useGetPostsQuery,
  useAddPostMutation,
  useDeletePostMutation
} from '../api/apiSlice';

function PostsList() {
  const {
    data: posts,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch
  } = useGetPostsQuery();
  
  const [addPost, { isLoading: isAdding }] = useAddPostMutation();
  const [deletePost] = useDeletePostMutation();

  const handleAddPost = async () => {
    try {
      await addPost({
        title: 'New Post',
        body: 'Post content',
        userId: 1
      }).unwrap();
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id).unwrap();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={handleAddPost} disabled={isAdding}>
        {isAdding ? 'Adding...' : 'Add Post'}
      </button>
      
      <button onClick={refetch}>Refresh</button>
      
      {isSuccess && (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <button onClick={() => handleDeletePost(post.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`}
            explanation="RTK Query provides hooks that handle loading states, caching, and automatic re-fetching."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Redux Toolkit Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Use createSlice for all reducers</li>
                <li>Use createAsyncThunk for async logic</li>
                <li>Write &quot;mutative&quot; logic in reducers (Immer handles immutability)</li>
                <li>Use RTK Query for data fetching</li>
                <li>Keep slices focused on single domains</li>
                <li>Use prepare callbacks for complex action payloads</li>
                <li>Define selectors alongside slices</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don&apos;t</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Mix RTK with legacy Redux patterns</li>
                <li>Put non-serializable data in state</li>
                <li>Create too many small slices</li>
                <li>Ignore TypeScript integration</li>
                <li>Use createSlice for very simple state</li>
                <li>Forget to handle async thunk states</li>
                <li>Bypass RTK Query for API calls</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/redux/react-redux"
            className="flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: React Redux
          </Link>
          
          <Link 
            href="/redux/async-flow"
            className="flex items-center text-indigo-600 hover:text-indigo-700"
          >
            Next: Redux Async Flow
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}