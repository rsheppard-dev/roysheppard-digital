import Head from 'next/head'
import Contact from '../components/Contact'
import animateUnderline from "../utils/animateUnderline";

const WebDevelopment = () => {
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
                <Contact />
            </main>
        </>
    );
}

export default WebDevelopment;