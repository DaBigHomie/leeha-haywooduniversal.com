/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f8b8a7',
          50: '#fef5f3',
          100: '#fde9e5',
          200: '#fbd6ce',
          300: '#f8b8a7', // Main coral pink
          400: '#f59a80',
          500: '#f17c59',
          600: '#e95e3d',
          700: '#d44428',
          800: '#b03824',
          900: '#913223',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Noto Sans"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

