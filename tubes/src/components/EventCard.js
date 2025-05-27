import { Link } from 'react-router-dom';
// import dummy from '../assets/pict/dummy.jpg';

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={event.poster} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        <p className="text-gray-600 mt-1">{event.date} | {Array.isArray(event.categories) ? event.categories.join(', ') : event.categories || 'No Categories'}</p>
        <p className="text-gray-600 mt-2 line-clamp-2">{event.description}</p>
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