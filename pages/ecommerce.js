import Head from 'next/head'
import animateUnderline from '../utils/animateUnderline'
import dynamic from 'next/dynamic'

const Contact = dynamic(
  () => import('../components/Contact'),
  { ssr: false }
)

const Ecommerce = () => {
    animateUnderline()

    return (
        <>
            <Head>
                <title>eCommerce Specialist Watford - Roy Sheppard Digital</title>
                <meta name="description" content="Freelance eCommerce specialist in Watford, Hertfordshire. Helping businesses grow online." />
            </Head>
            <main>
                <section className="container">
                    <h1 className="heading"><span className="underline">eCommerce</span></h1>
                </section>
                <Contact />
            </main>
        </>
    );
}

export default Ecommerce;