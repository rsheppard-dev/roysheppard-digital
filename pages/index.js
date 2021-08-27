import { useRef } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Script from 'next/script'
import { gsap } from 'gsap'

export default function Home() {

  const lineRef = useRef()

  return (
    <>
      <Head>
        <title>Roy Sheppard Digital - Freelance web designer and full-stack developer from Watford, Hertfordshire</title>
        <meta name="description" content="Freelance web designer and full-stack developer from Watford, Hertfordshire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section id="hero-section" className={`${styles.heroContainer} d-none d-md-block`}>

        <Image
          src='/images/web-designer-watford.png'
          className={styles.heroImage}
          alt="Roy Sheppard - Freelance web designer and full-stack developer"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
        />

        <div className={styles.heroOverlay}>

          <div className="container">

            <h1 className={styles.heroSubtext}>Freelance web designer and developer in Watford</h1>

            <span className={styles.heroText}>I create amazing websites you and your users will love</span>

            <button className={`btn btn-lg ${styles.callToAction}`}>Free Consultation</button>

          </div>

        </div>

      </section>

      <section className="about container">
        <div>
          <h1 className={styles.heading}><span className={styles.underline}>Freelance web designer and developer in Watford</span></h1>
          </div>

      </section>

      <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js' />
    </>
  )
}