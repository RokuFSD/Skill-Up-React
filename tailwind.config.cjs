/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'twoUrl': 'url(\'./assets/pic03.jpg\')',
        'threeUrl': 'url(\'./assets/pic04.jpg\')',
        'fourUrl': 'url(\'./assets/pic05.jpg\')',
        'fiveUrl': 'url(\'./assets/pic06.jpg\')',
        'sixUrl': 'url(\'./assets/pic06.jpg\')',
        'sevenUrl': 'url(\'./assets/pic07.jpg\')',
        'eightUrl': 'url(\'./assets/pic08.jpg\')'
      },
      backgroundPosition: {
        'banner': 'center -266.4px',
        'one': 'center -129.75px',
        'two': 'center 6.9px',
        'three': 'center 143.55px',
      },
      maxWidth: {
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%'
      },
      minWidth: {
        '1/2': '50%',
        '3/4': '75%',
        '4/5': '80%',
        xs: '328px'
      },
      minHeight: {
        main: '80vh'
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
        99: '25rem',
        112: '28rem',
        128: '32rem',
        144: '36rem'
      },
      screens: {
        xxs: '338px',
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
  plugins: [require('tailwind-scrollbar'), { nocompatible: true }],
};
