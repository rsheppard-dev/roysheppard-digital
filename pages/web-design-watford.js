import dynamic from 'next/dynamic'
import Head from 'next/head'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'

const Faq = dynamic(() => import('../components/Faq'), {
  suspense: true,
})
const Contact = dynamic(() => import('../components/Contact'), {
  suspense: true,
})

export default function Home({ faq }) {

  return (
    <>
      <Head>
        <title>Web Design Watford - Roy Sheppard Digital</title>
        <meta name="description" content="Freelance web designer and full-stack developer from Watford, Hertfordshire" />
      </Head>

      <Hero />

      <About />

      <Services />

      <Faq faq={faq} />

      <Contact />

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