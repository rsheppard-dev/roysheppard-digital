import Contact from '../components/Contact'
import animateUnderline from "../utils/animateUnderline";

const Ecommerce = () => {
    animateUnderline()

    return (
        <main>
            <section className="container">
                <h1 className="heading"><span className="underline">eCommerce</span></h1>
            </section>
            <Contact />
        </main>
    );
}

export default Ecommerce;