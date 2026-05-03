import './index.css';
import React, { useState } from 'react';
import { Dashboard } from './pages/dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-bb-amarelo">
      <Dashboard />
    </div>
  );
}

export default App;