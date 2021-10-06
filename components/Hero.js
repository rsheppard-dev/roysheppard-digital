import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Hero.module.scss'

const Hero = () => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        
        if (screen.width < 992) setIsVisible(false)

    }, [isVisible])

    return (
        <section id="hero-section" className="container">
            <div className="row">
                <div className="col-lg my-auto">
                    <h1 className={styles.headingSmall}>Freelance web designer and developer in Watford</h1>

                    <span className={styles.headingLarge}>I create <span className={styles.highlighted}>amazing websites</span> you and your users will love</span>

                    <button className="button button-large">Free consultation</button>
                </div>

                <div id="hero-image" className="col-lg my-auto d-none d-lg-block">
                    <Image
                        src='/images/web-developer-watford.png'
                        alt='Roy Sheppard - website designer and developer'
                        width={745}
                        height={723}
                        layout='intrinsic'
                        priority={isVisible}
                    />
                </div>
            </div>

        </section>
    );
}

export default Hero;