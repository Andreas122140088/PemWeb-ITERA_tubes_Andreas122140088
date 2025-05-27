import { Link } from 'react-router-dom';
// import dummy from '../assets/pict/dummy.jpg';

function EventCard({ event, isDarkMode }) {
  return (
    <div className={`rounded-lg shadow-md overflow-hidden hover:shadow-lg transition ${isDarkMode ? 'bg-itera-dark-secondary text-itera-dark-text' : 'bg-white'}`}>
      <img src={event.poster} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-itera-dark-text' : 'text-gray-800'}`}>{event.title}</h3>
        <p className={`mt-1 ${isDarkMode ? 'text-itera-dark-text' : 'text-gray-600'}`}>{event.date} | {Array.isArray(event.categories) ? event.categories.join(', ') : event.categories || 'No Categories'}</p>
        <p className={`mt-2 line-clamp-2 ${isDarkMode ? 'text-itera-dark-text' : 'text-gray-600'}`}>{event.description}</p>
        <Link
          to={`/event/${event.id}`}
          className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Detail
        </Link>
      </div>
    </div>
  );
}

export default EventCard;