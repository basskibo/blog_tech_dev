/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '../components'
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import * as ga from '../lib/analytics'

import NextHead from 'next/head'

// export function reportWebVitals ({ id, name, label, value }) {
// ga('send', 'event', {
//   eventCategory:
//     label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
//   eventAction: name,
//   eventValue: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
//   eventLabel: id, // id unique to current page load
//   nonInteraction: true // avoids affecting bounce rate.
// })
//   label === 'web-vital' && console.log({ id, name, label, value })
// }
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
        default:
          console.log('Uknown case')
      }
    }
    return title
  } catch (exc) {
    return 'Bojan Jagetic'
  }
}

function IguanaDevelopmentTech ({ Component, pageProps }) {
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
  // pageProps.data
  //   ? postDescription()
  //   : 'Perfection is achieved not when there is nothing more to add, but rather when there is nothing more to take away'

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
               content={description}
            />
            <meta name='description' content={description} />
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content="Bojan Jagetic"/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content={ogUrl} />

         </NextHead>
         <Layout className='safe-top safe-left safe-right safe-bottom'>
            <Component {...pageProps} />
         </Layout>
      </>
  )
}

export default IguanaDevelopmentTech
