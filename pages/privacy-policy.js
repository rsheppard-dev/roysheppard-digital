import { useEffect, createRef } from 'react'
import Head from 'next/head'

const Privacy = () => {
    const privacy = createRef()

    useEffect(() => {
        fetch('https://app.termageddon.com/api/policy/UkVsTWRIZGxiakJMT1N0ME1WRTlQUT09?h-align=left&no-title=true')
            .then(res => res.text())
            .then(res => privacy.current.innerHTML = res)
            .catch(e => console.log(e))
    }, [])

    return (
        <>
            <Head>
                <title>Privacy Policy - Roy Sheppard Digital</title>
                <meta name="description" content="Privacy policy for Roy SHeppard Digital." />
            </Head>
            <main className="container">
                <h1 className="heading">Privacy policy</h1>
                <div ref={privacy} />
            </main>
        </>
    );
}

export default Privacy;