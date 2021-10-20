import { useEffect, createRef } from 'react'

const Privacy = () => {
    const privacy = createRef()

    useEffect(() => {
        fetch('https://app.termageddon.com/api/policy/UkVsTWRIZGxiakJMT1N0ME1WRTlQUT09?h-align=left&no-title=true')
            .then(res => res.text())
            .then(res => privacy.current.innerHTML = res)
            .catch(e => console.log(e))
    }, [])

    return (
        <main className="container">
            <h1 className="heading">Privacy policy</h1>
            <div ref={privacy} />
        </main>
    );
}

export default Privacy;