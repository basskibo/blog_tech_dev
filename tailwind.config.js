/* eslint-disable no-dupe-keys */
const plugin = require('tailwindcss/plugin')
const { blackA,gray, blueDark, sky, blueP3A, mauve, violet, indigo, purple, jadeDark, grass, sand, tomato } = require("@radix-ui/colors")


module.exports = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'selector',
	theme: {
		extend: {
			backgroundImage: {
				'hero-pattern': 'url(\'../public/images/hero.svg\')'
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
					100: blueDark.blue12,   // Use any color from the Radix blueDark palette
					200: blueDark.blue11,
					300: blueDark.blue10,
					400: blueDark.blue9,
					500: blueDark.blue8,
					600: blueDark.blue7,
					700: blueDark.blue6,
					800: blueDark.blue5,
					900: blueDark.blue4,
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
					100: jadeDark.jade12,   // Replace with desired color from Radix
					200: jadeDark.jade11,
					300: violet.violet3,
					400: jadeDark.jade9,
					500: violet.violet5,
					600: violet.violet6,
					700: violet.violet7,
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				cta: "rgba(var(--cta))",
				grape: "rgba(var(--grape))",
				...blackA,
				...gray,
				...mauve,
				...violet,
				...purple,
				...indigo,
				...blueDark,
				...blueP3A,
				...sky,
				...jadeDark,
				...grass,
				...tomato,
				...sand,
				dark: '#0e1111',
				gold: '#ffd700',
				silver: '#c0c0c0',
				bronze: '#cd7f32'
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
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
	plugins: [
		require('@tailwindcss/typography'), 
		require('autoprefixer'), 
		plugin(function ({ addUtilities }) {
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
