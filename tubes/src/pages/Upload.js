import React, { useState } from 'react';
// import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Upload({ isDarkMode }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [tanggalAcara, setTanggalAcara] = useState(''); // Add state for tanggal_acara
  const [jenisAcara, setJenisAcara] = useState(''); // Add state for jenis_acara
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => { // Make handleSubmit async
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tanggal_acara', tanggalAcara); // Append tanggal_acara
    formData.append('jenis_acara', jenisAcara); // Append jenis_acara
    if (image) {
      formData.append('image', image);
    }

    try {
      // Update the URL to point to the backend's upload route
      const response = await fetch('http://localhost:6543/api/acara', { // Update URL
        method: 'POST',
        body: formData,
        // fetch automatically sets Content-Type for FormData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      alert('Content uploaded successfully!'); // Show success message
      navigate('/'); // Redirect to home page after successful upload
    } catch (error) {
      console.error('Error uploading content:', error);
      alert('Error uploading content.'); // Show error message
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-itera-dark-bg' : 'bg-white'} transition-colors duration-300`}>
      <div className={`container p-6 max-w-md rounded-lg shadow-md ${isDarkMode ? 'bg-itera-dark-secondary text-white' : 'bg-white text-gray-900'}`}>
        <h1 className="text-2xl font-bold mb-6 text-center">Upload New Content</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`}
              rows="4"
              required
            ></textarea>
          </div>
          {/* Add input for Tanggal Acara */}
          <div>
            <label htmlFor="tanggal_acara" className="block mb-2">Tanggal Acara</label>
            <input
              type="date"
              id="tanggal_acara"
              value={tanggalAcara}
              onChange={(e) => setTanggalAcara(e.target.value)}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
              required
            />
          </div>
          {/* Add input for Jenis Acara */}
          <div>
            <label htmlFor="jenis_acara" className="block mb-2">Jenis Acara</label>
            <input
              type="text"
              id="jenis_acara"
              value={jenisAcara}
              onChange={(e) => setJenisAcara(e.target.value)}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block mb-2">Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded hover:bg-green-700 ${isDarkMode ? 'bg-green-600 text-white' : 'bg-green-600 text-white'}`}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;
