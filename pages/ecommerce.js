import Head from "next/head";
import Link from "next/link";
import { FaQuoteLeft, FaCcStripe, FaCcPaypal } from "react-icons/fa";
import { SiShopify, SiWoo } from 'react-icons/si'
import Contact from "../components/Contact";
import animateUnderline from "../utils/animateUnderline";
import styles from "../styles/Services.module.scss";

const Ecommerce = () => {
  animateUnderline();

  return (
    <>
      <Head>
        <title>eCommerce Specialist Watford - Roy Sheppard Digital</title>
        <meta
          name="description"
          content="Freelance eCommerce specialist in Watford, Hertfordshire. Helping businesses grow online."
        />
      </Head>
      <main>
        <section className="container">
          <h1 className="heading">
            Using <span className="underline">eCommerce</span> to future proof
            your business
          </h1>

          <div className={styles.quoteBox}>
            <FaQuoteLeft className={styles.quoteIcon} />
            60% of people said that usability is the most important web design
            characteristic when it comes to online shopping
          </div>

          <p>
            There are many options when deciding to start an ecommerce business
            or when extending an existing business to include online sales. I
            can help you decide what is the best option for you and your target
            market.
          </p>

          <Link href="ecommerce/#contact-section">
            <a className="button button-large">Ready to get started?</a>
          </Link>

          <h2 className="heading">
            <span className="underline">eCommerce</span> tools
          </h2>
          <p>
            From selecting what platform will work best with your business to
            selecting payment processors. I am passionate about helping new and
            existing businesses sell their products and services online.
          </p>
          <div className={styles.skillGrid}>
            <div className={styles.skill}>
              <SiShopify size={60} color="#95BF46" />
            </div>
            <div className={styles.skill}>
              <SiWoo size={60} color="#7B51AD" />
            </div>
            <div className={styles.skill}>
              <FaCcStripe size={60} color="#6771E5" />
            </div>
            <div className={styles.skill}>
              <FaCcPaypal size={60} color="#012069" />
            </div>
          </div>
        </section>

        <Contact />
      </main>
    </>
  );
};

export default Ecommerce;
