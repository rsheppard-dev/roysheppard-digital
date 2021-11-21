import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
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
  SiGraphql
} from "react-icons/si";
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
            <FontAwesomeIcon icon={faQuoteLeft} className={styles.quoteIcon} />
            42% of people will leave a website because of poor functionality.
          </div>

          <p className={styles.statement}>
            I specialise in making bespoke functionality for your website. I
            understand that every business is unique and has unique needs. A
            good developer can come up with solutions that solve problems -
            giving you back your time to focus on your business.
          </p>

          <h2 className="heading">
            <span className="underline">Web development</span> skills
          </h2>

          <p className={styles.statement}>I am an experienced full-stack developer who has worked with many technologies, including modern JAMstack tools. I beleive in using the right tool for the job, depending on your specific needs. Here are a handful of the development tools I work with...</p>

          <div className={styles.skillGrid}>
            <div className={styles.skill}>
              <SiHtml5 size={60} />
            </div>
            <div className={styles.skill}>
              <SiCss3 size={60} />
            </div>
            <div className={styles.skill}>
              <SiSass size={60} />
            </div>
            <div className={styles.skill}>
              <SiBootstrap size={60} />
            </div>
            <div className={styles.skill}>
              <SiTailwindcss size={60} />
            </div>
            <div className={styles.skill}>
              <SiJavascript size={60} />
            </div>
            <div className={styles.skill}>
              <SiReact size={60} />
            </div>
            <div className={styles.skill}>
              <SiNextdotjs size={60} />
            </div>
            <div className={styles.skill}>
              <SiGraphql size={60} />
            </div>
            <div className={styles.skill}>
              <SiWordpress size={60} />
            </div>
            <div className={styles.skill}>
              <SiNodedotjs size={60} />
            </div>
            <div className={styles.skill}>
              <SiMongodb size={60} />
            </div>
            <div className={styles.skill}>
              <SiPhp size={60} />
            </div>
          </div>
        </section>
        <Contact />
      </main>
    </>
  );
};

export default WebDevelopment;
