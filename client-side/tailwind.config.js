/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'fad133': '#fad133',
        primary: '#f2ede7',
        text1: '#0b2330',
        secondary :'#fad133',
        secHover :'#ecaa28'
      },
      colors: {
        f37020: '#f37020',
        text1: '#0b2330',
        primary: '#f2ede7',
        secondary :'#fad133'
      }
    },
  },
  plugins: [],
};
