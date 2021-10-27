import Head from 'next/head'
import animateUnderline from '../utils/animateUnderline'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'

const DynamicContact = dynamic(
  () => import('../components/Contact'),
  { ssr: false }
)

const WebDevelopment = () => {
    const [contactRef, contactInView ] = useInView({
        triggerOnce: true
    })

    animateUnderline()

    return (
        <>
            <Head>
                <title>Web Developer Watford - Roy Sheppard Digital</title>
                <meta name="description" content="Freelance web developer in Watford, Hertfordshire. Helping businesses grow online." />
            </Head>
            <main>
                <section className="container">
                    <h1 className="heading"><span className="underline">Web development</span></h1>
                </section>
                
                <section id="contact-section" className="container" ref={contactRef}>
                    { contactInView && <DynamicContact /> }
                </section>
            </main>
        </>
    );
}

export default WebDevelopment;