import Image from 'next/image'
import animateUnderline from '../utils/animateUnderline'

const About = () => {

  animateUnderline();

  return (
    <section id="about-section" className="container">
      <h2 className="heading-medium">Do you want to drive <span className="underline">more customers</span> to your business with a <span className="underline">digital presence?</span></h2>

      <p>My name is Roy Sheppard and I am a freelance web designer and full-stack web developer based in Watford, Hertfordshire.</p>

      <p>I take pride in creating engaging websites that don't just look good, but are fast, responsive and convert vistors into customers.</p>

      <p>I would love to work with you to find out what you want to get out of a website and come up with solutions to drive more customers to your business.</p>

      <div className="row">
        <div className="col-auto my-auto">
          <h3 className="heading-small">Latest work</h3>
        </div>

        <div className="col my-auto">
          <Image
            src='/images/down-arrow.svg'
            alt='Latest work below'
            width={40}
            height={50}
            layout='fixed'
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-auto d-flex flex-column justify-content-center mb-4 mb-md-0 order-md-2">

          <Image
            src='/images/browser-top.svg'
            alt='Studio120 website'
            width={318}
            height={30}
            layout='fixed'
          />

          <Image
            src='/images/web-design-portfolio.png'
            alt='Studio120 website'
            width={318}
            height={188}
            layout='fixed'
          />
        </div>

        <div className="col-md my-auto order-md-1">
          <h4 className="heading-xsmall mb-3">Studio120</h4>

          <p>A new barber shop that had just opened in Bushey was after a website to help attract new clients.</p>

          <p>The owner was also launching a range of his own products including hair products, clothing and fragrances and wanted his own platform to sell them online.</p>
        </div>
      </div>

      <p><a className="link" href="#">View more projects...</a></p>

    </section>
  );
}

export default About;