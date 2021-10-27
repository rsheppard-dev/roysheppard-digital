import useSWR from 'swr'
import ReactMarkdown from 'react-markdown'
import styles from '../styles/Faq.module.scss'

const fetcher = async url => {
    const res = await fetch(url)
    return res.json()
}

const Faq = (props) => {
    const url = 'https://salty-eyrie-16291.herokuapp.com/frequently-asked-questions'

    const { data, error } = useSWR(url, fetcher, { fallbackData: props.faq })

    if (error) return <div className="container my-3">Failed to load</div>
    if (!data) return <div className="container my-3">Loading questions...</div>

    return (
        <>

            <h2 className="heading">Frequently asked questions</h2>

            <div className="accordion accordion-flush" id="accordionFAQ">
                {data.map(item => (
                    <div className="accordion-item bg-transparent" key={item.id}>
                        <h3 className={`subHeading ${styles.question} accordion-header`} id={`flush-heading${item.id}`}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${item.id}`} aria-expanded="false" aria-controls={`flush-heading${item.id}`}>
                                {item.Question}
                            </button>
                        </h3>
                        <div id={`flush-collapse${item.id}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading${item.id}`} data-bs-parent="#accordionFAQ">
                            <div className="accordion-body"><ReactMarkdown>{item.Answer}</ReactMarkdown></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Faq;