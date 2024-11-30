/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99ceff',
          300: '#66b5ff',
          400: '#339cff',
          500: '#0179EF',
          600: '#0061bf',
          700: '#00498f',
          800: '#003160',
          900: '#001830',
        },
      },
    },
  },
  plugins: [],
};