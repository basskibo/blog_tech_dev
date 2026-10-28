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

const DEFAULT_DESCRIPTION = 'Bojan Jagetić, full-stack engineer. Projects he builds and runs, plus writing on Node.js, React, Next.js, Docker and AI.'
const ROUTE_DESCRIPTIONS = {
	'/routes/aboutme': 'About Bojan Jagetić: full-stack engineer since 2015, the stack he works with, his experience and CV.',
	'/routes/blog': 'Blog posts by Bojan Jagetić on Node.js, React, Next.js, Docker, AI tooling and how his own products are built.',
	'/routes/libaries': 'Open source by Bojan Jagetić: npm modules, boilerplates, scripts and agent skills, with write-ups on how to use them.',
	'/routes/projects': 'Projects by Bojan Jagetić: Coinsel, Captain Cook, Voyage Vault and other products he builds and runs.',
	'/routes/uses': 'The hardware, software and tools Bojan Jagetić uses every day for development.',
	'/quiz': 'Quizzes on Node.js, React, MongoDB and AI to test how well you know them.',
	'/guestbook': 'Guest book on jageticbojan.com: leave a note for Bojan Jagetić.'
}

const PROFILE_ROUTES = ['/', '/routes/aboutme']
const COLLECTION_ROUTES = ['/routes/blog', '/routes/libaries', '/routes/projects', '/routes/uses']

// Post and library pages pass frontmatter as pageProps.data and get a BlogPosting; other routes get a WebPage subtype.
const pageNode = (data, route, url) => data
	? {
		'@type': 'BlogPosting',
		headline: data.title,
		description: data.excerpt,
		datePublished: data.publishedAt,
		dateModified: data.updatedAt || data.publishedAt,
		image: data.featuredImage,
		author: { '@id': PERSON_ID },
		publisher: { '@id': PERSON_ID },
		mainEntityOfPage: url,
		keywords: (data.tags || []).map((tag) => tag.name).filter(Boolean)
	}
	: {
		'@type': PROFILE_ROUTES.includes(route) ? 'ProfilePage' : COLLECTION_ROUTES.includes(route) ? 'CollectionPage' : 'WebPage',
		url,
		isPartOf: { '@id': `${SITE_URL}/#website` },
		...(PROFILE_ROUTES.includes(route) && { mainEntity: { '@id': PERSON_ID } })
	}

const jsonLd = (data, route, url) => ({
	'@context': 'https://schema.org',
	'@graph': [PERSON, WEBSITE, pageNode(data, route, url)]
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

	const description = pageProps.data?.excerpt || ROUTE_DESCRIPTIONS[router.route] || DEFAULT_DESCRIPTION
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
				<meta name='author' content='Bojan Jagetić' />
				{pageProps.data?.inPreparation && <meta name='robots' content='noindex' />}
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
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(pageProps.data, router.route, canonical)).replace(/</g, '\\u003c') }}
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
