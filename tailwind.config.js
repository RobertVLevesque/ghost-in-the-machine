/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ghost: {
          red: '#FF0000',
          black: '#050505',
        }
      },
      animation: {
        'circuit-flicker': 'flicker 4s linear infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19%, 21%, 62%, 64%, 100%': { opacity: '1' },
          '20%, 63%': { opacity: '0.3' },
        }
      }
    },
  },
  plugins: [],
}