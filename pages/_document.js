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
                gtag('config', '${process.env.NEXT_GOOGLE_ANALYTIC_MEASUREMENT_ID}', {
					page_path: window.location.pathname,
                });
				`,
						}}
					/>

					{/* Umami Analytics - Exclude localhost */}
					<script
						dangerouslySetInnerHTML={{
							__html: `
                if (window.location.hostname !== 'localhost') {
					(function(w, d, s, l, i) {
                    w[l] = w[l] || [];
                    w[l].push({
						'gtm.start': new Date().getTime(), event: 'gtm.js'
                    });
                    var f = d.getElementsByTagName(s)[0],
                        j = d.createElement(s),
                        dl = l != 'dataLayer' ? '&l=' + l : '';
                    j.async = true;
                    j.src = 'https://analytics.eu.umami.is/script.js?id=${process.env.UMAMI_WEBSITE_ID}' + dl;
                    f.parentNode.insertBefore(j, f);
				})(window, document, 'script', 'dataLayer', '${process.env.UMAMI_WEBSITE_ID}');
                }
			`,
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
