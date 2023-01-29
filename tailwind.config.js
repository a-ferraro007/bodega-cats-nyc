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
      fontSize: {
        xxs: ['.5rem', '.75rem']
      },
      animation: {
        slide: 'slideOut 3s linear'
      },
      keyframes: {
        slideOut: {
          '0%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      },
      boxShadow: {
        '3xl': '0 1px 2px rgba(0, 0, 0, .2)',
        '4xl': '0 2px 4px rgb(0 0 0 / 20%), 0 -1px 0px rgb(0 0 0 / 2%)',
        '5xl': '0 0 8px rgb(0 0 0 / 16%)'
      },
      height: {
        container: 'calc(100% - 4rem)'
      },
      width: {
        'side-bar': '25rem',
        'map-container': 'calc(100% - 25rem)'
      },
      maxWidth: {
        'map-container': 'calc(100% - 25rem)'
      }
    }
  },
  plugins: []
}
