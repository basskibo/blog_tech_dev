/* eslint-disable no-dupe-keys */
const plugin = require('tailwindcss/plugin')
const { blackA, blueDark, sky, blueP3A, mauve, violet, indigo, purple, jadeDark } = require("@radix-ui/colors")


module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'selector',
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
				...jadeDark,
				primary: {
					// Customize it on globals.css :root
					200: 'rgb(var(--tw-clr-primary-200) / <alpha-value>)',
					300: 'rgb(var(--tw-clr-primary-300) / <alpha-value>)',
					400: 'rgb(var(--tw-clr-primary-400) / <alpha-value>)',
					500: 'rgb(var(--tw-clr-primary-500) / <alpha-value>)',
				},
				dark: '#0e1111',
			},
			keyframes: {
				flicker: {
					'0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
						opacity: 0.99,
						filter:
							'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
					},
					'20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
						opacity: 0.4,
						filter: 'none',
					},
				},
				tilt: {
					'0%, 50%, 100%': {
						transform: 'rotate(0deg)',
					},
					'25%': {
						transform: 'rotate(0.5deg)',
					},
					'75%': {
						transform: 'rotate(-0.5deg)',
					},
				},
			},
			animation: {
				flicker: 'flicker 3s linear infinite',
				tilt: 'tilt 10s infinite linear',
			},
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
