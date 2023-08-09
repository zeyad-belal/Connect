/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'f37020': '#f37020',
        primary: '#444444',
        secondary :'#fcb62e',
        secHover :'#ecaa28'
      },
      colors: {
        f37020: '#f37020',
        primary: '#444444',
        secondary :'#fcb62e'
      }
    },
  },
  plugins: [],
};
