import Head from 'next/head'
import animateUnderline from '../utils/animateUnderline'
import dynamic from 'next/dynamic'

const Contact = dynamic(
  () => import('../components/Contact'),
  { ssr: false }
)

const WebDesign = () => {
    animateUnderline()

    return (
        <>
            <Head>
                <title>Web Designer Watford - Roy Sheppard Digital</title>
                <meta name="description" content="Freelance web designer in Watford, Hertfordshire. Helping businesses grow online." />
            </Head>
            <main>
                <section className="container">
                    <h1 className="heading"><span className="underline">Web design</span></h1>
                </section>
                <Contact />
            </main>
        </>
    );
}

export default WebDesign;