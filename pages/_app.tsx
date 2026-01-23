import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import Layout from '../components/layout/Layout'
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import * as ga from '../lib/analytics'
import SplashScreen from '../components/custom/SplashScreen'
import NextHead from 'next/head'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'

const SpeedInsights = dynamic(
	() => import('@vercel/speed-insights/next').then((mod) => mod.SpeedInsights),
	{ ssr: false }
)

const handleTitle = (router: ReturnType<typeof useRouter>): string => {
	let title = 'Bojan Jagetic'
	try {
		const splittedTitle = router.route.split('/')
		if (splittedTitle[2]) {
			switch (splittedTitle[2]) {
				case 'libaries':
					title = 'Bojan Jagetic | Libary'
					break
				case 'blog':
					title = 'Bojan Jagetic | Blog'
					break
				case 'aboutme':
					title = 'Bojan Jagetic | About Me'
					break
				case 'uses':
					title = 'Bojan Jagetic | Everyday use'
					break
				case 'projects':
					title = 'Bojan Jagetic | Projects'
					break
				default:
					break
			}
		}
		return title
	} catch (exc) {
		return title
	}
}

function IguanaDevelopmentTech({ Component, pageProps }: AppProps) {
	const [pageLoaded, setPageLoaded] = useState(false)
	const router = useRouter()
	let defaultTitle: string | undefined
	if (!pageProps.data) {
		defaultTitle = handleTitle(router)
	}
	const title = pageProps.data ? `${(pageProps.data as any).title}` : defaultTitle
	const ogUrl = pageProps.data
		? (pageProps.data as any).featuredImage
		: 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127896/igutech/undersstanding_mnfh3n.jpg'

	const postDescription = (): string => {
		if (pageProps.data) {
			const props = pageProps.data as any
			if (props.excerpt) {
				return props.excerpt
			} else if (props.description) {
				return props.description
			}
		}
		return 'Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away'
	}
	const description = postDescription()

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const loader = document.getElementById('globalLoader')
			// if (loader) setTimeout(() => setPageLoaded(true), 1500)
			if (loader) setPageLoaded(true)
		}
		const handleRouteChange = (url: string) => {
			ga.pageview(url)
		}
		router.events.on('routeChangeComplete', handleRouteChange)
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange)
		}
	}, [router.events])

	return (
		<>
			<NextHead>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
				<title>{title}</title>
				<meta property='og:image' content={ogUrl} />
				<meta
					property='og:description'
					content={description}
				/>
				<meta name='description' content={description} />
				<meta property='og:url' content='https://jageticbojan.com/' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Bojan Jagetic Blog' />
				<meta property="og:site_name" content="Blogtech" />
				<meta property="og:locale" content="en_US" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Bojan Jagetic" />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={ogUrl} />
				{/* Performance and SEO meta tags */}
				<meta name="theme-color" content="#000000" />
				<meta name="format-detection" content="telephone=no" />
				<link rel="canonical" href={`https://jageticbojan.com${router.asPath}`} />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							"@context": "https://schema.org",
							"@type": "Organization",
							"url": "https://jageticbojan.com",
							"name": "Bojan Jagetic",
							"sameAs": [
								"https://github.com/basskibo",
								"https://x.com/basskibo1"
							],
						}),
					}}
				/>
			</NextHead>
			
			{/* Optimized third-party scripts using next/script */}
			{process.env.NEXT_GOOGLE_ANALYTIC_MEASUREMENT_ID && (
				<>
					<Script
						strategy="afterInteractive"
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_GOOGLE_ANALYTIC_MEASUREMENT_ID}`}
					/>
					<Script
						id="google-analytics"
						strategy="afterInteractive"
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
				</>
			)}
			
			<Script
				strategy="lazyOnload"
				src="https://cloud.umami.is/script.js"
				data-website-id="52df9c02-9c0f-4478-bee5-c45836c20341"
			/>
			
			<Script
				id="microsoft-clarity"
				strategy="lazyOnload"
				dangerouslySetInnerHTML={{
					__html: `
						(function(c,l,a,r,i,t,y){
							c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
							t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
							y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
						})(window, document, "clarity", "script", "v2x468vj4f");
					`,
				}}
			/>
			
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				<SplashScreen loaded={pageLoaded}>
					<Layout>
						<Component {...pageProps} />
						{typeof window !== 'undefined' && (
							<>
								<SpeedInsights />
								<Analytics />
							</>
						)}
					</Layout>
				</SplashScreen>
			</ThemeProvider>
		</>
	)
}

export default IguanaDevelopmentTech

