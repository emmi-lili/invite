'use client'

import Image from 'next/image'
import { BODA } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-olive-700 py-16 text-center text-cream">
      <div className="section flex flex-col items-center">
        {/* El sello M&S como marca de cierre */}
        <div className="w-24 opacity-90" data-reveal>
          <Image
            src="/sello.png"
            alt={`Monograma ${BODA.novios.monograma}`}
            width={200}
            height={200}
            className="h-auto w-full"
          />
        </div>

        <p className="mt-8 font-serif text-2xl font-light italic" data-reveal>
          Gracias por ser parte de nuestra historia
        </p>

        <p className="mt-6 font-serif text-3xl font-light" data-reveal>
          {BODA.novios.ella} <span className="text-cream/60">&amp;</span>{' '}
          {BODA.novios.el}
        </p>

        <p className="mt-4 font-sans text-[0.65rem] uppercase tracking-overline text-cream/60" data-reveal>
          {BODA.fechaDisplay} · {BODA.ciudad}
        </p>

        <p className="mt-8 font-sans text-sm text-cream/70" data-reveal>
          {BODA.hashtag}
        </p>
      </div>
    </footer>
  )
}
