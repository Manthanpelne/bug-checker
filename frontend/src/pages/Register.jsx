import { useState } from 'react';
import { register } from '../utils/api';
import { storeAuth } from '../utils/auth';


function Register({ onLogin, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await register(formData);
      storeAuth(response.token, response.user);
      onLogin(response.user);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="flex flex-col items-center min-h-screen justify-center p-4 bg-slate-50">
      <form className="bg-white p-8 rounded-lg border border-gray-200 w-full max-w-sm" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Register for Bug Tracker</h1>
        
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
        
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base transition-colors duration-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-base transition-colors duration-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">Password</label>
          <div className="flex items-center gap-2">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-base transition-colors duration-200 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="p-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5"
              >
                {showPassword ? (
                  <path d="M12 4.5c-6.63 0-12 7.02-12 7.02s5.37 7.02 12 7.02 12-7.02 12-7.02S18.63 4.5 12 4.5zm0 11.02c-2.48 0-4.5-2.02-4.5-4.5s2.02-4.5 4.5-4.5 4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zM12 9c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" />
                ) : (
                  <path d="M12 7.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5 4.5-2.02 4.5-4.5-2.02-4.5-4.5-4.5zm0 8.02c-1.94 0-3.5-1.56-3.5-3.5s1.56-3.5 3.5-3.5 3.5 1.56 3.5 3.5-1.56 3.5-3.5 3.5zM21.92 11.53c-.2-.2-.49-.3-.78-.3-.29 0-.58.1-.78.3L19.26 13l-1.92-1.92c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3L15.3 12.5l-2.04-2.04c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3L10.74 12.5l-2.04-2.04c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3L6.2 12.5l-2.04-2.04c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3L2.24 12.5l-1.98-1.98c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3L.24 12.5l-1.98-1.98c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3L-4 12.5l-1.98-1.98c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3L-8.04 12.5l-1.98-1.98c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3L-12 12.5l-1.98-1.98c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3L-16.04 12.5l-1.98-1.98c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3L-20.04 12.5l-1.98-1.98c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3L-24 12.5l-1.98-1.98c-.2-.2-.49-.3-.78-.3s-.58.1-.78.3z" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <button 
          type="submit" 
          className={`w-full px-6 py-3 bg-blue-600 text-white rounded-md font-medium cursor-pointer transition-colors duration-200 hover:bg-blue-700 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={onSwitchToLogin}
        >
          Login here
        </button>
      </div>
    </div>
  );
}

export default Register;