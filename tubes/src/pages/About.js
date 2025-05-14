import profileP from '../assets/pict/Authprofile.jpg';
import LogoITERA from '../assets/logo/itera.png';


function About() {
  return (
    
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Me</h1>
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
        <img
       
          src={profileP}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-gray-800">Andreas Alfin Yoga Utama</h2>
          <p className="text-gray-600">NIM: 122140088</p>
          <p className="text-gray-600">Teknik Informatika, Institut Teknologi Sumatera</p>
          <p className="text-gray-700 mt-4 text-justify">
            Saya adalah mahasiswa Teknik Informatika ITERA yang mengembangkan ITERA Event Hub sebagai bagian dari Tugas Besar Pemrograman Web Semester Genap 2024/2025. Aplikasi ini dirancang untuk memudahkan mahasiswa dan penyelenggara dalam mengelola acara kampus.
          </p>
          <div className="mt-2 flex space-x-6"></div>
           <a
            href="https://github.com/Andreas122140088"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-blue-600 hover:underline"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 17.69 3.633 17.296 3.633 17.296c-1.146-.573.086-.558.086-.558 1.266.089 1.931 1.302 1.931 1.302 1.125 1.926 2.952 1.371 3.672 1.047.114-.816.438-1.371.795-1.685-2.784-.317-5.708-1.392-5.708-6.192 0-1.368.489-2.487 1.293-3.363-.129-.318-.559-1.594.123-3.324 0 0 1.056-.339 3.462 1.287A12.087 12.087 0 0112 6.07c1.073.005 2.154.145 3.164.434 2.403-1.627 3.458-1.287 3.458-1.287.684 1.73.255 3.006.126 3.324.805.876 1.293 1.995 1.293 3.363 0 4.812-2.928 5.873-5.719 6.188.45.39.855 1.164.855 2.347 0 1.695-.015 3.06-.015 3.477 0 .321.216.694.825.576C20.565 22.092 24 17.597 24 12.297c0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub Profile
          </a>
        <div className="mt-2 flex space-y-6"></div>
          <a
              href="https://www.instagram.com/agoy.ay/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-pink-600 hover:underline group"
            >
              <svg
                className="w-5 h-5 mr-1 group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072 2.95.327.468 2.826.222 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.255 4.125 2.754 6.607 6.979 6.853 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c4.125-.255 6.607-2.754 6.853-6.979.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.255-4.125-2.754-6.607-6.979-6.853C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"
                />
              </svg>
              Instagram
            </a>
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
  );
}

export default About;