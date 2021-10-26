import Head from 'next/head'
import Hero from '../components/Hero'
import dynamic from 'next/dynamic'

const DynamicAbout = dynamic(() => import('../components/About'))
const DynamicServices = dynamic(() => import('../components/Services'))
const DynamicFaq = dynamic(() => import('../components/Faq'))
const DynamicContact = dynamic(
  () => import('../components/Contact'),
  { ssr: false }
)

export default function Home({ faq }) {

  return (
    <>
      <Head>
        <title>Web Design Watford - Roy Sheppard Digital</title>
        <meta name="description" content="Freelance web designer and full-stack developer from Watford, Hertfordshire" />
      </Head>

      <Hero />

      <DynamicAbout />

      <DynamicServices />

      <DynamicFaq faq={faq} />

      <DynamicContact />

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