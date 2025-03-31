/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'beauty-pink': {
          50: '#FFF5F7',
          100: '#FFEBEF',
          200: '#FFD1DB',
          300: '#FFB6C7',
          400: '#FF80A0',
          500: '#FF4978',
          600: '#E6426D',
          700: '#BF365A',
          800: '#992B48',
          900: '#7D233B',
        },
        'beauty-purple': {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'beauty': '0 10px 30px -5px rgba(255, 73, 120, 0.3)',
      },
    },
  },
  plugins: [],
};
