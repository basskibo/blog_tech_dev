/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Layout } from '../components'
import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import * as ga from '../lib/analytics'
// import SplashScreen from '../components/custom/SplashScreen'
import NextHead from 'next/head'
import { Analytics } from '@vercel/analytics/react'

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
    return title
  }
}

function IguanaDevelopmentTech ({ Component, pageProps }) {
  // const [pageLoaded, setPageLoaded] = useState(false)
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

  useEffect(() => {
    // if (typeof window !== 'undefined') {
    // const loader = document.getElementById('globalLoader')
    // if (loader) setTimeout(() => setPageLoaded(true), 1500)
    // if (loader) setPageLoaded(true)
    // }
    const handleRouteChange = (url) => {
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
            <meta property='og:url' content='https://bojanjagetic.com/' />
            <meta property='og:type' content='website' />
            <meta property='og:title' content='Bojan Jagetic Blog' />
            <meta property="og:site_name" content="Blogtech" />
            <meta property="og:locale" content="en_US" />
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content="Bojan Jagetic"/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content={ogUrl} />

         </NextHead>
         <SplashScreen >
            <Layout>
                <Component {...pageProps} />
                <Analytics/>
            </Layout>
         </SplashScreen>
      </>
  )
}

export default IguanaDevelopmentTech
