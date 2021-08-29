import Image from 'next/image'
import styles from '../styles/Home.module.scss'

const About = () => {

  return (
    <section id="about-section" className="container mb-5">

      <h1 className={styles.heading}><span className='underline'>Freelance Web Designer and Developer in Watford</span></h1>

      <div className="row"><div className="col-md-4 order-md-1 d-flex justify-content-center">
        <Image
          src='/images/web-developer-watford.png'
          alt='Roy Sheppard - website designer and developer'
          width={250}
          height={250}
          className='pb-4'
        />
      </div>

        <div className="col-md-8 order-md-12">
          <div className={styles.aboutText}>
            <p>My name is Roy Sheppard and I am a freelance web designer and full-stack web developer based in Watford, Hertfordshire.</p>

            <p>I take pride in creating engaging websites that don't just look good, but also solve problems for you and your users.</p>

            <p className="mb-5">I would love to work with you to find out what you want to get out of a website and come up with solutions to drive more customers to your business.</p>

            <Image
              src='/images/signature.svg'
              alt='Roy Sheppard signature'
              width={200}
              height={100}
            />
          </div>
        </div>
      </div>

    </section>
  );
}

export default About;