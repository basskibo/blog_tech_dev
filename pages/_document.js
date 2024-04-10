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
					<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3181880928286370"
						crossOrigin="anonymous"></script>
						<script defer src="https://analytics.eu.umami.is/script.js" data-website-id="52df9c02-9c0f-4478-bee5-c45836c20341"></script>
{/* <script type="text/javascript">
heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])}

</script> */}
					{/* <link rel="manifest" href="/manifest.json" />
			 <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
        <meta name="theme-color" content="#ff0080" /> */}
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
