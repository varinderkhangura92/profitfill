import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <main>
          {/* Include your Dashboard component */}
          <Dashboard />
      </main>
    </div>
  );
}

export default App;
