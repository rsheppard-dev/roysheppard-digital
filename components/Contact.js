import Image from 'next/image'

const Contact = () => {
    return (
        <section id="contact-section" className="container">
            <h2 className="heading-medium">Get in touch</h2>

            <div className="row">
                <div className="col-md-6 align-items-center d-flex flex-column flex-sm-row flex-md-column order-md-2 mb-3">


                    <Image
                        src='/images/web-designer-contact.png'
                        alt='Roy Sheppard'
                        width={260}
                        height={260}
                        layout='intrinsic'
                    />

                    <div className="row row-cols-2 m-5">
                        <div className="col-2">
                            <Image
                                src='/images/call.svg'
                                alt='Phone number'
                                width={30}
                                height={30}
                                layout='fixed'
                            />
                        </div>

                        <div className="col-10">
                            <a href="tel:07883066944">07883066944</a>
                        </div>

                        <div className="col-2">
                            <Image
                                src='/images/email.svg'
                                alt='Email'
                                width={30}
                                height={30}
                                layout='fixed'
                            />
                        </div>

                        <div className="col-10">
                            <a href="mailto:info@roysheppard.digital">info@roysheppard.digital</a>
                        </div>
                    </div>
                </div>
                <hr className="d-md-none" />


                <div className="col-md-6 d-flex flex-column justify-content-center order-md-1">
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

            </div>

        </section >
    );
}

export default Contact;