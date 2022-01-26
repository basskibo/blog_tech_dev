module.exports = {
	darkMode: "media", // or darkMode: 'class'
	plugins: [require("tailwind-scrollbar")],
	variants: {
		scrollbar: ["dark"],
	},
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				custom: {
					DEFAULT: "#10B981",
					light: "#D1FAE5",
				},
			},
		},
	},
}
