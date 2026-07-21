'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { BODA } from '@/lib/config'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Intro tipo "papelería fina": el sobre olivo sellado con el lacre M&S.
 * Al tocar, el sello se rompe, la solapa se abre y la invitación emerge.
 * Bloquea el scroll (Lenis + body) hasta que el sobre está abierto.
 */
export default function EnvelopeIntro() {
  const [fase, setFase] = useState<'cerrado' | 'abriendo' | 'listo'>('cerrado')
  const [reducido, setReducido] = useState(false)

  // Respeta reduced-motion: sin animación, se salta la intro directamente.
  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReducido(rm)
    if (rm) {
      setFase('listo')
      document.body.dataset.introLocked = 'false'
      window.dispatchEvent(new Event('intro:done'))
      return
    }
    document.body.dataset.introLocked = 'true'
    ;(window as any).__lenis?.stop?.()
  }, [])

  const abrir = () => {
    if (fase !== 'cerrado') return
    setFase('abriendo')
    // El hero empieza a emerger a mitad de la apertura del sobre.
    window.setTimeout(() => window.dispatchEvent(new Event('intro:done')), 900)
    // Duración total de la coreografía antes de soltar el scroll.
    window.setTimeout(() => {
      setFase('listo')
      document.body.dataset.introLocked = 'false'
      const lenis = (window as any).__lenis
      lenis?.start?.()
      lenis?.scrollTo?.(0, { immediate: true })
    }, 1700)
  }

  if (reducido) return null

  return (
    <AnimatePresence>
      {fase !== 'listo' && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-cream"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          aria-hidden={fase === 'abriendo'}
        >
          {/* Textura suave de fondo */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-olive-50/60 via-cream to-olive-50/40" />

          <div className="relative flex flex-col items-center">
            {/* El sobre */}
            <motion.button
              type="button"
              onClick={abrir}
              className="group relative block w-[78vw] max-w-[360px] cursor-pointer outline-none"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{
                opacity: 1,
                scale: fase === 'abriendo' ? 1.06 : 1,
                y: 0,
              }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
              aria-label="Abrir la invitación"
            >
              <Image
                src="/envelope.png"
                alt="Sobre de la invitación de Michelle y Santiago"
                width={720}
                height={720}
                priority
                className="h-auto w-full select-none drop-shadow-[0_30px_60px_rgba(45,45,22,0.18)]"
              />

              {/* El sello de lacre, centrado sobre el sobre. Se rompe al abrir. */}
              <motion.div
                className="absolute left-1/2 top-[52%] w-[34%] -translate-x-1/2 -translate-y-1/2"
                animate={
                  fase === 'abriendo'
                    ? { scale: 1.35, opacity: 0, rotate: -8, y: 10 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.6, ease: EASE }}
              >
                <motion.div
                  animate={
                    fase === 'cerrado'
                      ? { scale: [1, 1.04, 1] }
                      : { scale: 1 }
                  }
                  transition={{
                    duration: 2.6,
                    repeat: fase === 'cerrado' ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                >
                  <Image
                    src="/sello.png"
                    alt="Sello de lacre con el monograma M&S"
                    width={400}
                    height={400}
                    priority
                    className="h-auto w-full select-none drop-shadow-[0_8px_16px_rgba(45,45,22,0.28)]"
                  />
                </motion.div>
              </motion.div>
            </motion.button>

            {/* Cue: toca para abrir */}
            <motion.p
              className="mt-10 text-center font-sans text-[0.7rem] uppercase tracking-overline text-olive-500"
              initial={{ opacity: 0 }}
              animate={{
                opacity: fase === 'cerrado' ? [0.4, 1, 0.4] : 0,
              }}
              transition={{
                duration: 2.4,
                repeat: fase === 'cerrado' ? Infinity : 0,
                ease: 'easeInOut',
                delay: 0.8,
              }}
            >
              Toca para abrir
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
