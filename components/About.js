import Image from 'next/image'
import animateUnderline from '../utils/animateUnderline'

const About = () => {

  animateUnderline();

  return (
    <section id="about-section" className="container">
      <h2 className="heading-medium">Do you want to <span className="underline">drive more customers to your business</span> with a digital presence?</h2>

      <p>My name is Roy Sheppard and I am a freelance web designer and full-stack web developer based in Watford, Hertfordshire.</p>

      <p>I take pride in creating engaging websites that don't just look good, but are fast, responsive and convert vistors into customers.</p>

      <p>I would love to work with you to find out what you want to get out of a website and come up with solutions to drive more customers to your business.</p>

    </section>
  );
}

export default About;