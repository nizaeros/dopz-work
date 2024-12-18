/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#132490',
          dark: '#0e1b6b',
          light: '#c1cbf7',
          50: '#f5f7ff',
          100: '#ebefff',
          200: '#d8e0ff',
          300: '#b8c6ff',
          400: '#8fa3ff',
          500: '#6678ff',
          600: '#3d4eeb',
          700: '#2f3cd1',
          800: '#2832a8',
          900: '#1f2875'
        },
        error: {
          DEFAULT: '#ef4444',
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c'
        }
      },
      ringColor: {
        DEFAULT: '#132490',
        primary: '#132490',
        'primary-light': '#c1cbf7'
      },
      ringOpacity: {
        DEFAULT: '0.2'
      }
    }
  },
  plugins: [],
};