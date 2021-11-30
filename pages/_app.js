import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import CookieConsent from 'react-cookie-consent'
import * as gtag from '../lib/gtag'
import Layout from '../components/Layout'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', ${gtag.GA_TRACKING_ID});
          `,
        }}
      />

      <CookieConsent
        buttonClasses='button'
        buttonStyle={{
          background: '#ffc300'
        }}
      >
        This website uses cookies to analyse site usage in order to improve the user experience.
      </CookieConsent>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp