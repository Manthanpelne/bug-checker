import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import { clearStoredAuth, getStoredAuth } from './utils/auth';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginView, setIsLoginView] = useState(true); // New state to manage the view

  useEffect(() => {
    const auth = getStoredAuth();
    if (auth) {
      setUser(auth.user);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    clearStoredAuth();
    setUser(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoginView(true); // Reset to login view for consistency, although not strictly needed here
  };

  if (loading) {
    return (
      <div className='flex text-xl font-semibold items-center justify-center min-h-full'>
        Loading...
      </div>
    );
  }

  return (
    <div className="app">
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : isLoginView ? (
        <Login onLogin={handleLogin} onSwitchToRegister={() => setIsLoginView(false)} />
      ) : (
        <Register onLogin={handleLogin} onSwitchToLogin={() => setIsLoginView(true)} />
      )}
    </div>
  );
}

export default App;