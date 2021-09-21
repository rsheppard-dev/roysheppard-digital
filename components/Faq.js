import useSWR from 'swr'
import ReactMarkdown from 'react-markdown'
import styles from '../styles/Home.module.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

const fetcher = async url => {
    const res = await fetch(url)
    return res.json()
}

const Faq = (props) => {
    const url = 'https://salty-eyrie-16291.herokuapp.com/frequently-asked-questions'

    const { data, error } = useSWR(url, fetcher, { initialData: props })

    if (error) return <div className="container my-3">Failed to load</div>
    if (!data) return <div className="container my-3">Loading...</div>

    return (
        <section id="faq-section" className="container">

            <h2 className={styles.heading}>Frequently Asked Questions</h2>

            <div className="accordion accordion-flush" id="accordionFAQ">
                {data.map(item => (
                    <div className="accordion-item" key={item.id}>
                        <h2 className={`${styles.question} accordion-header`} id={`flush-heading${item.id}`}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${item.id}`} aria-expanded="false" aria-controls={`flush-heading${item.id}`}>
                                {item.Question}
                            </button>
                        </h2>
                        <div id={`flush-collapse${item.id}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading${item.id}`} data-bs-parent="#accordionFAQ">
                            <div className="accordion-body"><ReactMarkdown>{item.Answer}</ReactMarkdown></div>
                        </div>
                    </div>
                ))}
            </div>
        </section >
    );
}

export default Faq;