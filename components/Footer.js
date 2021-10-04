import Image from 'next/image'
import logo from '../public/images/logo.svg'
import styles from '../styles/Footer.module.scss'

const Footer = () => {
    return (
        <footer className="container">
            <hr />

            <div className="row gy-3">
                <div className="col-6 col-md-4 order-md-2">
                    <h4 className={styles.heading}>Navigation</h4>
                    <ul className={styles.navItem}>
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>FAQ</li>
                        <li>Contact</li>
                    </ul>
                </div>

                <div className="col-6 col-md-4 order-md-3">
                    <h4 className={styles.heading}>Services</h4>
                    <ul className={styles.navItem}>
                        <li>Web design</li>
                        <li>Web development</li>
                        <li>eCommerce</li>
                    </ul>
                </div>

                <div className="col-12 col-md-4 order-md-1">
                    <Image
                        src={logo}
                        alt="Roy Sheppard Digital"
                        layout="fixed"
                        width={174}
                        height={45}
                    />
                    <p className={styles.navItem}>Privacy policy</p>

                    <div>
                        <ul className={styles.socialItem}>
                            <li>
                                <Image
                                    src="/images/facebook.svg"
                                    alt="Facebook"
                                    layout="fixed"
                                    width={30}
                                    height={30}
                                />
                            </li>
                            <li>
                                <Image
                                    src="/images/instagram.svg"
                                    alt="Instagram"
                                    layout="fixed"
                                    width={30}
                                    height={30}
                                />
                            </li>
                            <li>
                                <Image
                                    src="/images/linkedin.svg"
                                    alt="LinkedIn"
                                    layout="fixed"
                                    width={30}
                                    height={30}
                                />
                            </li>
                            <li>
                                <Image
                                    src="/images/twitter.svg"
                                    alt="Twitter"
                                    layout="fixed"
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