import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CodeExample } from "@/components/CodeExample";

export default function UseMemoPage() {
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
          useMemo Hook
        </h1>
        <p className="text-xl text-muted-foreground">
          Learn how to optimize performance with useMemo by memoizing expensive calculations and preventing unnecessary re-computations.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">What is useMemo?</h2>
          <p className="text-muted-foreground mb-6">
            useMemo is a React Hook that lets you cache the result of expensive calculations between re-renders. 
            It only recalculates when one of its dependencies changes, improving performance by avoiding unnecessary computations.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Key Benefits</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Prevents expensive calculations on every render</li>
              <li>Improves performance for complex computations</li>
              <li>Reduces unnecessary work in React components</li>
              <li>Can prevent unnecessary re-renders of child components</li>
              <li>Optimizes memory usage for large data transformations</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Basic useMemo Usage</h2>
          <p className="text-muted-foreground mb-6">
            Here&apos;s a simple example showing how useMemo prevents expensive calculations:
          </p>
          
          <CodeExample
            title="Basic useMemo Example"
            code={`import { useState, useMemo } from 'react';

function ExpensiveCalculation({ number }) {
  // Simulate an expensive calculation
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.random() * number;
    }
    return result.toFixed(2);
  }, [number]); // Only recalculate when 'number' changes

  return (
    <div>
      <h3>Expensive Calculation Result</h3>
      <p>Result: {expensiveValue}</p>
    </div>
  );
}

function App() {
  const [number, setNumber] = useState(1);
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>useMemo Demo</h1>
      
      {/* This will trigger expensive calculation */}
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Number for calculation: 
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value) || 1)}
            style={{ marginLeft: '0.5rem', padding: '0.25rem' }}
          />
        </label>
      </div>

      {/* This will NOT trigger expensive calculation */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setCount(count + 1)}>
          Increment Count: {count}
        </button>
      </div>

      <ExpensiveCalculation number={number} />
      
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        Check the console - expensive calculation only runs when the number changes,
        not when the count changes!
      </p>
    </div>
  );
}

export default App;`}
            explanation="useMemo ensures the expensive calculation only runs when the 'number' dependency changes, not on every render."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Memoizing Complex Objects</h2>
          <p className="text-muted-foreground mb-6">
            useMemo is particularly useful for creating complex objects or arrays that would otherwise be recreated on every render:
          </p>
          
          <CodeExample
            title="Memoizing Objects and Arrays"
            code={`import { useState, useMemo } from 'react';

function UserDashboard({ users, searchTerm, sortBy }) {
  // Memoize filtered and sorted users
  const processedUsers = useMemo(() => {
    console.log('Processing users...');
    
    // Filter users by search term
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'joinDate':
          return new Date(a.joinDate) - new Date(b.joinDate);
        default:
          return 0;
      }
    });

    return filtered;
  }, [users, searchTerm, sortBy]); // Recalculate when any of these change

  // Memoize user statistics
  const userStats = useMemo(() => {
    console.log('Calculating user stats...');
    
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.isActive).length;
    const premiumUsers = users.filter(user => user.isPremium).length;
    
    const avgJoinDate = users.reduce((sum, user) => {
      return sum + new Date(user.joinDate).getTime();
    }, 0) / totalUsers;

    return {
      total: totalUsers,
      active: activeUsers,
      premium: premiumUsers,
      activePercentage: ((activeUsers / totalUsers) * 100).toFixed(1),
      premiumPercentage: ((premiumUsers / totalUsers) * 100).toFixed(1),
      avgJoinDate: new Date(avgJoinDate).toLocaleDateString()
    };
  }, [users]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Dashboard</h2>
      
      {/* User Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h3>Total Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{userStats.total}</p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h3>Active Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {userStats.active} ({userStats.activePercentage}%)
          </p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h3>Premium Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            {userStats.premium} ({userStats.premiumPercentage}%)
          </p>
        </div>
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
          <h3>Avg Join Date</h3>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{userStats.avgJoinDate}</p>
        </div>
      </div>

      {/* Filtered Users */}
      <div>
        <h3>Users ({processedUsers.length} found)</h3>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {processedUsers.map(user => (
            <div 
              key={user.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem',
                borderBottom: '1px solid #eee'
              }}
            >
              <div>
                <strong>{user.name}</strong>
                <br />
                <small>{user.email}</small>
              </div>
              <div>
                <span style={{ 
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  backgroundColor: user.isActive ? '#d4edda' : '#f8d7da',
                  color: user.isActive ? '#155724' : '#721c24',
                  marginRight: '0.5rem'
                }}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
                {user.isPremium && (
                  <span style={{ 
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: '#fff3cd',
                    color: '#856404'
                  }}>
                    Premium
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [refreshCount, setRefreshCount] = useState(0);

  // Sample user data
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', isActive: true, isPremium: true, joinDate: '2023-01-15' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', isActive: true, isPremium: false, joinDate: '2023-02-20' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', isActive: false, isPremium: true, joinDate: '2023-01-10' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', isActive: true, isPremium: true, joinDate: '2023-03-05' },
    { id: 5, name: 'Edward Norton', email: 'edward@example.com', isActive: false, isPremium: false, joinDate: '2023-02-28' }
  ];

  return (
    <div>
      <div style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <h1>User Management System</h1>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', flex: 1 }}
          />
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '0.5rem' }}
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="joinDate">Sort by Join Date</option>
          </select>
          
          <button onClick={() => setRefreshCount(c => c + 1)}>
            Refresh UI ({refreshCount})
          </button>
        </div>
      </div>

      <UserDashboard 
        users={users} 
        searchTerm={searchTerm} 
        sortBy={sortBy} 
      />
      
      <p style={{ padding: '1rem', fontSize: '0.9rem', color: '#666' }}>
        Check the console - processing only happens when users, searchTerm, or sortBy change!
      </p>
    </div>
  );
}

export default App;`}
            explanation="useMemo prevents expensive array processing and object creation, only recalculating when dependencies change."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Preventing Unnecessary Re-renders</h2>
          <p className="text-muted-foreground mb-6">
            useMemo can help prevent child components from re-rendering by memoizing objects passed as props:
          </p>
          
          <CodeExample
            title="Preventing Re-renders with useMemo"
            code={`import { useState, useMemo, memo } from 'react';

// Memoized child component that only re-renders when props change
const ExpensiveChildComponent = memo(({ data, config }) => {
  console.log('ExpensiveChildComponent rendered');
  
  // Simulate expensive rendering
  const processedData = data.map(item => ({
    ...item,
    processed: true,
    timestamp: Date.now()
  }));

  return (
    <div style={{ 
      border: '2px solid #007bff', 
      padding: '1rem', 
      margin: '1rem 0',
      borderRadius: '4px'
    }}>
      <h3>Expensive Child Component</h3>
      <p>Theme: {config.theme}</p>
      <p>Show Details: {config.showDetails ? 'Yes' : 'No'}</p>
      <p>Data items: {processedData.length}</p>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {processedData.map(item => (
          <div key={item.id} style={{ padding: '0.25rem' }}>
            {item.name} - {config.showDetails ? item.description : ''}
          </div>
        ))}
      </div>
    </div>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');
  const [showDetails, setShowDetails] = useState(false);
  const [dataVersion, setDataVersion] = useState(1);

  // Sample data that changes only when dataVersion changes
  const data = useMemo(() => {
    console.log('Creating data...');
    return [
      { id: 1, name: 'Product A', description: 'High-quality product A' },
      { id: 2, name: 'Product B', description: 'Reliable product B' },
      { id: 3, name: 'Product C', description: 'Innovative product C' },
      { id: 4, name: 'Product D', description: 'Affordable product D' },
      { id: 5, name: 'Product E', description: 'Premium product E' }
    ].map(item => ({ ...item, version: dataVersion }));
  }, [dataVersion]);

  // Memoize config object to prevent unnecessary re-renders
  const config = useMemo(() => {
    console.log('Creating config...');
    return {
      theme,
      showDetails,
      version: '1.0'
    };
  }, [theme, showDetails]);

  // Without useMemo - this would create a new object on every render
  // const config = {
  //   theme,
  //   showDetails,
  //   version: '1.0'
  // };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>useMemo Re-render Prevention Demo</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Controls</h2>
        
        {/* This will NOT cause ExpensiveChildComponent to re-render */}
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => setCount(count + 1)}>
            Increment Count: {count}
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            This won't cause the child to re-render
          </p>
        </div>

        {/* These WILL cause ExpensiveChildComponent to re-render */}
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Toggle Theme: {theme}
          </button>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            style={{ marginLeft: '0.5rem' }}
          >
            Toggle Details: {showDetails ? 'ON' : 'OFF'}
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            These will cause the child to re-render (config changes)
          </p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <button onClick={() => setDataVersion(dataVersion + 1)}>
            Update Data Version: {dataVersion}
          </button>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            This will cause the child to re-render (data changes)
          </p>
        </div>
      </div>

      <ExpensiveChildComponent data={data} config={config} />
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px' 
      }}>
        <h3>Performance Insights</h3>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          Check the console to see when components re-render. The ExpensiveChildComponent 
          only re-renders when its props actually change, not when the parent's count changes.
        </p>
      </div>
    </div>
  );
}

export default App;`}
            explanation="By memoizing the config object and data array, we prevent unnecessary re-renders of the child component."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Advanced useMemo Patterns</h2>
          <p className="text-muted-foreground mb-6">
            Here are some advanced patterns for using useMemo effectively:
          </p>
          
          <CodeExample
            title="Advanced useMemo Patterns"
            code={`import { useState, useMemo, useCallback } from 'react';

function AdvancedMemoDemo() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    inStock: null
  });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // 1. Memoizing expensive calculations with multiple dependencies
  const processedData = useMemo(() => {
    console.log('Processing data with filters and sorting...');
    
    let filtered = data.filter(item => {
      const categoryMatch = !filters.category || item.category === filters.category;
      const priceMatch = item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1];
      const stockMatch = filters.inStock === null || item.inStock === filters.inStock;
      
      return categoryMatch && priceMatch && stockMatch;
    });

    // Sort the filtered data
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, filters, sortConfig]);

  // 2. Memoizing derived statistics
  const statistics = useMemo(() => {
    console.log('Calculating statistics...');
    
    if (data.length === 0) return null;

    const totalValue = data.reduce((sum, item) => sum + item.price, 0);
    const categories = [...new Set(data.map(item => item.category))];
    const inStockCount = data.filter(item => item.inStock).length;
    
    const categoryStats = categories.map(category => {
      const categoryItems = data.filter(item => item.category === category);
      return {
        category,
        count: categoryItems.length,
        avgPrice: categoryItems.reduce((sum, item) => sum + item.price, 0) / categoryItems.length,
        totalValue: categoryItems.reduce((sum, item) => sum + item.price, 0)
      };
    });

    return {
      totalItems: data.length,
      totalValue,
      averagePrice: totalValue / data.length,
      inStockPercentage: (inStockCount / data.length) * 100,
      categories: categoryStats
    };
  }, [data]);

  // 3. Memoizing complex search results
  const searchResults = useMemo(() => {
    console.log('Generating search results...');
    
    if (!processedData.length) return { results: [], suggestions: [] };

    // Create search index
    const searchIndex = processedData.map(item => ({
      id: item.id,
      searchText: \`\${item.name} \${item.category} \${item.description}\`.toLowerCase(),
      item
    }));

    // Generate suggestions based on categories
    const categoryGroups = processedData.reduce((groups, item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
      return groups;
    }, {});

    const suggestions = Object.entries(categoryGroups).map(([category, items]) => ({
      category,
      count: items.length,
      avgPrice: items.reduce((sum, item) => sum + item.price, 0) / items.length,
      topItems: items.slice(0, 3)
    }));

    return {
      results: searchIndex,
      suggestions,
      totalResults: processedData.length
    };
  }, [processedData]);

  // 4. Memoizing validation rules
  const validationRules = useMemo(() => {
    console.log('Creating validation rules...');
    
    return {
      price: (value) => {
        if (value < 0) return 'Price cannot be negative';
        if (value > 10000) return 'Price seems too high';
        return null;
      },
      category: (value) => {
        const validCategories = ['electronics', 'books', 'clothing', 'home', 'sports'];
        if (!validCategories.includes(value.toLowerCase())) {
          return \`Category must be one of: \${validCategories.join(', ')}\`;
        }
        return null;
      },
      name: (value) => {
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (value.length > 100) return 'Name must be less than 100 characters';
        return null;
      }
    };
  }, []); // No dependencies - rules don't change

  // Sample data initialization
  const initializeData = useCallback(() => {
    const sampleData = [
      { id: 1, name: 'Laptop Pro', category: 'electronics', price: 1299, inStock: true, description: 'High-performance laptop' },
      { id: 2, name: 'JavaScript Book', category: 'books', price: 39, inStock: true, description: 'Learn JavaScript fundamentals' },
      { id: 3, name: 'Running Shoes', category: 'sports', price: 129, inStock: false, description: 'Comfortable running shoes' },
      { id: 4, name: 'Coffee Maker', category: 'home', price: 89, inStock: true, description: 'Automatic coffee maker' },
      { id: 5, name: 'Wireless Mouse', category: 'electronics', price: 49, inStock: true, description: 'Ergonomic wireless mouse' }
    ];
    setData(sampleData);
  }, []);

  // Initialize data on mount
  useMemo(() => {
    if (data.length === 0) {
      initializeData();
    }
  }, [data.length, initializeData]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Advanced useMemo Patterns</h1>
      
      {/* Filters */}
      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
        <h3>Filters</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="books">Books</option>
            <option value="sports">Sports</option>
            <option value="home">Home</option>
          </select>
          
          <label>
            In Stock:
            <select
              value={filters.inStock === null ? '' : filters.inStock.toString()}
              onChange={(e) => setFilters(prev => ({ 
                ...prev, 
                inStock: e.target.value === '' ? null : e.target.value === 'true' 
              }))}
            >
              <option value="">All</option>
              <option value="true">In Stock</option>
              <option value="false">Out of Stock</option>
            </select>
          </label>
        </div>
      </div>

      {/* Statistics */}
      {statistics && (
        <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <h3>Statistics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>Total Items: {statistics.totalItems}</div>
            <div>Average Price: \${statistics.averagePrice.toFixed(2)}</div>
            <div>In Stock: {statistics.inStockPercentage.toFixed(1)}%</div>
            <div>Categories: {statistics.categories.length}</div>
          </div>
        </div>
      )}

      {/* Search Results Summary */}
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#e8f4f8', borderRadius: '4px' }}>
        <h3>Search Results</h3>
        <p>Found {searchResults.totalResults} items across {searchResults.suggestions.length} categories</p>
      </div>

      {/* Processed Data */}
      <div>
        <h3>Items ({processedData.length})</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {processedData.map(item => (
            <div 
              key={item.id} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '1rem', 
                border: '1px solid #ccc', 
                borderRadius: '4px' 
              }}
            >
              <div>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <small>{item.category}</small>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>\${item.price}</div>
                <div style={{ color: item.inStock ? 'green' : 'red' }}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#fff3cd', 
        borderRadius: '4px' 
      }}>
        <h4>Performance Notes</h4>
        <p style={{ fontSize: '0.9rem', margin: 0 }}>
          Check the console to see when each memoized calculation runs. Complex calculations 
          only execute when their specific dependencies change.
        </p>
      </div>
    </div>
  );
}

export default AdvancedMemoDemo;`}
            explanation="Advanced patterns show how to memoize complex calculations, derived state, and validation rules for optimal performance."
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">useMemo Best Practices</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-green-900 mb-2">✅ Do</h3>
              <ul className="text-green-800 text-sm space-y-1">
                <li>Use for expensive calculations and transformations</li>
                <li>Memoize objects/arrays passed to child components</li>
                <li>Include all dependencies in the dependency array</li>
                <li>Use with React.memo for child components</li>
                <li>Profile before and after to measure impact</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">❌ Don&apos;t</h3>
              <ul className="text-red-800 text-sm space-y-1">
                <li>Overuse it for simple calculations</li>
                <li>Memoize primitives (strings, numbers, booleans)</li>
                <li>Forget dependencies in the dependency array</li>
                <li>Use for one-time calculations</li>
                <li>Assume it always improves performance</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Link 
            href="/hooks/useReducer"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous: useReducer Hook
          </Link>
          
          <Link 
            href="/hooks/useCallback"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            Next: useCallback Hook
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}