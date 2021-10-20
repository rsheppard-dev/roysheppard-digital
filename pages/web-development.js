import Contact from '../components/Contact'
import animateUnderline from "../utils/animateUnderline";

const WebDevelopment = () => {
    animateUnderline()

    return (
        <main>
            <section className="container">
                <h1 className="heading"><span className="underline">Web development</span></h1>
            </section>
            <Contact />
        </main>
    );
}

export default WebDevelopment;