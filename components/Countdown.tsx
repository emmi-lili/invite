'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BODA } from '@/lib/config'

const EASE = [0.22, 1, 0.36, 1] as const

type Restante = { dias: number; horas: number; minutos: number; segundos: number }

function calcular(target: number): Restante {
  const diff = Math.max(0, target - Date.now())
  return {
    dias: Math.floor(diff / 86400000),
    horas: Math.floor((diff / 3600000) % 24),
    minutos: Math.floor((diff / 60000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  }
}

function Digito({ valor }: { valor: string }) {
  return (
    <span className="relative inline-block h-[1.1em] w-[0.62em] overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={valor}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute inset-0 block text-center"
        >
          {valor}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Bloque({ valor, label }: { valor: number; label: string }) {
  // Pad mínimo a 2 dígitos, pero permite 3 (los días pueden ser >99).
  const s = String(valor).padStart(2, '0')
  return (
    <div className="flex flex-1 flex-col items-center">
      <span className="flex font-serif text-[clamp(1.75rem,10vw,4.5rem)] font-light leading-none text-olive-800">
        {s.split('').map((d, i) => (
          <Digito key={i} valor={d} />
        ))}
      </span>
      <span className="mt-3 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-olive-600 sm:text-[0.65rem] sm:tracking-overline">
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const [mounted, setMounted] = useState(false)
  const target = new Date(BODA.fechaISO).getTime()
  const [r, setR] = useState<Restante>(() => calcular(target))

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setR(calcular(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const llego = r.dias === 0 && r.horas === 0 && r.minutos === 0 && r.segundos === 0

  // Guardia de hidratación: reserva el espacio, evita layout shift.
  if (!mounted) return <div className="h-40" />

  return (
    <section className="section py-16 text-center" id="countdown">
      {llego ? (
        <p
          className="font-serif text-4xl font-light italic text-olive-700"
          data-reveal
        >
          ¡Hoy nos casamos!
        </p>
      ) : (
        <div
          className="mx-auto flex max-w-sm items-start justify-center gap-1 sm:max-w-none sm:gap-6"
          data-reveal
        >
          <Bloque valor={r.dias} label="Días" />
          <span className="mt-3 h-8 w-px bg-olive-300/60 sm:mt-4 sm:h-10" />
          <Bloque valor={r.horas} label="Horas" />
          <span className="mt-3 h-8 w-px bg-olive-300/60 sm:mt-4 sm:h-10" />
          <Bloque valor={r.minutos} label="Min" />
          <span className="mt-3 h-8 w-px bg-olive-300/60 sm:mt-4 sm:h-10" />
          <Bloque valor={r.segundos} label="Seg" />
        </div>
      )}

      <p className="mt-10 font-serif text-lg italic text-ink/60" data-reveal>
        para el {BODA.fechaLarga}
      </p>
    </section>
  )
}
