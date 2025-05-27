import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar({ isDarkMode, toggleDarkMode }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gradient-to-r from-green-600 to-blue-600 p-4 shadow-md dark:bg-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">ITERA Event Hub</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-200">About</Link>
          {user ? (
            <>
              <Link to="/upload" className="text-white hover:text-gray-200">Upload</Link>
              <Link to="/profile" className="text-white hover:text-gray-200">Hi, {user.name}</Link>
              <button onClick={logout} className="text-white hover:text-gray-200">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
          )}
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 bg-itera-blue text-white rounded-full shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-itera-blue focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isDarkMode ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'}
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
