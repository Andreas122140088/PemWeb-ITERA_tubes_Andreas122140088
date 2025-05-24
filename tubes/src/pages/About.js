import profileP from '../assets/pict/Authprofile.jpg';
import LogoITERA from '../assets/logo/itera.png';

function About({ isDarkMode }) {
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-itera-dark-bg' : 'bg-white'} transition-colors duration-300 flex flex-col justify-center`}>
      <div className={`container mx-auto p-6 max-w-3xl rounded-lg ${isDarkMode ? 'bg-itera-dark-secondary text-white' : 'bg-white text-gray-900'} shadow-md`}>
        <h1 className="text-3xl font-bold mb-6 text-center">About Me</h1>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={profileP}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-2">Andreas Alfin Yoga Utama</h2>
            <p className="mb-1">NIM: 122140088</p>
            <p className="mb-4">Teknik Informatika, Institut Teknologi Sumatera</p>
            <p className="text-justify">
              Saya adalah mahasiswa Teknik Informatika ITERA yang mengembangkan ITERA Event Hub sebagai bagian dari Tugas Besar Pemrograman Web Semester Genap 2024/2025. Aplikasi ini dirancang untuk memudahkan mahasiswa dan penyelenggara dalam mengelola acara kampus.
            </p>
            <div className="mt-2 flex space-x-6">
              <a
                href="https://github.com/Andreas122140088"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                GitHub Profile
              </a>
              <a
                href="https://www.instagram.com/agoy.ay/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-pink-600 hover:underline"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <img
            src={LogoITERA}
            alt="ITERA Logo"
            className="mx-auto h-12"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
