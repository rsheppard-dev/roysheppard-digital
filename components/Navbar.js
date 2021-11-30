import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownCircle } from "react-bootstrap-icons";
import logo from "../public/images/logo.gif";
import styles from "../styles/Navbar.module.scss";

const Navbar = () => {
  useEffect(() => {
    import("bootstrap/js/dist/collapse");
    import("bootstrap/js/dist/dropdown");
  }, []);

  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <nav id="navbar" className="navbar navbar-expand-md navbar-light container">
      <div>
        <Link href="/web-design-watford" prefetch={false}>
          <a className="navbar-brand" onClick={() => setIsOpen(false)}>
            <Image
              src={logo}
              alt="Roy Sheppard Digital"
              layout="intrinsic"
              width={200}
              height={53.8}
              priority={true}
            />
          </a>
        </Link>
      </div>

      <button
        className={`navbar-toggler ${isOpen ? 'false' : 'collapsed'}`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
        onClick={handleClick}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isOpen && 'show'}`} id="navbarNav">
        <ul className={`${styles.navLink} navbar-nav ms-auto`}>
          <li className="nav-item">
            <Link href="/web-design-watford" prefetch={false}>
              <a className={`${styles.link} nav-link`} aria-current="page" onClick={handleClick}>
                Home
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/web-design-watford/#about-section" prefetch={false}>
              <a className={`${styles.link} nav-link`} onClick={handleClick}>About</a>
            </Link>
          </li>
          <li className="nav-item dropdown">
            <a
              className={`${styles.link} nav-link`}
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Services <ArrowDownCircle className="ms-1" />
            </a>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <li>
                <Link href="/web-design">
                  <a className="dropdown-item" onClick={handleClick}>Web Design</a>
                </Link>
              </li>
              <li>
                <Link href="/web-development">
                  <a className="dropdown-item" onClick={handleClick}>Web Development</a>
                </Link>
              </li>
              <li>
                <Link href="/ecommerce">
                  <a className="dropdown-item" onClick={handleClick}>eCommerce</a>
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link href="/web-design-watford/#faq-section" prefetch={false}>
              <a className={`${styles.link} nav-link`} onClick={handleClick}>FAQ</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/web-design-watford/#contact-section" prefetch={false}>
              <a className={`${styles.link} nav-link`} onClick={handleClick}>Contact</a>
            </Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
        a {
          background: none;
        }

        a:hover {
          background: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
