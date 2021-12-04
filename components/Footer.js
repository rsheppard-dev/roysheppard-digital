import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/images/logo.gif';
import styles from '../styles/Footer.module.scss';
import {
	FaFacebookSquare,
	FaTwitterSquare,
	FaLinkedin,
	FaInstagramSquare,
} from 'react-icons/fa';

const Footer = () => {
	return (
		<footer className='container mb-1'>
			<hr />

			<div className='row gy-3'>
				<div className='col-6 col-md-4 order-md-2'>
					<h3 className={styles.heading}>Navigation</h3>
					<ul className={styles.navItem}>
						<li>
							<Link href='/web-design-watford'>
								<a>Home</a>
							</Link>
						</li>
						<li>
							<Link href='/web-design-watford/#about-section'>
								<a>About</a>
							</Link>
						</li>
						<li>
							<Link href='/web-design-watford/#services-section'>
								<a>Services</a>
							</Link>
						</li>
						<li>
							<Link href='/web-design-watford/#faq-section'>
								<a>FAQ</a>
							</Link>
						</li>
						<li>
							<Link href='/web-design-watford/#contact-section'>
								<a>Contact</a>
							</Link>
						</li>
					</ul>
				</div>

				<div className='col-6 col-md-4 order-md-3'>
					<h3 className={styles.heading}>Services</h3>
					<ul className={styles.navItem}>
						<li>
							<Link href='/web-design'>
								<a>Web design</a>
							</Link>
						</li>
						<li>
							<Link href='/web-development'>
								<a>Web development</a>
							</Link>
						</li>
						<li>
							<Link href='/ecommerce'>
								<a>eCommerce</a>
							</Link>
						</li>
					</ul>
				</div>

				<div className='col-12 col-md-4 order-md-1 d-flex flex-md-column justify-content-between align-items-end align-items-md-start'>
					<div>
						<Link href='/web-design-watford'>
							<a>
								<Image
									src={logo}
									alt='Roy Sheppard Digital'
									layout='intrinsic'
									width={174}
									height={46.81}
								/>
							</a>
						</Link>
						<p className={`${styles.navItem} mt-2`}>
							<Link href='/privacy-policy'>
								<a>Privacy policy</a>
							</Link>
						</p>
						<p className={`${styles.navItem} mt-0`}>
							<Link href='/terms-of-service'>
								<a>Terms of service</a>
							</Link>
						</p>
					</div>

					<div>
						<ul className={styles.socialItem}>
							<li>
								<a
									href='https://www.facebook.com/roysheppard.digital'
									target='_blank'
									rel='noreferrer'
								>
									<FaFacebookSquare size={40} color='#4867AA' />
								</a>
							</li>
							<li>
								<a
									href='https://twitter.com/rsheppard_dev'
									target='_blank'
									rel='noreferrer'
								>
									<FaTwitterSquare size={40} color='#55ADED' />
								</a>
							</li>
							<li>
								<a
									href='https://www.instagram.com/roysheppard.digital'
									target='_blank'
									rel='noreferrer'
								>
									<FaInstagramSquare size={40} color='#cd486b' />
								</a>
							</li>
							<li>
								<a
									href='https://www.linkedin.com/in/roysheppard-digital'
									target='_blank'
									rel='noreferrer'
								>
									<FaLinkedin size={40} color='#0177B5' />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<style jsx>{`
				a {
					background: none;
				}

				a:hover {
					background: none;
				}
			`}</style>
		</footer>
	);
};

export default Footer;
