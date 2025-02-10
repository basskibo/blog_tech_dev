/* eslint-disable react/react-in-jsx-scope */
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="en">
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

					<script defer src="https://cloud.umami.is/script.js" data-website-id="52df9c02-9c0f-4478-bee5-c45836c20341"></script>
					<script
						dangerouslySetInnerHTML={{
							__html: `
								var _iub = _iub || [];
								_iub.csConfiguration = {
									siteId: 3924656,
									cookiePolicyId: 81182214,
									lang: "en",
									storage: {useSiteId: true}
								};
							`
						}}
					/>
					<script async src="https://cs.iubenda.com/autoblocking/3924656.js"></script>
					<script async src="//cdn.iubenda.com/cs/gpp/stub.js"></script>
					<script async src="//cdn.iubenda.com/cs/iubenda_cs.js"></script>
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
