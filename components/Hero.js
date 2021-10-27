import { useState, useEffect } from 'react'
import Image from 'next/image'
import { openPopupWidget } from 'react-calendly'
import styles from '../styles/Hero.module.scss'
import * as gtag from '../lib/gtag'
import { TruckFlatbed } from 'react-bootstrap-icons'

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false)

    const CTA = ({ url }) => {
        const onClick = () => {
            gtag.event({
                action: 'book_strategy_call',
                category: 'Engagement',
                label: 'Hero section button',
            })
            
            openPopupWidget({ url  })
        }

        return <a className="button button-large" onClick={onClick}>Book a free strategy call</a>;
    };

    useEffect(() => {

        if (screen.width > 992) setIsVisible(true)

    }, [isVisible])

    return (
        <section id="hero-section" className="container">
            <div className="row">
                <div className="col-lg my-auto">
                    <h1 className={styles.headingSmall}>Freelance web designer and developer in Watford</h1>

                    <h2 className={styles.headingLarge}>I create <span className={styles.highlighted}>amazing websites</span> you and your users will love</h2>

                    <CTA url='https://calendly.com/roysheppard-digital/30min?background_color=f5f5f5&text_color=474747&primary_color=ab5b5b' />
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