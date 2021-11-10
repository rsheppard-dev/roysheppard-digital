import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import Contact from '../components/Contact'
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
                        <FontAwesomeIcon icon={faQuoteLeft} className={styles.quoteIcon} />
                        <p>
                            Website design is an important factor for determining credibility for 48% of visitors
                        </p>
                    </div>

                    <p>I don't just make websites. I make websites that are tailored to you and your business. They are designed to solve problems so you can get back to focusing on running your business.</p>

                    <div className="row g-4">
                        <div className="col">
                            <div className={`${styles.card} card h-100`}>
                                <span className={styles.cardNumber}>1</span>
                                <div className="card-body">
                                    <h3 className="card-title subHeading">Responsiveness</h3>
                                    <p className="card-text">All my websites are designed to work on different devices; from a mobile phone, to a tablet to the latest 4K monitor.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className={`${styles.card} card h-100`}>
                                <span className={styles.cardNumber}>2</span>
                                <div className="card-body">
                                    <h3 className="card-title subHeading">Accessibility</h3>
                                    <p className="card-text">My websites are made to be accessibile for all users. Care is taken to ensure users with disabilities can still easily navigate and use your website.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className={`${styles.card} card h-100`}>
                                <span className={styles.cardNumber}>3</span>
                                <div className="card-body">
                                    <h3 className="card-title subHeading">SEO</h3>
                                    <p className="card-text">There's no point having an amazing website if no one can find it. All websites made to me are optimised to stand the best chance of being found by search engines.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <Contact />
            </main>
        </>
    );
}

export default WebDesign;