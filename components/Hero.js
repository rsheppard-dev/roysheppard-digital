import Image from 'next/image'

const Hero = () => {

    return (
        <section id="hero-section" className="container">
            <div className="row">
                <div className="col-lg my-auto">
                    <h1>Freelance web designer and developer in Watford</h1>

                    <span className="heading-large">I create amazing websites you and your users will love</span>

                    <button className="button button-large">Free consultation</button>
                </div>

                <div className="col-lg my-auto d-none d-lg-block">
                    <Image
                        src='/images/web-developer-watford.png'
                        alt='Roy Sheppard - website designer and developer'
                        width={745}
                        height={723}
                        layout='intrinsic'
                        priority='true'
                    />
                </div>
            </div>

        </section>
    );
}

export default Hero;