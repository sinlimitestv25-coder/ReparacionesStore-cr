/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#b3ccff',
          300: '#80a8ff',
          400: '#4d80ff',
          500: '#265ef5',
          600: '#1a46d1',
          700: '#1636a3',
          800: '#152c7d',
          900: '#152860',
        },
      },
    },
  },
  plugins: [],
}
