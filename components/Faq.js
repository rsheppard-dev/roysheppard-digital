import useSWR from 'swr'
import { request } from 'graphql-request'
import styles from '../styles/Faq.module.scss'

const fetcher = query => request(process.env.NEXT_PUBLIC_WP_GRAPHQL, query)

const Faq = (props) => {
    const query = `
        query faqQuery {
            faqs {
                nodes {
                    faqId
                    title
                    content
                }
            }
        }
    `

    const { data, error } = useSWR(query, fetcher, { fallbackData: props })

    if (error) return <div className="container my-3">Failed to load FAQ</div>
    if (!data) return <div className="container my-3">Loading FAQ...</div>

    return (
        <section id = "faq-section" className = "container">
            <h2 className="heading">Frequently asked questions</h2>

            <div className="accordion accordion-flush" id="accordionFAQ">
                {data.faqs.nodes.map(item => (
                    <div className="accordion-item bg-transparent" key={item.faqId}>
                        <h3 className={`${styles.question} accordion-header`} id={`flush-heading${item.faqId}`}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse${item.faqId}`} aria-expanded="false" aria-controls={`flush-heading${item.faqId}`}>
                                {item.title}
                            </button>
                        </h3>
                        <div id={`flush-collapse${item.faqId}`} className="accordion-collapse collapse" aria-labelledby={`flush-heading${item.faqId}`} data-bs-parent="#accordionFAQ">
                            <div className="accordion-body" dangerouslySetInnerHTML={{ __html: item.content }}></div>
                        </div>
                    </div>
                ))}
                </div>
        </section>
    );
}

export default Faq;