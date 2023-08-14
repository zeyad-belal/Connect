/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#f2ede7',
        text1: '#0b2330',
        secondary :'#fad133',
        secHover :'#f9c600',
      },
      colors: {
        primary: '#f2ede7',
        text1: '#0b2330',
        secondary :'#fad133',
        secHover :'#f9c600',
      }
    },
  },
  plugins: [],
};
