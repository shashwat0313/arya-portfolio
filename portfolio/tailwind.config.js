/** @type {import('tailwindcss').Config} */
export default {
  content: [    
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      fontFamily: {
        piazzolla: ['Piazzolla', 'serif'],
      },
      // screens:{
      //   'xs' : '450px',
      // }
    },
  },
  plugins: [],
}

