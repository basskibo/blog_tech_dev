/* eslint-disable react/react-in-jsx-scope */
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="en" suppressHydrationWarning>
				<Head>
					{/* The two fonts every page paints with, fetched before the CSS asks for them. */}
					<link rel="preload" href="/fonts/bricolage-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
					<link rel="preload" href="/fonts/instrument-serif-italic-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
					{/* Preconnect to external domains for better performance */}
					<link rel="preconnect" href="https://cloud.umami.is" />
					<link rel="dns-prefetch" href="https://res.cloudinary.com" />
					<link rel="dns-prefetch" href="https://images.unsplash.com" />
					<link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
