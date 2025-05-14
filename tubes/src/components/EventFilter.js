import { useState } from 'react';

function EventFilter({ sortBy, setSortBy, selectedCategories, setSelectedCategories }) {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const categories = ['Seminar', 'Lomba', 'UKM'];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const selectAllCategories = () => {
    setSelectedCategories(categories);
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-itera-dark-text">
          Filter Acara
        </h2>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="p-1 text-gray-600 dark:text-gray-400 hover:text-itera-green dark:hover:text-itera-green focus:outline-none"
          aria-label={isFilterOpen ? 'Sembunyikan filter' : 'Tampilkan filter'}
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
              d={isFilterOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
            />
          </svg>
        </button>
      </div>
      <div
        className={`space-y-4 transition-all duration-300 ${
          isFilterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div>
          <label
            htmlFor="sort"
            className="block text-gray-700 dark:text-itera-dark-text font-medium mb-2"
          >
            Urutkan Berdasarkan
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-itera-dark-secondary dark:border-gray-600 dark:text-itera-dark-text focus:outline-none focus:ring-2 focus:ring-itera-green"
          >
            <option value="date-asc">Tanggal (Terdekat)</option>
            <option value="date-desc">Tanggal (Terjauh)</option>
            <option value="title-asc">Judul (A-Z)</option>
            <option value="title-desc">Judul (Z-A)</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-itera-dark-text font-medium mb-2">
            Jenis Acara
          </label>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2 h-4 w-4 text-itera-green focus:ring-itera-green border-gray-300 dark:border-gray-600 rounded"
                />
                <span className="text-gray-700 dark:text-itera-dark-text">{category}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              onClick={selectAllCategories}
              className="flex-1 p-2 bg-itera-green text-white rounded-md hover:bg-green-700 dark:hover:bg-green-500"
            >
              Pilih Semua
            </button>
            <button
              onClick={clearCategories}
              className="flex-1 p-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-itera-dark-text rounded-md hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventFilter;