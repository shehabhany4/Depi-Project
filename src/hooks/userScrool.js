import { useEffect } from 'react'

export function useScrollAnimation() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view')
                    }
                })
            },
            { threshold: 0.15 }
        )

        const elements = document.querySelectorAll('.reveal')
        elements.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])
}