import Head from 'next/head'
// import { Quote } from 'react-bootstrap-icons'
import Contact from '../components/Contact';
import animateUnderline from '../utils/animateUnderline'
import styles from '../styles/Services.module.scss'

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

                    <div className={styles.quoteBox}>
                        {/* <Quote className={styles.quoteIcon} size={45} /> */}
                    </div>
                </section>
                
                <Contact />
            </main>
        </>
    );
}

export default WebDesign;