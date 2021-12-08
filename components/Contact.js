import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { EnvelopeFill, TelephoneFill } from 'react-bootstrap-icons';
import styles from '../styles/Contact.module.scss';

const Form = dynamic(() => import('../components/Form'));

const Contact = () => {
	const { ref, inView } = useInView({
		triggerOnce: true,
	});

	const CTA = ({ url }) => {
		const onClick = async () => {
			// dynamically load react-calendly
			const { openPopupWidget } = await import('react-calendly');

			openPopupWidget({ url });
		};

		return (
			<a className='cta-link' onClick={onClick}>
				Click here to book a free strategy call at a time that suits you.
			</a>
		);
	};

	return (
		<section id='contact-section' className='container' ref={ref}>
			<h2 className='heading'>Get in touch</h2>

			<p>
				I offer a <u>free 30 minute strategy call</u> to anyone that is looking
				to get their business online or is struggling to grow.
			</p>

			<p>
				<CTA url='https://calendly.com/roysheppard-digital/30min?background_color=f5f5f5&text_color=474747&primary_color=ab5b5b' />
			</p>

			<p>
				If you want to hire me or for anything else please contact me through
				the methods below.
			</p>

			<div className='row'>
				<div className='col-md-6 align-items-center justify-content-center d-flex flex-column flex-sm-row flex-md-column order-md-2 my-3'>
					<Image
						src='/images/web-designer-contact.png'
						alt='Roy Sheppard'
						width={260}
						height={260}
						layout='intrinsic'
					/>

					<div className={styles.contactBox}>
						<span>
							<TelephoneFill size={30} className={styles.phoneIcon} />
							<a href='tel:07883066944' className={styles.phoneLink}>
								07883066944
							</a>
						</span>

						<span>
							<EnvelopeFill size={30} className={styles.emailIcon} />
							<a
								href='mailto:info@roysheppard.digital'
								className={styles.emailLink}
							>
								info@roysheppard.digital
							</a>
						</span>
					</div>
				</div>
				<hr className='d-md-none' />

				<div className='col-md-6 d-flex flex-column justify-content-center order-md-1 my-3'>
					{inView && <Form />}
				</div>
			</div>

			<style jsx>
				{`
					span {
						white-space: nowrap;
						display: block;
					}
				`}
			</style>
		</section>
	);
};

export default Contact;
