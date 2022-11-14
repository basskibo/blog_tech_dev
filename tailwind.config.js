/* eslint-disable no-dupe-keys */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('../public/images/hero.svg')"
      }
    }
  },
  //   theme: {
  //     screens: {
  //        sm: { min: "640px", max: "767px" },
  //        // => @media (min-width: 640px and max-width: 767px) { ... }

  //        md: { min: "768px", max: "1023px" },
  //        // => @media (min-width: 768px and max-width: 1023px) { ... }

  //        lg: { min: "1024px", max: "1279px" },
  //        // => @media (min-width: 1024px and max-width: 1279px) { ... }

  //        xl: { min: "1280px", max: "1535px" },
  //        // => @media (min-width: 1280px and max-width: 1535px) { ... }

  //        "2xl": { min: "1536px" },
  //        // => @media (min-width: 1536px) { ... }
  //     },
  //  },
  plugins: [require('@tailwindcss/typography'), require('autoprefixer'), plugin(function ({ addUtilities }) {
    const notchUtilities = {
      '.safe-top': {
        paddingTop: 'constant(safe-area-inset-top)',
        paddingTop: 'env(safe-area-inset-top)'
      },
      '.safe-left': {
        paddingLeft: 'constant(safe-area-inset-left)',
        paddingLeft: 'env(safe-area-inset-left)'
      },
      '.safe-right': {
        paddingRight: 'constant(safe-area-inset-right)',
        paddingRight: 'env(safe-area-inset-right)'
      },
      '.safe-bottom': {
        paddingBottom: 'constant(safe-area-inset-bottom)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      },
      '.no-tap-highlighting': {
        'webkit-tap-highlight-color': 'rgba(0,0,0,0)'
      }
    }

    addUtilities(notchUtilities)
  })]
}
