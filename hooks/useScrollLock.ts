import { useEffect } from 'react'

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    const body = document.body

    if (locked) {
      try {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        body.setAttribute('data-scroll-locked', 'true')
        body.style.setProperty('--removed-body-scroll-bar-size', `${scrollbarWidth}px`)
        body.style.overflow = 'hidden'
      } catch {}

      return () => {
        try {
          body.removeAttribute('data-scroll-locked')
          body.style.removeProperty('--removed-body-scroll-bar-size')
          body.style.overflow = ''
        } catch {}
      }
    }
  }, [locked])
}
