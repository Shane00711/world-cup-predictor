/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rugby: {
          green: '#006847',
          gold: '#FFB81C',
          dark: '#1a1a1a',
        }
      }
    },
  },
  plugins: [],
}
