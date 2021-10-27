import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/images/logo.png'
import styles from '../styles/Footer.module.scss'
import { Facebook, Instagram, Linkedin, Twitter } from 'react-bootstrap-icons'

const Footer = () => {
    return (
        <footer className="container mb-1">
            <hr />

            <div className="row gy-3">
                <div className="col-6 col-md-4 order-md-2">
                    <h4 className={styles.heading}>Navigation</h4>
                    <ul className={styles.navItem}>
                        <li><Link href="/web-design-watford"><a>Home</a></Link></li>
                        <li><Link href="/web-design-watford/#about-section"><a>About</a></Link></li>
                        <li><Link href="/web-design-watford/#services-section"><a>Services</a></Link></li>
                        <li><Link href="/web-design-watford/#faq-section"><a>FAQ</a></Link></li>
                        <li><Link href="/web-design-watford/#contact-section"><a>Contact</a></Link></li>
                    </ul>
                </div>

                <div className="col-6 col-md-4 order-md-3">
                    <h4 className={styles.heading}>Services</h4>
                    <ul className={styles.navItem}>
                        <li><Link href="/web-design"><a>Web design</a></Link></li>
                        <li><Link href="/web-development"><a>Web development</a></Link></li>
                        <li><Link href="/ecommerce"><a>eCommerce</a></Link></li>
                    </ul>
                </div>

                <div className="col-12 col-md-4 order-md-1 d-flex flex-md-column justify-content-between align-items-end align-items-md-start">
                    <div>
                        <Link href="/web-design-watford"><a>
                            <Image
                                src={logo}
                                alt="Roy Sheppard Digital"
                                layout="intrinsic"
                                width={174}
                                height={45}
                                priority
                            />
                        </a></Link>
                        <p className={`${styles.navItem} mt-2`}><Link href="/privacy-policy"><a>Privacy policy</a></Link></p>
                        <p className={`${styles.navItem} mt-0`}><Link href="/terms-of-service"><a>Terms of service</a></Link></p>
                    </div>

                    <div>
                        <ul className={styles.socialItem}>
                            <li>
                                <Facebook size={30} />
                            </li>
                            <li>
                                <Twitter size={30} />
                            </li>
                            <li>
                                <Linkedin size={30} />
                            </li>
                            <li>
                                <Instagram size={30} />
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

        </footer>
    );
}

export default Footer