/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import Layout from '../components/layout/Layout'
// Unbounded and Atkinson are declared in styles/jagetic.css from public/fonts.
// JetBrains Mono is only used in code blocks, so it comes from its package.
import '@fontsource-variable/jetbrains-mono/wght.css'
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import '../styles/jagetic.css'
import '../styles/site.css'
import { initAnalytics, pageview } from '../lib/analytics'
import NextHead from 'next/head'
import { Analytics } from '@vercel/analytics/react'
import dynamic from 'next/dynamic'

const SpeedInsights = dynamic(
	() => import('@vercel/speed-insights/next').then((mod) => mod.SpeedInsights),
	{ ssr: false }
)

const SITE_URL = 'https://www.jageticbojan.com'
const PERSON_ID = `${SITE_URL}/#person`

const PERSON = {
	'@type': 'Person',
	'@id': PERSON_ID,
	name: 'Bojan Jagetić',
	url: `${SITE_URL}/`,
	jobTitle: 'Full-stack engineer',
	sameAs: [
		'https://github.com/basskibo',
		'https://x.com/basskibo1',
		'https://dev.to/basskibo',
		'https://medium.com/@jagetic.bojan'
	]
}

const WEBSITE = {
	'@type': 'WebSite',
	'@id': `${SITE_URL}/#website`,
	url: `${SITE_URL}/`,
	name: 'Bojan Jagetić',
	publisher: { '@id': PERSON_ID }
}

// Post and library pages pass frontmatter as pageProps.data; everything else is site-wide only.
const jsonLd = (data, url) => ({
	'@context': 'https://schema.org',
	'@graph': data
		? [PERSON, WEBSITE, {
			'@type': 'BlogPosting',
			headline: data.title,
			description: data.excerpt || data.description,
			datePublished: data.publishedAt,
			image: data.featuredImage,
			author: !data.author || data.author === 'Bojan Jagetic' ? { '@id': PERSON_ID } : { '@type': 'Person', name: data.author },
			publisher: { '@id': PERSON_ID },
			mainEntityOfPage: url,
			keywords: (data.tags || []).map((tag) => tag.name).filter(Boolean)
		}]
		: [PERSON, WEBSITE]
})

const handleTitle = (router) => {
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

function IguanaDevelopmentTech({ Component, pageProps }) {
	const router = useRouter()
	let defaultTitle
	if (!pageProps.data) {
		defaultTitle = handleTitle(router)
	}
	const title = pageProps.data ? `${pageProps.data.title}` : defaultTitle
	const ogUrl = pageProps.data
		? pageProps.data.featuredImage
		: 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127896/igutech/undersstanding_mnfh3n.jpg'

	const postDescription = () => {
		if (pageProps.data) {
			const props = pageProps.data
			if (props.excerpt) {
				return props.excerpt
			} else if (props.description) {
				return props.description
			}
		}
		return 'Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away'
	}
	const description = postDescription()
	const canonical = `${SITE_URL}${router.asPath.split(/[?#]/)[0]}`

	useEffect(() => {
		initAnalytics()
	}, [])

	useEffect(() => {
		const handleRouteChange = (url) => {
			pageview(url)
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
				<meta property='og:url' content={canonical} key='og:url' />
				<meta property='og:type' content={pageProps.data ? 'article' : 'website'} />
				<meta property='og:title' content={title} key='og:title' />
				<meta property="og:site_name" content="Bojan Jagetić" />
				<meta property="og:locale" content="en_US" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={title} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image" content={ogUrl} />
				{/* Performance and SEO meta tags */}
				<meta name="theme-color" content="#07070b" />
				<meta name="format-detection" content="telephone=no" />
				<link rel="canonical" href={canonical} />
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(pageProps.data, canonical)).replace(/</g, '\\u003c') }}
				/>
			</NextHead>
			
			<Script
				strategy="lazyOnload"
				src="https://cloud.umami.is/script.js"
				data-website-id="52df9c02-9c0f-4478-bee5-c45836c20341"
			/>
			
			<Layout>
				<Component {...pageProps} />
				<SpeedInsights />
				<Analytics />
			</Layout>
		</>
	)
}

export default IguanaDevelopmentTech
