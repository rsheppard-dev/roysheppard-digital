import Image from 'next/image'

const Contact = () => {
    const handleOnSubmit = async (e) => {
        e.preventDefault()

        const formData = {}

        Array.from(e.currentTarget.elements).forEach(field => {
            if (!field.name) return

            formData[field.name] = field.value;
        })

        fetch('/api/mail', {
            method: 'post',
            body: JSON.stringify(formData)
        })

        console.log(formData)
    }

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

                    <div className="row row-cols-2 d-flex align-self-start align-self-sm-center mt-5 mt-sm-0 mt-md-5 ms-sm-3">
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
                    <form method="post" onSubmit={handleOnSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full name</label>
                            <input type="text" className="form-control" id="name" name="name" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone number</label>
                            <input type="phone" className="form-control" id="phone" name="phone" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea className="form-control" id="message" name="message" rows="3" />
                        </div>

                        <button type="submit" className="button">Send message</button>
                    </form>
                </div>

            </div>

        </section >
    );
}

export default Contact;