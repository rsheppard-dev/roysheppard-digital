import { useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Script from 'next/script'
import { gsap, TweenLite } from 'gsap'
import About from '../components/About'
import Hero from '../components/Hero'
import Services from '../components/Services'

export default function Home() {

  useEffect(() => {
    const { CSSRulePlugin } = require("gsap/CSSRulePlugin")
    const { ScrollTrigger } = require("gsap/ScrollTrigger")

    gsap.registerPlugin(ScrollTrigger, CSSRulePlugin)

    const underline = CSSRulePlugin.getRule(".underline:after")

    TweenLite.set(underline, {
      cssRule: { width: 0 }
    })

    ScrollTrigger.create({
      trigger: '#about-section',
      start: 'top center',
      animation: TweenLite.to(underline, 1, {
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

      <Hero />

      <About />

      <Services />

      <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js' />
    </>
  )
}