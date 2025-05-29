import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AcaraDetail() {
  const { id } = useParams();
  const [acara, setAcara] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Use AuthContext
  const navigate = useNavigate(); // Use useNavigate for redirection

  useEffect(() => {
    const fetchAcaraDetail = async () => {
      try {
        const response = await fetch(`http://localhost:6543/api/acara/${id}`); // Use full URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAcara(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcaraDetail();
  }, [id]); // Re-run effect if id changes

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`http://localhost:6543/api/acara/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // Include authorization header if your backend requires it
            // 'Authorization': `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Redirect to home or events list page after successful deletion
        navigate('/'); // Redirect to home page

      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event.' + error.message);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error.message}</div>;
  }

  if (!acara) {
    return <div className="flex justify-center items-center h-screen">Acara not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 pt-16">
      {/* Navbar is rendered in App.js */}
      <div className="container mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800 dark:text-white">{acara.judul}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-center">Date: {acara.tanggal_acara}</p>
        <div className="flex justify-center mb-6">
          <img src={`http://localhost:6543${acara.gambar_file}`} alt={acara.judul} className="w-full max-w-lg h-auto object-cover rounded-lg shadow" />
        </div>
        <div className="prose dark:prose-invert max-w-none leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: acara.konten }}></div>
        </div>

        {/* Conditional rendering of delete button */}
        {user && user.email === 'andreas.122140088@student.itera.ac.id' && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Hapus Acara
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AcaraDetail;
