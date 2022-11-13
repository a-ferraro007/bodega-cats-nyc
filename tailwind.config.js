/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      baloo: ['"Baloo 2", cursive']
    },
    extend: {
      colors: {
        graphite: '#242424',
        primaryGold: '#e89a25',
        ice: '#f7f9fc'
      }
    }
  },
  plugins: []
}
