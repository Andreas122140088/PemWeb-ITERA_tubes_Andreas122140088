module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class', // Aktifkan dark mode dengan kelas
  theme: {
    extend: {
      colors: {
        'itera-green': '#2E7D32',
        'itera-blue': '#0288D1',
        'itera-dark-bg': '#1F2937', // Latar belakang gelap
        'itera-dark-text': '#E5E7EB', // Teks gelap
        'itera-dark-secondary': '#374151', // Sekunder gelap (form, sidebar)
      },
    },
  },
  plugins: [],
};