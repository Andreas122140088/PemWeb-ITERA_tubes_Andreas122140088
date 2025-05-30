import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import EventFilter from '../components/EventFilter';

function Home({ isDarkMode }) {
  const [events, setEvents] = useState([]); // Initialize with empty array
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [sortBy, setSortBy] = useState('date-asc');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch data from backend using fetch API
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:6543/api/acara'); // Use fetch with full backend URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Map backend data to match frontend structure if necessary
        const fetchedContent = data.map(item => ({
          id: item.id,
          title: item.judul || item.title || item.name || 'No Title', // Use judul, then title, then name, then default
          description: item.konten ? `${item.konten.substring(0, 150)}${item.konten.length > 150 ? '...' : ''}` : item.description ? `${item.description.substring(0, 150)}${item.description.length > 150 ? '...' : ''}` : 'No description available.', // Use konten, then description snippet, then default
          // Use gambar_file from backend and prepend the static URL
          poster: item.gambar_file ? `http://localhost:6543/${item.gambar_file}` : null, // Use gambar_file
          date: item.tanggal_acara || item.date || item.event_date || 'N/A', // Use tanggal_acara, then date, then event_date, then default
          categories: Array.isArray(item.jenis_acara) ? item.jenis_acara : (item.jenis_acara ? [item.jenis_acara] : (Array.isArray(item.categories) ? item.categories : (item.categories ? [item.categories] : ['Uploaded']))), // Ensure categories is always an array
        }));
        setEvents(fetchedContent); // Replace dummy data with fetched data
      } catch (error) {
        console.error('Error fetching content:', error);
        // Optionally keep dummy data or show an error message
        // setEvents([...dummyEvents]); // Uncomment to keep dummy data on error
      }
    };

    fetchContent();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    let updatedEvents = [...events];

    if (selectedCategories.length > 0) {
      updatedEvents = updatedEvents.filter(event =>
        event.categories.some(cat => selectedCategories.includes(cat))
      );
    }

    if (sortBy === 'date-asc') {
      updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'date-desc') {
      updatedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'title-asc') {
      updatedEvents.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
      updatedEvents.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredEvents(updatedEvents);
  }, [sortBy, selectedCategories, events]); // Add events to dependency array

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-itera-dark-bg' : 'bg-white'} transition-colors duration-300 flex flex-col`}>
      <button
        onClick={toggleSidebar}
        className="fixed top-3 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        aria-label={isSidebarOpen ? 'Tutup sidebar' : 'Buka sidebar'}
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
            d={isSidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
        [Filter]
      </button>

      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 ${isDarkMode ? 'bg-itera-dark-secondary' : 'bg-white'} shadow-lg p-6 z-40 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r-2 border-green-600 overflow-y-auto`}
      >
        <EventFilter
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </aside>

      <div
        className={`p-6 pt-24 md:pt-20 transition-all duration-300 flex-grow ${
          isSidebarOpen ? 'ml-64 md:ml-1/4' : 'ml-0'
        }`}
      >
        <div className="container mx-auto">
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-itera-dark-text' : 'text-gray-800'} mb-6 text-center`}>
            Acara Kampus ITERA
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <p className={`text-center col-span-full ${isDarkMode ? 'text-itera-dark-text' : 'text-gray-600'}`}>Tidak ada acara ditemukan.</p>
            ) : (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} isDarkMode={isDarkMode} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
