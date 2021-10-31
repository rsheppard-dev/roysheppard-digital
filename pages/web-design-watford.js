import { useInView } from 'react-intersection-observer'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Faq from '../components/Faq'

const DynamicContact = dynamic(
  () => import('../components/Contact'),
  { ssr: false }
)

export default function Home({ faqs }) {
  const [contactRef, contactInView ] = useInView({
    triggerOnce: true
  })

  return (
    <>
      <Head>
        <title>Web Design Watford - Roy Sheppard Digital</title>
        <meta name="description" content="Freelance web designer and full-stack developer based in Watford, Hertfordshire" />
      </Head>

      <Hero />

      <About />

      <Services />
      
      <section id="faq-section" className="container">
        <Faq faqs={faqs} />
      </section>

      <section id="contact-section" className="container" ref={contactRef}>
        { contactInView && <DynamicContact /> }
      </section>

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
                    id
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