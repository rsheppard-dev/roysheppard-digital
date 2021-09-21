import { useEffect } from 'react'
import { gsap, TweenLite } from 'gsap'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const About = () => {

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
    <section id="about-section" className="container mb-5">

      <h1 className={styles.heading}><span className='underline'>Freelance Web Designer and Developer in Watford</span></h1>

      <div className="row"><div className="col-md-4 order-md-1 d-flex justify-content-center align-items-center">
        <Image
          src='/images/web-developer-watford.png'
          alt='Roy Sheppard - website designer and developer'
          width={469}
          height={469}
          className={`${styles.aboutImage} mb-4 mb-md-0`}
        />
      </div>

        <div className="col-md-8 order-md-12 d-flex align-items-center">
          <div className={styles.aboutText}>
            <p>My name is Roy Sheppard and I am a freelance web designer and full-stack web developer based in Watford, Hertfordshire.</p>

            <p>I take pride in creating engaging websites that don't just look good, but also solve problems for you and your users.</p>

            <p>I would love to work with you to find out what you want to get out of a website and come up with solutions to drive more customers to your business.</p>

          </div>
        </div>
      </div>

    </section>
  );
}

export default About;