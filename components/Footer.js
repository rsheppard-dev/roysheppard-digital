import Image from 'next/image'
import Link from 'next/link'
import logo from '../public/images/logo.png'
import styles from '../styles/Footer.module.scss'

const Footer = () => {
    return (
        <footer className="container">
            <hr />

            <div className="row gy-3">
                <div className="col-6 col-md-4 order-md-2">
                    <h4 className={styles.heading}>Navigation</h4>
                    <ul className={styles.navItem}>
                        <li><Link href="/#"><a>Home</a></Link></li>
                        <li><Link href="/#about-section"><a>About</a></Link></li>
                        <li><Link href="/#services-section"><a>Services</a></Link></li>
                        <li><Link href="/#faq-section"><a>FAQ</a></Link></li>
                        <li><Link href="/#contact-section"><a>Contact</a></Link></li>
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
                        <Link href="/#"><a>
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
                                <Image
                                    src="/images/facebook.svg"
                                    alt="Facebook"
                                    layout="intrinsic"
                                    width={30}
                                    height={30}
                                />
                            </li>
                            <li>
                                <Image
                                    src="/images/instagram.svg"
                                    alt="Instagram"
                                    layout="intrinsic"
                                    width={30}
                                    height={30}
                                />
                            </li>
                            <li>
                                <Image
                                    src="/images/linkedin.svg"
                                    alt="LinkedIn"
                                    layout="intrinsic"
                                    width={30}
                                    height={30}
                                />
                            </li>
                            <li>
                                <Image
                                    src="/images/twitter.svg"
                                    alt="Twitter"
                                    layout="intrinsic"
                                    width={30}
                                    height={30}
                                />
                            </li>
                        </ul>

                    </div>
                </div>
            </div>

        </footer>
    );
}

export default Footer;