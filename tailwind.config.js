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
        navy: {
          DEFAULT: '#1E3A5F',
          dark: '#142742',
          light: '#284C7B',
        },
        cream: {
          DEFAULT: '#FAF6F0',
          dark: '#F4F0EA',
          light: '#FFFFFF',
        },
        slateBlue: {
          DEFAULT: '#4A709C',
          dark: '#3A5A80',
          light: '#5E86B5',
        },
        taupe: {
          DEFAULT: '#D8CFC4',
          dark: '#C4B9AA',
          light: '#ECE6DD',
        },
      },
    },
  },
  plugins: [],
}
