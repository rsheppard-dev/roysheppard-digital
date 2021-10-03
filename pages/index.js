import Head from 'next/head'
import Script from 'next/script'
import About from '../components/About'
import Contact from '../components/Contact'
import Faq from '../components/Faq'
import Hero from '../components/Hero'
import Services from '../components/Services'

export default function Home({ faq }) {

  return (
    <>
      <Head>
        <title>Roy Sheppard Digital - Freelance web designer and full-stack developer from Watford, Hertfordshire</title>
        <meta name="description" content="Freelance web designer and full-stack developer from Watford, Hertfordshire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />

      <About />

      <Services />

      <Faq faq={faq} />

      <Contact />

      <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js' />
    </>
  )
}

export async function getStaticProps(context) {
  const res = await fetch('https://salty-eyrie-16291.herokuapp.com/frequently-asked-questions')
  const faq = await res.json()

  return {
      props: {
          faq
      }
  }
}