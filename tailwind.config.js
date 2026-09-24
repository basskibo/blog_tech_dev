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
				aurora: {
					'0%': { backgroundPosition: '50% 50%, 50% 50%' },
					'100%': { backgroundPosition: '350% 50%, 350% 50%' },
				},
				'gradient-x': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
				},
				'gradient-y': {
					'0%, 100%': { backgroundPosition: '50% 0%' },
					'50%': { backgroundPosition: '50% 100%' },
				},
				'gradient-xy': {
					'0%, 100%': { backgroundPosition: '0% 0%' },
					'50%': { backgroundPosition: '100% 100%' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' },
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'50%': { transform: 'translateY(-30px) rotate(5deg)' },
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				'pulse-glow': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.8', transform: 'scale(1.05)' },
				},
				'blob': {
					'0%': { transform: 'translate(0px, 0px) scale(1)' },
					'33%': { transform: 'translate(30px, -50px) scale(1.1)' },
					'66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
					'100%': { transform: 'translate(0px, 0px) scale(1)' },
				},
				'text-reveal': {
					'0%': { opacity: '0', transform: 'translateY(100%)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				'border-spin': {
					'100%': { transform: 'rotate(-360deg)' },
				},
			},
			animation: {
				flicker: 'flicker 3s linear infinite',
				tilt: 'tilt 10s infinite linear',
				aurora: 'aurora 60s linear infinite',
				'gradient-x': 'gradient-x 15s ease infinite',
				'gradient-y': 'gradient-y 15s ease infinite',
				'gradient-xy': 'gradient-xy 15s ease infinite',
				shimmer: 'shimmer 2s linear infinite',
				float: 'float 6s ease-in-out infinite',
				'float-slow': 'float-slow 8s ease-in-out infinite',
				'spin-slow': 'spin-slow 20s linear infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				blob: 'blob 7s infinite',
				'text-reveal': 'text-reveal 0.8s ease forwards',
				'slide-up': 'slide-up 0.6s ease forwards',
				'scale-in': 'scale-in 0.5s ease forwards',
				'border-spin': 'border-spin 7s linear infinite',
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
