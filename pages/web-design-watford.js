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

export default function Home({ faq }) {
  const [contactRef, contactInView ] = useInView({
    triggerOnce: true
  })

  return (
    <>
      <Head>
        <title>Web Design Watford - Roy Sheppard Digital</title>
        <meta name="description" content="Freelance web designer and full-stack developer from Watford, Hertfordshire" />
      </Head>

      <Hero />

      <About />

      <Services />
      
      <section id="faq-section" className="container">
        <Faq faq={faq} />
      </section>

      <section id="contact-section" className="container" ref={contactRef}>
        { contactInView && <DynamicContact /> }
      </section>

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