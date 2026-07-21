'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Registra los reveals y parallax de toda la página desde un scope raíz.
 *
 * Convenciones (marcadores en el JSX):
 *  - [data-reveal]           → fade + subtle rise al entrar (una sola vez).
 *  - [data-reveal-stagger]   → escalona sus hijos directos.
 *  - [data-parallax]         → la imagen se mueve más lento que su contenedor.
 *  - .word (dentro de [data-reveal-words]) → escalona por palabra.
 */
export function useScrollFx() {
  const root = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!root.current) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      // ---- Movimiento completo ----
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Reveal base: el 80% del movimiento del sitio.
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        })

        // Reveal escalonado de hijos directos.
        gsap.utils
          .toArray<HTMLElement>('[data-reveal-stagger]')
          .forEach((group) => {
            gsap.from(group.children, {
              y: 40,
              opacity: 0,
              duration: 0.9,
              ease: 'power2.out',
              stagger: { amount: 0.5, from: 'start' },
              scrollTrigger: {
                trigger: group,
                start: 'top 82%',
                toggleActions: 'play none none none',
              },
            })
          })

        // Títulos: escalona por palabra (no por letra).
        gsap.utils
          .toArray<HTMLElement>('[data-reveal-words]')
          .forEach((el) => {
            gsap.from(el.querySelectorAll('.word'), {
              y: 30,
              opacity: 0,
              duration: 0.9,
              ease: 'power3.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            })
          })

        // Parallax: la imagen se desplaza dentro de su contenedor.
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          gsap.to(el, {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        })
      })

      // ---- Movimiento reducido: solo fades cortos, sin desplazamiento ----
      mm.add('(prefers-reduced-motion: reduce)', () => {
        const flat = gsap.utils.toArray<HTMLElement>(
          '[data-reveal], [data-reveal-stagger], [data-reveal-words]'
        )
        flat.forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            duration: 0.3,
            scrollTrigger: { trigger: el, start: 'top 90%' },
          })
        })
      })
    }, root)

    // Recalcular posiciones cuando cargan las fuentes/imágenes.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 600)

    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
      ctx.revert()
    }
  }, [])

  return root
}

/** Divide un texto en <span class="word"> para escalonar títulos. */
export function Words({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} data-reveal-words>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="word inline-block">{w}&nbsp;</span>
        </span>
      ))}
    </span>
  )
}
