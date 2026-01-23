import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="en" suppressHydrationWarning>
				<Head>
					{/* Preconnect to external domains for better performance */}
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
					<link rel="preconnect" href="https://www.googletagmanager.com" />
					<link rel="preconnect" href="https://cloud.umami.is" />
					<link rel="preconnect" href="https://www.clarity.ms" />
					<link rel="dns-prefetch" href="https://res.cloudinary.com" />
					<link rel="dns-prefetch" href="https://images.unsplash.com" />
					<link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
					
					{/* Optimized font loading with display=swap */}
					<link 
						rel="stylesheet" 
						href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" 
					/>
				</Head>
				<body>
					<div id={'globalLoader'} >
					</div>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument

