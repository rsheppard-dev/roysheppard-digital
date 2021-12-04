import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Contact from '../components/Contact';
import animateUnderline from '../utils/animateUnderline';
import styles from '../styles/Services.module.scss';

const WebDesign = () => {
	animateUnderline();

	return (
		<>
			<Head>
				<title>Web Designer Watford - Roy Sheppard Digital</title>
				<meta
					name='description'
					content='Get in touch today for a FREE web design strategy call. I am Roy Sheppard, a freelance web designer and developer from Watford.'
				/>
			</Head>
			<main>
				<section className='container'>
					<h1 className='heading'>
						<span className='underline'>Web design</span> that works for you
					</h1>

					<div className={styles.quoteBox}>
						Website design is an important factor for determining credibility
						for 48% of visitors
					</div>

					<p className={styles.statement}>
						I design websites that are tailor made with your business in mind.
						All my websites are included with the following as standard…
					</p>

					<ul>
						<li className={styles.bulletLightning}>
							<h3>UI/UX web design</h3>
							<p>
								Understanding user experience and user interface design are
								important concepts when designing any website but especially
								when working with business websites where customer interaction
								and engagement are critical.
							</p>
						</li>
						<li className={styles.bulletLightning}>
							<h3>Responsive web design</h3>
							<p>
								My websites are made to respond to whatever device your users
								choose to use, whether that’s a mobile, tablet, laptop or a
								widescreen monitor.
							</p>
						</li>
						<li className={styles.bulletLightning}>
							<h3>Accessibility</h3>
							<p>
								People with different disabilities will use your site and it is
								important their experience is a positive one. My sites use best
								practice methods to ensure everyone can navigate your website
								successfully.
							</p>
						</li>
						<li className={styles.bulletLightning}>
							<h3>SEO optimisation</h3>
							<p>
								There is no point having an amazing website if no-one can find
								it. My websites are optimised to stand the best chance of being
								found by your intended users.
							</p>
						</li>
						<li className={styles.bulletLightning}>
							<h3>Google analytics</h3>
							<p>
								Analytics data helps you learn who is visiting your site and how
								they are using it to help you improve your users’ experience as
								well as improving your conversions and sales.
							</p>
						</li>
					</ul>

					<Link href='/web-design#contact-section'>
						<a className='button button-large mt-5'>Ready to get started?</a>
					</Link>

					<h2 className='heading'>
						My <span className='underline'>web design</span> process
					</h2>

					<div className={styles.grid}>
						<div className={styles.cardProcess}>
							<div className={styles.cardProcessNumber}>1</div>
							<h3 className='subHeading'>Wireframe</h3>
							<Image
								src='/images/wireframe.svg'
								alt='Wireframe'
								width={100}
								height={100}
							/>
							<p>
								A basic wireframe is drawn up to begin with, to determine what
								the basic structure of your website will be.
							</p>
						</div>

						<div className={styles.cardProcess}>
							<div className={styles.cardProcessNumber}>2</div>
							<h3 className='subHeading'>Mockup</h3>
							<Image
								src='/images/mockup.svg'
								alt='Mockup'
								width={100}
								height={100}
							/>
							<p>
								A prototype of the home page is created with the content you
								supplied. This is submitted to you for review. Now you can let
								me know about any revisions or additions you wish to make.
							</p>
						</div>

						<div className={styles.cardProcess}>
							<div className={styles.cardProcessNumber}>3</div>
							<h3 className='subHeading'>Code</h3>
							<Image
								src='/images/code.svg'
								alt='Code'
								width={100}
								height={100}
							/>
							<p>
								Once you have signed off on the design mockup, I will begin
								coding your site and integrating any features you have
								requested.
							</p>
						</div>

						<div className={styles.cardProcess}>
							<div className={styles.cardProcessNumber}>4</div>
							<h3 className='subHeading'>Test</h3>
							<Image
								src='/images/test.svg'
								alt='Test'
								width={100}
								height={100}
							/>
							<p>
								Once your website is complete it is reviewed and tested to
								ensure it operates correctly on different browsers and operating
								systems. As well as ensuring it is responsive on all devices.
							</p>
						</div>

						<div className={styles.cardProcess}>
							<div className={styles.cardProcessNumber}>5</div>
							<h3 className='subHeading'>Deploy</h3>
							<Image
								src='/images/deploy.svg'
								alt='Deploy'
								width={100}
								height={100}
							/>
							<p>
								Once everything has been checked and you are satisfied, your
								site is deployed and handed over to you. Time to reap the
								benefits of having a lead generating website.
							</p>
						</div>
					</div>
				</section>

				<Contact />
			</main>
		</>
	);
};

export default WebDesign;
