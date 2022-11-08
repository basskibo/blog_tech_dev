/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '../components'
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import * as ga from '../lib/analytics'

import NextHead from 'next/head'

export function reportWebVitals ({ id, name, label, value }) {
  // ga('send', 'event', {
  //   eventCategory:
  //     label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
  //   eventAction: name,
  //   eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
  //   eventLabel: id, // id unique to current page load
  //   nonInteraction: true // avoids affecting bounce rate.
  // })
  label === 'web-vital' && console.log({ id, name, label, value })
}

function IguanaDevelopmentTech ({ Component, pageProps }) {
  const router = useRouter()
  const title = pageProps.data ? `${pageProps.data.title}` : 'Bojan Jagetic'
  const ogUrl = pageProps.data
    ? pageProps.data.featuredImage
    : 'https://res.cloudinary.com/dr1sm5gnj/image/upload/v1645127896/igutech/undersstanding_mnfh3n.jpg'

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader')
      if (loader) loader.style.display = 'none'
    }
    const handleRouteChange = (url) => {
      console.log(url)
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
            <title>{title}</title>
            <meta property='og:image' content={ogUrl} />
            <meta
               property='og:description'
               content={
                  pageProps.data
                    ? pageProps.data.excerpt
                    : 'Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away '
               }
            />
         </NextHead>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </>
  )
}

export default IguanaDevelopmentTech
