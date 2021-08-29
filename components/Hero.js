import { useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/home.module.scss'
import gsap from 'gsap'

const Hero = () => {

    const el = useRef()
    const q = gsap.utils.selector(el)
    const tl = useRef()

    useEffect(() => {
        tl.current = gsap.timeline({ defaults: { opacity: 1, duration: 0.5 } })
            .to(q('.fadeIn1'), { delay: 1 })
            .to(q('.fadeIn2'), {})
            .to(q('.fadeIn3'), {})

    }, [])

    return (
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
    );
}

export default Hero;