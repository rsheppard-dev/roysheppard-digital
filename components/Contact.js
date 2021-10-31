import { useRef, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import * as gtag from '../lib/gtag'
import { EnvelopeFill, TelephoneFill } from 'react-bootstrap-icons'
import styles from '../styles/Contact.module.scss'

import ReCAPTCHA from 'react-google-recaptcha'

const Contact = () => {
    const [isSending, setIsSending] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()
    
    const { ref, inView } = useInView({
        triggerOnce: true
    })

    const recaptchaRef = useRef()

    const CTA = ({ url }) => {
        const onClick = async () => {
            // dynamically load react-calendly
            const { openPopupWidget } = (await import('react-calendly'))

            openPopupWidget({ url })

            gtag.event({
                action: 'book_strategy_call',
                category: 'Engagement',
                label: 'Contact section link'
            })
        }

        return <a className="cta-link" onClick={onClick}>Click here to book a free strategy call at a time that suits you.</a>;
    }
    
    const onSubmitForm = async (data, e) => {
        setIsSending(true)

        const token = await recaptchaRef.current.executeAsync()
        recaptchaRef.current.reset()
        data.token = token

        fetch('/api/mail', {
            method: 'post',
            body: JSON.stringify(data)
        })
        
        setIsSending(false)
        e.target.reset()

        // dynamically load snackbar
        const Snackbar = (await import('../utils/snackbar')).default
        const snackbar = new Snackbar()
        snackbar.init()
        snackbar.show('Your message has been sent.')

        gtag.event({
            action: 'send_message',
            category: 'Contact',
            label: data.message
        })
    }

    return (
        <section id="contact-section" className="container" ref={ref}>
            <h2 className="heading">Get in touch</h2>

            <p>I offer a <u>free 30 minute strategy call</u> to anyone that is looking to get their business online or is struggling to grow.</p>

            <p><CTA url='https://calendly.com/roysheppard-digital/30min?background_color=f5f5f5&text_color=474747&primary_color=ab5b5b' /></p>

            <p>If you want to hire me or for anything else please contact me through the methods below.</p>

            <div className="row">
                <div className="col-md-6 align-items-center d-flex flex-column flex-sm-row flex-md-column order-md-2 my-3">


                    <Image
                        src='/images/web-designer-contact.png'
                        alt='Roy Sheppard'
                        width={260}
                        height={260}
                        layout='intrinsic'
                    />

                    <div className="row row-cols-2 d-flex align-self-start align-self-sm-center mt-5 mt-sm-0 mt-md-5 ms-sm-3">
                        <div className="col-2 my-auto">
                            <TelephoneFill size={30} className={styles.phoneIcon} />
                        </div>

                        <div className="col-10 my-auto">
                            <a href="tel:07883066944" className={styles.phoneLink}>07883066944</a>
                        </div>

                        <div className="col-2 my-auto">
                            <EnvelopeFill size={30} className={styles.emailIcon} />
                        </div>

                        <div className="col-10 my-auto">
                            <a href="mailto:info@roysheppard.digital" className={styles.emailLink}>info@roysheppard.digital</a>
                        </div>
                    </div>
                </div>
                <hr className="d-md-none" />


                <div className="col-md-6 d-flex flex-column justify-content-center order-md-1 my-3">
                    <form method="post" onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full name *</label>
                            <input type="text" className={`form-control ${errors.name && 'border border-danger'}`} id="name" {...register('name', { required: 'Name is required.', minLength: { value: 4, message: 'Minimum name length is 4 characters.' } })} />
                            { errors.name && <small className="text-danger">{errors.name.message}</small> }
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email *</label>
                            <input type="email" className={`form-control ${errors.email && 'border border-danger'}`} id="email" {...register('email', { required: 'Email is required.', pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'You must enter a valid email address.' } })} />
                            { errors.email && <small className="text-danger">{errors.email.message}</small> }
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone number</label>
                            <input type="phone" className={`form-control ${errors.phone && 'border border-danger'}`} id="phone" {...register('phone', { pattern: { value: /^[0-9]*$/, message: 'Phone number can only include numbers.' }, minLength: { value: 11, message: 'Phone number must be at least 11 numbers.' } })} />
                            { errors.phone && <small className="text-danger">{errors.phone.message}</small> }
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message *</label>
                            <textarea className={`form-control ${errors.message && 'border border-danger'}`} id="message" rows="3" {...register('message', { required: 'Message is required.', minLength: { value: 10, message: 'Minimum length of message is 10 characters.' } })} />
                            { errors.message && <small className="text-danger">{errors.message.message}</small> }
                        </div>

                        <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                            size='invisible'
                            ref={recaptchaRef}
                        />

                        <button type="submit" className="button" disabled={isSending}>{isSending ? 'Sending.....' : 'Send message'}</button>
                        <small>This site is protected by reCAPTCHA and the Google <a target="_blank" href="https://policies.google.com/privacy" rel="noreferrer">Privacy Policy</a> and <a target="_blank" href="https://policies.google.com/terms" rel="noreferrer">Terms of Service</a> apply.
                        </small>
                    </form>
                </div>

            </div>

            <style jsx> {`
                button {
                    width: 180px;
                }           
            `} </style>

        </section>
    );
}

export default Contact;
