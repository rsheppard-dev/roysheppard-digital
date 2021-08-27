import { useRef, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Script from 'next/script'
import { gsap, TweenLite } from 'gsap'

export default function Home() {

  const lineRef = useRef()

  useEffect(() => {
    const { CSSRulePlugin } = require("gsap/CSSRulePlugin")
    const { ScrollTrigger } = require("gsap/ScrollTrigger")

    gsap.registerPlugin(ScrollTrigger, CSSRulePlugin)

    const underline = CSSRulePlugin.getRule(".underline:after")

    TweenLite.set(underline, {
      cssRule: { width: 0 }
    })

    ScrollTrigger.create({
      trigger: '.about',
      start: 'top center',
      animation: TweenLite.to(underline, 1.5, {
        cssRule: { width: '100%' }
      })
    })
  }, [])

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
          <h1 className={styles.heading}><span className='underline' ref={lineRef}>Freelance web designer and developer in Watford</span></h1>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 d-flex flex-column justify-content-end align-items-center">
            <Image
              src='/images/web-developer-watford.png'
              width={317}
              height={391}
              className={`${styles.aboutImage} mb-4 mb-md-0`}
              layout='intrinsic'
              alt='Roy Sheppard, web designer and developer'
            />
          </div>

          <div className="col-md-8 order-md-1">
            <p>My name is Roy Sheppard and I am a freelance web designer and full-stack web developer based in Watford, Hertfordshire.</p>

            <p>I take pride in creating engaging websites that don't just look good, but also solve problems for you and your users.</p>

            <p>I would love to work with you to find out what you want to get out of a website and come up with solutions to drive more customers to your business.</p>
          </div>
        </div>


      </section>

      <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js' />
    </>
  )
}