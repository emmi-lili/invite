'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Respetar la preferencia del sistema: sin esto mareas a gente con
    // trastornos vestibulares. Lenis simplemente no arranca.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.8,
    })

    // Exponer para que la intro del sobre pueda frenar/soltar el scroll.
    ;(window as any).__lenis = lenis

    // Lenis avisa a ScrollTrigger en cada frame.
    lenis.on('scroll', ScrollTrigger.update)

    // Un solo loop: el ticker de GSAP maneja Lenis. Nada de rAF propio.
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      ;(window as any).__lenis = null
    }
  }, [])

  return <>{children}</>
}
