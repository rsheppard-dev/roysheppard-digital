import Image from 'next/image'
import Link from 'next/link';
import animateUnderline from '../utils/animateUnderline';

const Services = () => {

    animateUnderline()

    return (
        <section id="services-section" className="container">
            <h3><span className="underline">Web design</span> and <span className="underline">development</span> services</h3>

            <div className="row row-cols-1 row-cols-lg-2 g-4">
                <div className="col">

                    <div className="card h-100 bg-transparent">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-auto my-auto">
                                    <Image
                                        src='/images/web-design.svg'
                                        alt='Web design'
                                        width={60}
                                        height={60}
                                        layout='fixed'
                                    />
                                </div>

                                <div className="col my-auto">
                                    <h4>Web design</h4>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <p>Whether you want me to design you a brand new website or redesign your existing website, get in touch so we can discuss your specific needs.</p>
                        </div>

                        <div className="card-footer bg-transparent border-0">
                            <Link href="/web-design"><a className="button">More information</a></Link>
                        </div>
                    </div>

                </div>

                <div className="col">
                    <div className="card h-100 bg-transparent">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-auto my-auto">
                                    <Image
                                        src='/images/web-development.svg'
                                        alt='Web development'
                                        width={60}
                                        height={60}
                                        layout='fixed'
                                    />
                                </div>

                                <div className="col my-auto">
                                    <h4>Web development</h4>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <p>If you want a custom feature on your website I can help. This could be a customer area that requires users to login or an online booking system.</p>
                        </div>

                        <div className="card-footer bg-transparent border-0">
                            <Link href="/web-developer"><a className="button">More information</a></Link>
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="card h-100 bg-transparent">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-auto my-auto">
                                    <Image
                                        src='/images/ecommerce.svg'
                                        alt='eCommerce'
                                        width={60}
                                        height={60}
                                        layout='fixed'
                                    />
                                </div>

                                <div className="col my-auto">
                                    <h4>eCommerce</h4>
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <p>An online store can really help your business reach new levels of growth. More people are shopping online than ever before. Get in touch to learn how I can help you reach them.</p>
                        </div>

                        <div className="card-footer bg-transparent border-0">
                            <Link href="/ecommerce"><a className="button">More information</a></Link>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Services;
