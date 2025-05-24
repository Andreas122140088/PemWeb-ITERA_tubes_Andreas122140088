import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login({ isDarkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login, nanti ganti dengan Axios POST ke /login
    login({ name: 'User', email });
    navigate('/');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-itera-dark-bg' : 'bg-white'} transition-colors duration-300`}>
      <div className={`container p-6 max-w-md rounded-lg shadow-md ${isDarkMode ? 'bg-itera-dark-secondary text-white' : 'bg-white text-gray-900'}`}>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2">{isDarkMode ? 'Email' : 'text-gray-700'}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">{isDarkMode ? 'Password' : 'text-gray-700'}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded hover:bg-green-700 ${isDarkMode ? 'bg-green-600 text-white' : 'bg-green-600 text-white'}`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
