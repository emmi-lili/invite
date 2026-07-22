'use client'

import Image from 'next/image'
import { BODA } from '@/lib/config'
import { Words } from './useScrollFx'

export default function Regalos() {
  const { titulo, mensaje, url, ctaLabel } = BODA.regalos

  return (
    <section className="section pb-[10px] pt-0 text-center" id="regalos">
      <h2
        className="font-serif text-[clamp(2rem,6vw,3.25rem)] font-light text-olive-800"
        data-reveal-words
      >
        <Words text={titulo} />
      </h2>

      <div className="divider my-8" data-reveal />

      {/* Tarjeta de papelería sellada. El wrapper lleva la perspectiva y el
          data-reveal (GSAP anima su transform sin chocar con el tilt 3D, que
          vive en la tarjeta interna). */}
      <div className="mx-auto mt-4 max-w-md [perspective:1200px]" data-reveal>
        <div
          className="relative rounded-sm border border-olive-700/10 bg-cream px-8 pb-11 pt-16 [transform:rotateX(6deg)] sm:px-10"
          style={{
            boxShadow:
              '0 2px 4px rgba(45,45,22,0.06), 0 14px 26px -12px rgba(45,45,22,0.22), 0 44px 70px -30px rgba(45,45,22,0.32)',
          }}
        >
          {/* Sello de cera M&S, montado sobre el borde superior con su propia
              sombra proyectada para dar profundidad (se ve levantado). */}
          <div className="absolute left-1/2 top-0 w-24 -translate-x-1/2 -translate-y-1/2 [filter:drop-shadow(0_9px_11px_rgba(45,45,22,0.38))] sm:w-28">
            <Image
              src="/sello.png"
              alt={`Sello de cera con el monograma ${BODA.novios.monograma}`}
              width={1254}
              height={1254}
              className="h-auto w-full"
            />
          </div>

          {/* Mensaje con capital decorativa, versalitas y texto justificado. */}
          <p className="text-justify font-serif text-[clamp(0.95rem,2.6vw,1.15rem)] uppercase leading-relaxed tracking-[0.02em] text-ink/85 first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-[3.4rem] first-letter:font-light first-letter:leading-[0.8] first-letter:text-olive-700">
            {mensaje}
          </p>
        </div>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-block border border-olive-700 px-8 py-3 font-sans text-xs uppercase tracking-overline text-olive-700 transition-colors duration-300 hover:bg-olive-700 hover:text-cream"
        data-reveal
      >
        {ctaLabel}
      </a>
    </section>
  )
}
