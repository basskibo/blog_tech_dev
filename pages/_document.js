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
					{/* Google Analytics */}
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_GOOGLE_ANALYTIC_MEASUREMENT_ID}`}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', ${JSON.stringify(
								process.env
									.NEXT_GOOGLE_ANALYTIC_MEASUREMENT_ID
							)} , {
                                page_path: window.location.pathname,
                                });
                            `
						}}
					/>
					<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap" />
					<script defer src="https://cloud.umami.is/script.js" data-website-id="52df9c02-9c0f-4478-bee5-c45836c20341"></script>
					{/* Microsoft Clarity */}
					<script
						dangerouslySetInnerHTML={{
							__html: `
								(function(c,l,a,r,i,t,y){
									c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
									t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
									y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
								})(window, document, "clarity", "script", "v2x468vj4f");
							`
						}}
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
