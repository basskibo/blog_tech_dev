import React from 'react'
import Head from 'next/head'
import Landing from '../components/Landing'
import { getLatestPosts } from '../lib/posts'

const DESCRIPTION = 'Bojan Jagetić, full-stack engineer. Coinsel, Captain Cook, Voyage Vault and other things I build, plus writing on Node.js, React and AI.'

export default function Home ({ posts }) {
	return (
		<>
			<Head>
				<title>Bojan Jagetić — projects and writing</title>
				<meta name="description" content={DESCRIPTION} />
				<meta property="og:description" content={DESCRIPTION} />
				<meta property="og:url" content="https://jageticbojan.com/" />
				<meta property="og:title" content="Bojan Jagetić" />
				<meta property="fb:app_id" content="3881343925425006" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</Head>
			<Landing posts={posts} />
		</>
	)
}

export async function getStaticProps () {
	return { props: { posts: getLatestPosts(5) } }
}
