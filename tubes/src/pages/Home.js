import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import EventFilter from '../components/EventFilter';
import dummy from '../assets/pict/dummy.jpg';

function Home({ isDarkMode }) {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Seminar Teknik Informatika',
      description: 'Pelajari tren terbaru dalam AI dan cloud computing.',
      date: '2025-05-20',
      location: 'Aula ITERA',
      poster: [dummy],
      categories: ['Seminar', 'UKM'],
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
      categories: ['UKM', 'Seminar'],
    },
  ]);

  const [filteredEvents, setFilteredEvents] = useState(events);
  const [sortBy, setSortBy] = useState('date-asc');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
  }, [sortBy, selectedCategories, events]);

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
