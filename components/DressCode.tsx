'use client'

import { BODA } from '@/lib/config'
import { Words } from './useScrollFx'

export default function DressCode() {
  const { titulo, detalle, swatches, evitar } = BODA.dressCode

  return (
    <section className="section py-28 text-center" id="dress-code">
      <p className="overline mb-6" data-reveal>
        Código de vestimenta
      </p>
      <h2
        className="font-serif text-[clamp(2rem,6vw,3.25rem)] font-light text-olive-800"
        data-reveal-words
      >
        <Words text={titulo} />
      </h2>

      <p className="mt-5 font-serif text-xl italic text-ink/75" data-reveal>
        {detalle}
      </p>

      <div className="mt-12 flex items-end justify-center gap-5" data-reveal-stagger>
        {swatches.map((s) => (
          <div key={s.hex} className="flex flex-col items-center gap-3">
            <span
              className="h-14 w-14 rounded-full border border-black/5"
              style={{ backgroundColor: s.hex }}
              aria-label={s.nombre}
            />
            <span className="font-sans text-[0.65rem] uppercase tracking-overline text-olive-600">
              {s.nombre}
            </span>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-sm font-sans text-sm text-ink/55" data-reveal>
        {evitar}
      </p>
    </section>
  )
}
