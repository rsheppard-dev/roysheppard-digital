import { useRef, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Script from 'next/script'
import { gsap, TweenLite } from 'gsap'

export default function Home() {

  const el = useRef()
  const q = gsap.utils.selector(el)
  const tl = useRef()

  useEffect(() => {
    const { CSSRulePlugin } = require("gsap/CSSRulePlugin")
    const { ScrollTrigger } = require("gsap/ScrollTrigger")

    gsap.registerPlugin(ScrollTrigger, CSSRulePlugin)

    const underline = CSSRulePlugin.getRule(".underline:after")

    tl.current = gsap.timeline({ defaults: { opacity: 1, duration: 1 }})
      .to(q('.fadeIn1'), {})
      .to(q('.fadeIn2'), {})
      .to(q('.fadeIn3'), {})

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

          <div className="container" ref={el}>

            <h1 className={`${styles.heroSubtext} fadeIn2`}>Freelance web designer and developer in Watford</h1>

            <span className={`${styles.heroText} fadeIn1`}>I create amazing websites you and your users will love</span>

            <button className={`btn btn-lg fadeIn3 ${styles.callToAction}`}>Free Consultation</button>

          </div>

        </div>

      </section>

      <section className="about container">
        <div className="row">

          <div className="col-md-8">
          
            <h1 className={styles.heading}><span className='underline'>Freelance web designer and developer in Watford</span></h1>

            <div className={styles.yellowBox}>
              <p className={styles.aboutText}>My name is Roy Sheppard and I am a freelance web designer and full-stack web developer based in Watford, Hertfordshire.</p>

              <p className={styles.aboutText}>I take pride in creating engaging websites that don't just look good, but also solve problems for you and your users.</p>

              <p className={styles.aboutText}>I would love to work with you to find out what you want to get out of a website and come up with solutions to drive more customers to your business.</p>
            </div>
          </div>

          <div className="col-md-4 d-flex justify-content-center align-items-end pt-5">
            <Image
              src="/images/web-developer-watford.png"
              width={317}
              height={391}
              className={styles.aboutImage}
              alt="Roy Sheppard, web designer and developer"
            />
          </div>
        </div>


      </section>

      <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js' />
    </>
  )
}