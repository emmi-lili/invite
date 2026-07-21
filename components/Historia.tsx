'use client'

import Image from 'next/image'
import { BODA } from '@/lib/config'
import { Words } from './useScrollFx'

export default function Historia() {
  return (
    <section className="relative py-28" id="historia">
      {/* Banda full-bleed con parallax botánico usando el liner del sobre */}
      <div className="relative mb-20 h-[42vh] w-full overflow-hidden">
        <div className="absolute inset-0 scale-110" data-parallax>
          <Image
            src="/envelope.png"
            alt="Detalle floral de la papelería"
            fill
            className="object-cover object-center opacity-[0.9] saturate-[0.92]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-olive-950/25" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="overline text-cream/90" data-reveal>
            Save the date
          </p>
        </div>
      </div>

      <div className="section text-center">
        <h2
          className="font-serif text-[clamp(2rem,6vw,3.25rem)] font-light leading-tight text-olive-800"
          data-reveal-words
        >
          <Words text="Nuestra historia" />
        </h2>

        <div className="divider my-8" data-reveal />

        <p
          className="mx-auto max-w-md font-serif text-xl font-light leading-relaxed text-ink/80"
          data-reveal
        >
          {BODA.historia}
        </p>

        <p className="mt-8 font-sans text-sm tracking-wide text-olive-600" data-reveal>
          {BODA.hashtag}
        </p>
      </div>
    </section>
  )
}
