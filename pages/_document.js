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
