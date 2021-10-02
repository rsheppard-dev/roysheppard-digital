import { useEffect } from 'react'
import { gsap } from 'gsap'

const animateUnderline = () => {
    useEffect(() => {
        const { ScrollTrigger } = require('gsap/ScrollTrigger')

        gsap.registerPlugin(ScrollTrigger)

        gsap.utils.toArray('.underline').forEach(el => {
            
            gsap.to(el, {
                '--scaleX': 1,
                '--opacity': 1,
                duration: 1,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 60%',
                }
            })
        })
    }, [])
}

export default animateUnderline