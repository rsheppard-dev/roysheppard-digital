import Head from 'next/head'
import Image from 'next/image'
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
                            Website design is an important factor for determining credibility for 48% of visitors
                    </div>

                    <p>I design websites that are tailor made with your business in mind. All my websites are included with the following as standard…</p>

                    <div className={styles.featuresBox}>
                        <div className={styles.featuresHeader}>
                            <Image
                                src="/images/lightning.png"
                                alt="bullet point"
                                width={60}
                                height={60}
                            />
                            <h3>UI/UX web design</h3>
                        </div>
                        <p>Understanding user experience and user interface design are important concepts when designing any website but especially when working with business websites.</p>
                    </div>
                    <div className={styles.featuresBox}>
                        <div className={styles.featuresHeader}>
                            <Image
                                src="/images/lightning.png"
                                alt="bullet point"
                                width={60}
                                height={60}
                            />
                            <h3>Responsive web design</h3>
                        </div>
                        <p>My websites are made to respond to whatever device your users choose to use, whether that’s a mobile, tablet, laptop or a 4K monitor.</p>
                    </div>
                    <div className={styles.featuresBox}>
                        <div className={styles.featuresHeader}>
                            <Image
                                src="/images/lightning.png"
                                alt="bullet point"
                                width={60}
                                height={60}
                            />
                            <h3>Accessibility</h3>
                        </div>
                        <p>People with different disabilities will use your site and it is important their experience is a positive one. My sites use best practice methods to ensure these user can still navigate your website successfully.</p>
                    </div>
                    <div className={styles.featuresBox}>
                        <div className={styles.featuresHeader}>
                            <Image
                                src="/images/lightning.png"
                                alt="bullet point"
                                width={60}
                                height={60}
                            />
                            <h3>SEO optimisation</h3>
                        </div>
                        <p>There is no point having an amazing website if no-one can find it. My websites are optimised to stand the best chance of being found by your intended users.</p>
                    </div>
                    <div className={styles.featuresBox}>
                        <div className={styles.featuresHeader}>
                            <Image
                                src="/images/lightning.png"
                                alt="bullet point"
                                width={60}
                                height={60}
                            />
                            <h3>Google analytics</h3>
                        </div>
                        <p>Analytics data helps you learn who is visiting your site and how they are using it to help you improve your users’ experience as well as improving your conversions and sales.</p>
                    </div>
                </section>
                
                <Contact />
            </main>
        </>
    );
}

export default WebDesign;