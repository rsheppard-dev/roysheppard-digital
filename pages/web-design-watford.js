import { useInView } from 'react-intersection-observer'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Hero from '../components/Hero'

const DynamicAbout = dynamic(() => import('../components/About'))
const DynamicServices = dynamic(() => import('../components/Services'))
const DynamicFaq = dynamic(() => import('../components/Faq'))
const DynamicContact = dynamic(
  () => import('../components/Contact'),
  { ssr: false }
)

export default function Home({ faq }) {
  const [faqRef, faqInView ] = useInView({
    triggerOnce: true
  })
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

      <DynamicAbout />

      <DynamicServices />
      
      <section id="faq-section" className="container" ref={faqRef}>
        { faqInView && <DynamicFaq faq={faq} /> }
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