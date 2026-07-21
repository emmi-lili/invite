'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// CTA discreto que aparece tras salir del hero y desaparece al llegar al RSVP.
export default function FloatingCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const rsvp = document.getElementById('rsvp')
      const rsvpTop = rsvp ? rsvp.getBoundingClientRect().top : Infinity
      // Visible tras el primer viewport y hasta que el RSVP entra en pantalla.
      setVisible(y > window.innerHeight * 0.9 && rsvpTop > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const irRsvp = () => {
    const lenis = (window as any).__lenis
    const el = document.getElementById('rsvp')
    if (lenis && el) lenis.scrollTo(el, { offset: -40 })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={irRsvp}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap border border-olive-700 bg-cream/95 px-7 py-3 font-sans text-[0.65rem] uppercase tracking-overline text-olive-700 backdrop-blur transition-colors hover:bg-olive-700 hover:text-cream"
        >
          Confirmar asistencia
        </motion.button>
      )}
    </AnimatePresence>
  )
}
