import Image from 'next/image'
import styles from '../styles/Contact.module.scss'

const Contact = () => {
    return (
        <section id="contact-section" className="container">
            <h2 className="heading-medium">Get in touch</h2>


            <div className="row">
                <div className="col-md-6 d-flex flex-column justify-content-center">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full name</label>
                            <input type="text" className="form-control" id="name" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone number</label>
                            <input type="phone" className="form-control" id="phone" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea className="form-control" id="message" rows="3" />
                        </div>

                        <button type="submit" className="button">Send message</button>
                    </form>
                </div>

                <div className="col-md-6  align-items-center d-flex flex-md-column">

                    
                        <Image
                            src='/images/web-designer-contact.png'
                            alt='Roy Sheppard'
                            width={250}
                            height={250}
                            layout='intrinsic'
                            className='p-3'
                        />
                    

                    <div className={styles.contactBox}>
                        <div className="row">
                            <div className="col-auto">
                                <Image
                                    src='/images/location.svg'
                                    alt='Location'
                                    width={25}
                                    height={25}
                                    layout='fixed'
                                />
                            </div>

                            <div className="col">
                                <p><span className={styles.address}>Roy Sheppard Digital</span>
                                    <span className={styles.address}>43 Maytree Crescent</span>
                                    <span className={styles.address}>Watford</span>
                                    <span className={styles.address}>WD24 5NJ</span></p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-auto">
                                <Image
                                    src='/images/call.svg'
                                    alt='Phone number'
                                    width={25}
                                    height={25}
                                    layout='fixed'
                                />
                            </div>

                            <div className="col">
                                <p>07883066944</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-auto">
                                <Image
                                    src='/images/email.svg'
                                    alt='Email'
                                    width={25}
                                    height={25}
                                    layout='fixed'
                                />
                            </div>

                            <div className="col">
                                <p>info@roysheppard.digital</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section >
    );
}

export default Contact;