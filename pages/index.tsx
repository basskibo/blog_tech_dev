import React from 'react'
import Head from 'next/head'
import Landing from '../components/Landing'

const Home: React.FC = () => {
	return (
		<div>
			<Head>
				<meta property='og:url' content='https://jageticbojan.com/' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Bojan Jagetic · Projects, libraries and write-ups' />
				<meta property="og:site_name" content="Blogtech" />
				<meta property="og:locale" content="en_US" />

				<meta
					property='og:description'
					content='Apps, npm libraries, Linux desktop tools and browser games built by Bojan Jagetic, with write-ups on how each one was made.'
				/>
				<meta
					property='og:image'
					content='https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127896/igutech/undersstanding_mnfh3n.jpg'
				/>
				<meta property='fb:app_id' content='3881343925425006' />
				<title>Bojan Jagetic</title>
				<link rel='icon' href='/favicon.ico' />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff"></meta>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
			</Head>
			<Landing />
		</div>
	)
}

export default Home
