import Head from 'next/head'
import dynamic from 'next/dynamic'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Faq from '../components/Faq'
import Contact from '../components/Contact'

export default function Home({ faqs }) {

  return (
    <>
      <Head>
        <title>Web Design Watford - Roy Sheppard Digital</title>
        <meta name="description" content="Freelance web designer and full-stack developer based in Watford, Hertfordshire" />
      </Head>

      <Hero />

      <About />

      <Services />
      
      <Faq faqs={faqs} />

      <Contact />
    </>
  )
}

export async function getStaticProps() {
  const uri = process.env.NEXT_PUBLIC_WP_GRAPHQL
  const res = await fetch(uri, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          query: `
              query faqQuery {
                faqs {
                  nodes {
                    faqId
                    title
                    content
                  }
                }
              }
          `
      })
  })

  const json = await res.json()

  return {
      props: {
          faqs: json.data.faqs
      }
  }
}