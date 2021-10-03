import Image from 'next/image'
import logo from '../public/images/logo.svg'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Navbar = () => {
    return (
        <nav id="navbar" className="navbar navbar-expand-md navbar-light container">
            <a className="navbar-brand" href="#">

                <Image
                    src={logo}
                    alt="Roy Sheppard Digital"
                    layout="fixed"
                    width={174}
                    height={45}
                    priority
                />

            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">

                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link" href="#">About</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link link" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services <i className="bi bi-arrow-down-circle" /></a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a className="dropdown-item" href="#">Web Design</a></li>
                            <li><a className="dropdown-item" href="#">e-Commerce</a></li>
                            <li><a className="dropdown-item" href="#">Web Development</a></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link" href="#">FAQ</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link link" href="#">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;