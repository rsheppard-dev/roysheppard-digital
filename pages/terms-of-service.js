import Head from 'next/head'
import { useEffect, createRef } from 'react'

const Terms = () => {
    const terms = createRef()

    useEffect(() => {
        fetch('https://app.termageddon.com/api/policy/T1hKMlZVbDJTSEpRZUhSNlNsRTlQUT09?h-align=left&no-title=true')
            .then(res => res.text())
            .then(res => terms.current.innerHTML = res)
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <Head>
                <title>Terms of Service - Roy Sheppard Digital</title>
                <meta name="description" content="Terms of service for Roy Sheppard Digital." />
            </Head>
            <main className="container">
                <h1 className="heading">Terms of service</h1>
                <div ref={terms} />
            </main>
        </>
    );
}

export default Terms;