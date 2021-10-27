import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowDownCircle } from 'react-bootstrap-icons'
import logo from '../public/images/logo.png'
import styles from '../styles/Navbar.module.scss'

const Navbar = () => {
    useEffect(() => {
        import('bootstrap/js/dist/collapse')
        import('bootstrap/js/dist/dropdown')
    }, []);

    return (
        <nav id="navbar" className="navbar navbar-expand-md navbar-light container">
            <div className="logoWrapper">
                <Link href="/web-design-watford" prefetch={false}><a className="navbar-brand">

                    <Image
                        src={logo}
                        alt="Roy Sheppard Digital"
                        layout="intrinsic"
                        width={174}
                        height={45}
                        priority
                    />

                </a></Link>
            </div>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">

                <ul className={`${styles.navLink} navbar-nav ms-auto`}>
                    <li className="nav-item">
                        <Link href="/web-design-watford" prefetch={false}><a className="nav-link link active" aria-current="page">Home</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/web-design-watford/#about-section" prefetch={false}><a className="nav-link link">About</a></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link link" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services <ArrowDownCircle className="ms-1" /></a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><Link href="/web-design"><a className="dropdown-item">Web Design</a></Link></li>
                            <li><Link href="/web-development"><a className="dropdown-item">Web Development</a></Link></li>
                            <li><Link href="/ecommerce"><a className="dropdown-item">eCommerce</a></Link></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link href="/web-design-watford/#faq-section" prefetch={false}><a className="nav-link link">FAQ</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/web-design-watford/#contact-section" prefetch={false}><a className="nav-link link">Contact</a></Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;