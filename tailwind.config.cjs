/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        main: '80vh',
      },
      /*Make main height */
      height: {
        106: '26rem',
        112: '28rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
        main: 'calc(100vh - 100px)'
      },
      width: {
        112: '28rem',
        128: '32rem'
      },
      screens: {
        xs: '530px'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
  variants: {
    scrollbar: ['rounded']
  }
};
