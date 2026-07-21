'use client'

import { BODA } from '@/lib/config'
import { Words } from './useScrollFx'

export default function Ubicacion() {
  const { lat, lng, nombre } = BODA.ubicacion
  const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`

  return (
    <section className="section py-28 text-center" id="ubicacion">
      <p className="overline mb-6" data-reveal>
        Cómo llegar
      </p>
      <h2
        className="font-serif text-[clamp(2rem,6vw,3.25rem)] font-light text-olive-800"
        data-reveal-words
      >
        <Words text="Ubicación" />
      </h2>

      <div className="divider my-10" data-reveal />

      {/* Mapa estilizado (sin iframe pesado). Un pin sobre trama fina. */}
      <div
        className="relative mx-auto aspect-[4/3] w-full overflow-hidden border border-olive-200 bg-olive-50"
        data-reveal
      >
        <svg
          className="absolute inset-0 h-full w-full text-olive-200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M28 0H0V28" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path
            d="M-20 220 Q 120 140 260 200 T 560 170"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-olive-100"
          />
        </svg>

        {/* Pin de línea fina */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
          <svg viewBox="0 0 32 40" className="h-12 w-12 text-olive-700" fill="none" stroke="currentColor" strokeWidth={1.25}>
            <path d="M16 39C16 39 28 26 28 15A12 12 0 004 15c0 11 12 24 12 24z" />
            <circle cx="16" cy="15" r="4.5" />
          </svg>
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cream/90 to-transparent p-4">
          <p className="font-serif text-lg text-olive-800">{nombre}</p>
        </div>
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block border border-olive-700 px-8 py-3 font-sans text-xs uppercase tracking-overline text-olive-700 transition-colors duration-300 hover:bg-olive-700 hover:text-cream"
        data-reveal
      >
        Cómo llegar
      </a>
    </section>
  )
}
