import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import EventFilter from '../components/EventFilter';
import dummy from '../assets/pict/dummy.jpg';

function Home() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Seminar Teknik Informatika',
      description: 'Pelajari tren terbaru dalam AI dan cloud computing.',
      date: '2025-05-20',
      location: 'Aula ITERA',
      poster: [dummy],
      categories: ['Seminar', 'UKM'], // Multiple categories
    },
    {
      id: 2,
      title: 'Lomba Desain UKM',
      description: 'Tunjukkan kreativitasmu dalam lomba desain grafis.',
      date: '2025-05-25',
      location: 'Gedung Kuliah Umum',
      poster: [dummy],
      categories: ['Lomba'],
    },
    {
      id: 3,
      title: 'Pameran UKM ITERA',
      description: 'Jelajahi kegiatan dan karya UKM ITERA.',
      date: '2025-05-22',
      location: 'Lapangan ITERA',
      poster: [dummy],
      categories: ['UKM', 'Seminar'], // Multiple categories
    },
  ]);

  const [filteredEvents, setFilteredEvents] = useState(events);
  const [sortBy, setSortBy] = useState('date-asc');
  const [selectedCategories, setSelectedCategories] = useState([]); // Array untuk multiple categories
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Muat preferensi dari localStorage
    return localStorage.getItem('theme') === 'dark';
  });

  // Terapkan dark mode ke <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    let updatedEvents = [...events];

    // Filter by categories
    if (selectedCategories.length > 0) {
      updatedEvents = updatedEvents.filter(event =>
        event.categories.some(cat => selectedCategories.includes(cat))
      );
    }

    // Sort by date or title
    if (sortBy === 'date-asc') {
      updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'date-desc') {
      updatedEvents.sort((a, b) => new Date(b.date) - new Date(b.date));
    } else if (sortBy === 'title-asc') {
      updatedEvents.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'title-desc') {
      updatedEvents.sort((a, b) => b.title.localeCompare(b.title));
    }

    setFilteredEvents(updatedEvents);
  }, [sortBy, selectedCategories, events]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  return (

    <div className="min-h-screen  bg-white dark:bg-itera-dark-bg transition-colors duration-300">
      {/* Toggle Button for Sidebar ([Filter], All Screens) */}
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

    {/* Toggle Dark Mode Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-16 right-4 z-50 p-2 bg-itera-blue text-white rounded-full shadow-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-itera-blue focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        aria-label={isDarkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
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

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg p-6 z-40 transition-transform duration-300 ${
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

      {/* Main Content */}
      <div
        className={`p-6 pt-24 md:pt-20 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64 md:ml-1/4' : 'ml-0'
        }`}
      >
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-itera-dark-text mb-6 text-center">
            Acara Kampus ITERA
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <p className="text-gray-600 text-center col-span-full">Tidak ada acara ditemukan.</p>
            ) : (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;