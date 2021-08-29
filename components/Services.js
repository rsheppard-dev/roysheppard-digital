import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const Services = () => {
    return (
        <section id="services-section" className={styles.subSection}>
            <div className="container">
                <h1 className={styles.heading}>Web Design and Development Services</h1>

                <div className="row d-flex justify-content-between g-4">
                    <div className="col-md-6 col-lg-4">
                        <div className="card text-center rounded-lg h-100">
                            <div className="card-body d-flex flex-column">
                                <h2 className="card-title mb-4">Design</h2>
                                <Image
                                    src='/images/web-design.svg'
                                    alt='Web design'
                                    width={187.11}
                                    height={200}
                                    className='py-3 card-img-top'
                                />
                                <p className="card-text">
                                    Whether you want me to design you a brand new website or redesign your existing website. Get in touch so we can discuss your specific needs.
                                </p>

                                <a href="#" class="btn btn-primary rounded-lg mt-auto">Learn more</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                    <div className="card text-center rounded-lg h-100">
                            <div className="card-body d-flex flex-column">
                                <h2 className="card-title mb-3">Development</h2>
                                <Image
                                    src='/images/web-development.svg'
                                    alt='Web development'
                                    width={187.11}
                                    height={200}
                                    className='py-3 card-img-top'
                                />
                                <p className="card-text">
                                    If you need custom features on your website I can help. This could be a customer area that requires users to login to see unique data, or a schedule for you and your employees when booking client appointments.
                                </p>

                                <a href="#" class="btn btn-primary rounded-lg mt-auto">Learn more</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                    <div className="card text-center rounded-lg h-100">
                            <div className="card-body d-flex flex-column">
                                <h2 className="card-title mb-3">eCommerce</h2>
                                <Image
                                    src='/images/e-commerce.svg'
                                    alt='eCommerce'
                                    width={187.11}
                                    height={200}
                                    className='py-3 card-img-top'
                                />
                                <p className="card-text">
                                    An online store can really boost your business. More people are shopping online than ever before. Get in touch to learn about how I can help.
                                </p>

                                <a href="#" className="btn btn-primary rounded-lg mt-auto">Learn more</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
