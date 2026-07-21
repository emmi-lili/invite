'use client'

import { BODA } from '@/lib/config'
import { Words } from './useScrollFx'

export default function Regalos() {
  const { titulo, mensaje, url, ctaLabel } = BODA.regalos

  return (
    <section className="section py-28 text-center" id="regalos">
      <p className="overline mb-6" data-reveal>
        Con cariño
      </p>
      <h2
        className="font-serif text-[clamp(2rem,6vw,3.25rem)] font-light text-olive-800"
        data-reveal-words
      >
        <Words text={titulo} />
      </h2>

      <div className="divider my-8" data-reveal />

      <p className="mx-auto max-w-md font-serif text-xl font-light leading-relaxed text-ink/80" data-reveal>
        {mensaje}
      </p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-block border border-olive-700 px-8 py-3 font-sans text-xs uppercase tracking-overline text-olive-700 transition-colors duration-300 hover:bg-olive-700 hover:text-cream"
        data-reveal
      >
        {ctaLabel}
      </a>
    </section>
  )
}
