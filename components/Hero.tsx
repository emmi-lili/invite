'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { BODA } from '@/lib/config'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Portada: el sobre (carta) con el sello M&S. Al tocar, el sello se rompe y la
 * viñeta con los nombres emerge del sobre. Todo centrado, mobile-first.
 *
 * Sizing: el sobre es un <Image w-full h-auto> en flujo, así define el ancho y
 * alto de la escena por su ratio intrínseco (nada de `fill` ni aspect-ratio, que
 * colapsan la altura). La viñeta y el sello se posicionan en % sobre ese alto, y
 * un spacer reserva el saliente de la viñeta por debajo del sobre.
 */
export default function Hero() {
  const [fase, setFase] = useState<'cerrado' | 'abriendo' | 'abierto'>('cerrado')
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setReduce(rm)
    if (rm) {
      setFase('abierto')
      document.body.dataset.introLocked = 'false'
      return
    }
    document.body.dataset.introLocked = 'true'
    ;(window as any).__lenis?.stop?.()
  }, [])

  const abrir = () => {
    if (fase !== 'cerrado') return
    setFase('abriendo')
    window.setTimeout(() => {
      setFase('abierto')
      document.body.dataset.introLocked = 'false'
      ;(window as any).__lenis?.start?.()
    }, 1400)
  }

  const cerrado = fase === 'cerrado'
  const emerged = fase !== 'cerrado'

  return (
    <section
      style={{ minHeight: '100svh' }}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Halo suave (deja ver el fondo de la página detrás) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-olive-100/30 blur-3xl"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Escena: sobre + viñeta + sello */}
        <button
          type="button"
          onClick={abrir}
          disabled={!cerrado}
          aria-label="Abrir la invitación"
          className={`relative mx-auto block w-[92vw] max-w-[440px] outline-none ${
            cerrado ? 'cursor-pointer' : 'cursor-default'
          }`}
        >
          {/* Wrapper del alto del sobre */}
          <div className="relative">
            {/* El sobre (carta) — en flujo, define el tamaño */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <Image
                src="/envelope.png"
                alt="Sobre de la invitación"
                width={500}
                height={500}
                priority
                sizes="(max-width: 480px) 92vw, 440px"
                className="h-auto w-full select-none drop-shadow-[0_24px_50px_rgba(45,45,22,0.16)]"
              />
            </motion.div>

            {/* La viñeta con los nombres — emerge del sobre */}
            <motion.div
              className="absolute left-1/2 z-20 w-[76%] -translate-x-1/2"
              initial={false}
              animate={
                emerged ? { top: '42%', opacity: 1 } : { top: '56%', opacity: 0 }
              }
              transition={{ duration: 1, ease: EASE, delay: emerged && !reduce ? 0.1 : 0 }}
            >
              <Image
                src="/ornamento2.png"
                alt={`${BODA.novios.ella} & ${BODA.novios.el} — ${BODA.ciudad}`}
                width={228}
                height={305}
                priority
                sizes="290px"
                className="h-auto w-full select-none drop-shadow-[0_16px_32px_rgba(45,45,22,0.18)]"
              />
            </motion.div>

            {/* El sello de lacre M&S sobre el sobre */}
            <AnimatePresence>
              {(cerrado || fase === 'abriendo') && (
                <motion.div
                  key="seal"
                  className="absolute left-1/2 top-[52%] z-30 w-[33%] -translate-x-1/2 -translate-y-1/2"
                  animate={
                    fase === 'abriendo'
                      ? { scale: 1.35, opacity: 0, rotate: -8, y: 8 }
                      : { scale: 1, opacity: 1 }
                  }
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <motion.div
                    animate={cerrado ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                    transition={{
                      duration: 2.6,
                      repeat: cerrado ? Infinity : 0,
                      ease: 'easeInOut',
                    }}
                  >
                    <Image
                      src="/sello.png"
                      alt="Sello con el monograma M&S"
                      width={200}
                      height={200}
                      priority
                      className="h-auto w-full select-none drop-shadow-[0_8px_16px_rgba(45,45,22,0.28)]"
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reserva el saliente de la viñeta por debajo del sobre */}
          <div className="h-[40vw] max-h-[192px]" />
        </button>

        {/* "Toca para abrir" → se reemplaza por la fecha al abrir */}
        <div className="mt-6 flex h-14 flex-col items-center justify-start">
          <AnimatePresence mode="wait">
            {cerrado ? (
              <motion.p
                key="cue"
                className="font-sans text-[0.7rem] uppercase tracking-overline text-olive-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                Toca para abrir
              </motion.p>
            ) : (
              <motion.div
                key="date"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
                className="rule-diamond"
              >
                <span className="font-sans text-[0.8rem] uppercase tracking-overline text-olive-600">
                  {BODA.fechaDisplay}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cue de scroll — solo cuando el sobre ya está abierto */}
      <AnimatePresence>
        {fase === 'abierto' && (
          <motion.div
            className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="font-sans text-[0.6rem] uppercase tracking-overline text-olive-500">
              Desliza
            </span>
            <motion.span
              className="block h-10 w-px bg-olive-400"
              style={{ transformOrigin: 'top' }}
              animate={{ scaleY: [1, 0.4, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
