import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

function Profile({ isDarkMode }) {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      axios.get('http://localhost:6543/api/886920')
        .then(response => {
          const foundUser = response.data.users.find(u => u.id === user.id);
          if (foundUser) {
            setUserInfo(foundUser);
          } else {
            setError('User not found');
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to fetch user info');
          setLoading(false);
        });
    } else {
      setError('User not logged in');
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div className={isDarkMode ? 'text-white' : 'text-black'}>Loading...</div>;
  }

  if (error) {
    return <div className={isDarkMode ? 'text-white' : 'text-black'}>{error}</div>;
  }

  if (!userInfo) {
    return <div className={isDarkMode ? 'text-white' : 'text-black'}>No user info available</div>;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-itera-dark-bg' : 'bg-white'} transition-colors duration-300 p-4`}>
      <div className={`container p-8 max-w-lg rounded-xl shadow-lg ${isDarkMode ? 'bg-itera-dark-secondary text-white' : 'bg-white text-gray-900'}`}>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-1">{userInfo.nama}</h2>
          <p className="text-gray-500 text-sm">{userInfo.email}</p>
        </div>
        <hr className="my-6 border-gray-300 dark:border-gray-500" />
        <div className="space-y-4 mx-auto max-w-fit">
          <div className="grid grid-cols-[140px_auto] items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <span className="font-medium text-gray-600 dark:text-gray-400 mr-4">NIM  :</span>
            <span>{userInfo.nim}</span>
          </div>
          <div className="grid grid-cols-[140px_auto] items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <span className="font-medium text-gray-600 dark:text-gray-400 mr-4">Prodi  :</span>
            <span>{userInfo.jurusan}</span>
          </div>
          <div className="grid grid-cols-[140px_auto] items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <span className="font-medium text-gray-600 dark:text-gray-400 mr-4">Tanggal Lahir  :</span>
            <span>{userInfo.tanggal_lahir}</span>
          </div>
          <div className="grid grid-cols-[140px_auto] items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <span className="font-medium text-gray-600 dark:text-gray-400 mr-4">Alamat :</span>
            <span>{userInfo.alamat}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
