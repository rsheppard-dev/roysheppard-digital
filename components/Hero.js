import { useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
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

    }, [q])

    return (
        <section id="hero-section" className={`${styles.heroContainer} container`}>
            <div className="row">
                <div className="col-lg my-auto">
                    <h1 className="fadeIn2">Freelance web designer and developer in Watford</h1>

                    <span className="heading-large fadeIn1">I create amazing websites you and your users will love</span>

                    <button className="button button-large fadeIn3">Free consultation</button>
                </div>

                <div className="col-lg my-auto d-none d-lg-block">
                    <Image
                        src='/images/web-developer-watford.png'
                        alt='Roy Sheppard - website designer and developer'
                        width={745}
                        height={723}
                        layout='intrinsic'
                        priority='true'
                    />
                </div>
            </div>

        </section>
    );
}

export default Hero;