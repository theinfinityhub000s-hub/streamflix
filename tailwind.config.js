/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          base: '#141414',
          card: '#181818',
          hover: '#242424',
          red: '#E50914',
          redHover: '#b80710',
          muted: '#A3A3A3',
          border: 'rgba(255, 255, 255, 0.15)'
        }
      },
      fontFamily: {
        sans: ['Netflix Sans', 'Inter', 'Helvetica Neue', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
