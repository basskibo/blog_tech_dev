/* eslint-disable no-dupe-keys */
const plugin = require('tailwindcss/plugin')
const { blackA, blueDark, sky, blueP3A, mauve, violet, indigo, purple, jadeDark } = require("@radix-ui/colors")


module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode:'selector',
	theme: {
		extend: {
			backgroundImage: {
				'hero-pattern': 'url(\'../public/images/hero.svg\')'
			},
			colors: {
				background: "rgba(var(--background))",
				border: "rgba(var(--border))",
				card: "rgba(var(--card))",
				cta: "rgba(var(--cta))",
				grape: "rgba(var(--grape))",
				...blackA,
				...mauve,
				...violet,
				...purple,
				...indigo,
				...blueDark,
				...blueP3A,
				...sky,
				...jadeDark
			}
		}
	},
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
