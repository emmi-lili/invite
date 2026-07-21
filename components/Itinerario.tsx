'use client'

import { BODA } from '@/lib/config'
import { Words } from './useScrollFx'

// Íconos de línea fina (strokeWidth 1). Sin rellenos.
function IconoAnillo() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1}>
      <circle cx="24" cy="30" r="12" />
      <path d="M18 20l6-8 6 8" />
      <path d="M24 12l-3 4h6l-3-4z" />
    </svg>
  )
}

function IconoCopas() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M14 10h8l-1 10a3 3 0 01-6 0l-1-10z" />
      <path d="M18 23v13M14 36h8" />
      <path d="M26 10h8l-1 10a3 3 0 01-6 0l-1-10z" />
      <path d="M30 23v13M26 36h8" />
    </svg>
  )
}

const ICONOS = [IconoAnillo, IconoCopas]

export default function Itinerario() {
  return (
    <section className="section py-28 text-center" id="itinerario">
      <p className="overline mb-6" data-reveal>
        El gran día
      </p>
      <h2
        className="font-serif text-[clamp(2rem,6vw,3.25rem)] font-light text-olive-800"
        data-reveal-words
      >
        <Words text="Itinerario" />
      </h2>

      <div className="divider my-10" data-reveal />

      <div className="flex flex-col gap-12" data-reveal-stagger>
        {BODA.eventos.map((ev, i) => {
          const Icono = ICONOS[i % ICONOS.length]
          return (
            <div key={ev.nombre} className="flex flex-col items-center">
              <span className="text-olive-600">
                <Icono />
              </span>
              <h3 className="mt-5 font-serif text-3xl font-light text-olive-800">
                {ev.nombre}
              </h3>
              <p className="mt-2 font-sans text-sm uppercase tracking-overline text-olive-600">
                {ev.hora}
              </p>
              <p className="mt-4 font-serif text-xl text-ink/85">{ev.lugar}</p>
              <p className="mt-1 font-sans text-sm text-ink/60">{ev.direccion}</p>
              {ev.nota && (
                <p className="mt-3 font-serif text-base italic text-olive-500">
                  {ev.nota}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
