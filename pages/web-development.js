import Head from "next/head";
import Link from "next/link";
import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiBootstrap,
  SiTailwindcss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiWordpress,
  SiNodedotjs,
  SiMongodb,
  SiPhp,
  SiGraphql,
} from "react-icons/si";
import { FaQuoteLeft } from "react-icons/fa";
import animateUnderline from "../utils/animateUnderline";
import Contact from "../components/Contact";
import styles from "../styles/Services.module.scss";

const WebDevelopment = () => {
  animateUnderline();

  return (
    <>
      <Head>
        <title>Web Developer Watford - Roy Sheppard Digital</title>
        <meta
          name="description"
          content="Freelance web developer in Watford, Hertfordshire. Helping businesses grow online."
        />
      </Head>
      <main>
        <section className="container">
          <h1 className="heading">
            <span className="underline">Web development</span> that makes
            running your business easier
          </h1>

          <div className={styles.quoteBox}>
            <FaQuoteLeft className={styles.quoteIcon} />
            42% of people will leave a website because of poor functionality
          </div>

          <p className={styles.statement}>
            I specialise in making bespoke functionality for your website. I
            understand that every business is unique and has unique needs. A
            good developer can come up with solutions that solve problems -
            giving you back your time to focus on your business.
          </p>

          <Link href="web-development/#contact-section">
            <a className="button button-large">Ready to get started?</a>
          </Link>

          <h2 className="heading">
            <span className="underline">Web development</span> skills
          </h2>

          <p className={styles.statement}>
            I am an experienced full-stack developer who has worked with many
            tech stacks, including the modern JAMstack. I beleive in using the
            right tools for the job depending on your specific needs. Here are a
            handful of the development tools I work with...
          </p>

          <div className={styles.skillGrid}>
            <div className={styles.skill}>
              <SiHtml5 size={60} color="#E44D27" />
            </div>
            <div className={styles.skill}>
              <SiCss3 size={60} color="#205EA4" />
            </div>
            <div className={styles.skill}>
              <SiSass size={60} color="#C16291" />
            </div>
            <div className={styles.skill}>
              <SiBootstrap size={60} color="#503A74" />
            </div>
            <div className={styles.skill}>
              <SiTailwindcss size={60} color="#18B3C0" />
            </div>
            <div className={styles.skill}>
              <SiJavascript size={60} color="#EBD41B" />
            </div>
            <div className={styles.skill}>
              <SiReact size={60} color="#5CCEED" />
            </div>
            <div className={styles.skill}>
              <SiNextdotjs size={60} color="#000000" />
            </div>
            <div className={styles.skill}>
              <SiGraphql size={60} color="#D92FA2" />
            </div>
            <div className={styles.skill}>
              <SiWordpress size={60} color="#1F6E93" />
            </div>
            <div className={styles.skill}>
              <SiNodedotjs size={60} color="#62975E" />
            </div>
            <div className={styles.skill}>
              <SiMongodb size={60} color="#11A14B" />
            </div>
            <div className={styles.skill}>
              <SiPhp size={60} color="#7175AA" />
            </div>
          </div>
        </section>
        <Contact />
      </main>
    </>
  );
};

export default WebDevelopment;
