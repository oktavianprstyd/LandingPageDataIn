/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['"Outfit"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        datain: {
          blue: '#2563eb',
          hover: '#1d4ed8',
          navy: '#0b132b',
          dark: '#0f172a',
          light: '#f8fafc',
        },
      },
    },
  },
  plugins: [],
}
