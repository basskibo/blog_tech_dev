export const pageview = (url) => {
	if (window && window.gtag) {
		window.gtag("config", "G-3P23E6D898", {
			page_path: url,
		})
	}
}

export const event = ({ action, params }) => {
	window.gtag("event", action, params)
}
