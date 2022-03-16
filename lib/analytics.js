export const pageview = (url) => {
	if (window && window.gtag) {
		window.gtag("config", process.env.NEXT_GOOGLE_ANALYTIC_MEASUREMENT_ID, {
			page_path: url,
		})
	}
}

export const event = ({ action, params }) => {
	window.gtag("event", action, params)
}
