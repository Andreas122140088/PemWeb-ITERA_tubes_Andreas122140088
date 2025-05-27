import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'; // Import axios

function Login({ isDarkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();

    try {
      // Fetch all users from the list endpoint
      const response = await axios.get('http://localhost:6543/api/886920');
      const users = response.data.users; // Assuming the response has a 'users' key with an array of user objects

      // Find a user with matching email and password
      const foundUser = users.find(user => user.email === email && user.password === password);

      if (foundUser) {
        // Login successful
        setShowPopup(true); // Show popup on successful login
        // Store user data including id in auth context
        login({ id: foundUser.id, name: foundUser.nama, email: foundUser.email }); // Include user id
        // navigate('/'); // Navigate after a short delay or user interaction with popup
      } else {
        // Handle login failure (e.g., invalid credentials)
        alert('Invalid email or password');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  // Optional: Function to close popup and navigate
  const handlePopupClose = () => {
    setShowPopup(false);
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

      {/* Web-based popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`p-8 max-w-sm mx-auto rounded-lg shadow-lg text-center ${isDarkMode ? 'bg-itera-dark-secondary text-white' : 'bg-white text-gray-900'}`}>
            <h2 className="text-2xl font-bold mb-4">berhasil login</h2>
            {/* Optional: Add a button to close the popup and navigate */}
            <button
              onClick={handlePopupClose}
              className={`mt-4 px-6 py-2 rounded ${isDarkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
