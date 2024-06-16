/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // on definit la police d'ecriture Aeonik
        'aeonik': ['Aeonik', 'sans-serif'],
      },
      colors: {
        orange: 'rgba(249, 79, 13, 1)',
        orange_top: 'rgba(221, 93, 46, 1)',
        white_1: '#FAF3DD',
        white_2: '#FACAAA',
        black: 'rgba(24, 24, 24, 1)',
        black_05: 'rgba(24, 24, 24, 0.5)',
        white: 'rgba(245, 245, 245, 1)',
        white_05: 'rgba(245, 245, 245, 0.5)',
        white_01: 'rgba(245, 245, 245, 0.1)',
        green: 'rgba(30, 125, 96, 0.8)',
        green_08: 'rgba(30, 125, 96, 0.8)',
        green_06: 'rgba(30, 125, 96, 0.6)',
        green_top: 'rgba(26, 173, 78, 1)',
        green_dot: '#28a745',
      },
      animation: {
        slideup: 'slideup 1s ease-in-out',
        slideup1: 'slideup 500ms ease-in-out'
      },
      keyframes: {
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)' },
          to: { opacity: 1, transform: 'none' },
        }
      }
    },
  },
  plugins: [],
}
