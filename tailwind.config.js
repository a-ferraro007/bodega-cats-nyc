/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      baloo: ['"Baloo 2", cursive'],
      source: ['"Source Sans Pro", sans-serif'],
      roboto: ['"Roboto", sans-serif'],
      nunito: ['"Nunito Sans",  sans-serif']
    },
    extend: {
      colors: {
        graphite: '#242424',
        primaryGold: '#e89a25',
        ice: '#f7f9fc',
        primaryBlue: '#1e30a4',
        lightBlue: 'rgba(30, 48, 164, .1)',
        mediumBlue: 'rgba(30, 48, 164, .2)'
      },
      animation: {
        slide: 'slideOut 3s linear'
      },
      keyframes: {
        slideOut: {
          '0%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      }
    }
  },
  plugins: []
}
