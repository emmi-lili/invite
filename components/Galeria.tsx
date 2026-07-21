'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { BODA } from '@/lib/config'
import { Words } from './useScrollFx'

// Tile con fallback elegante: si la foto aún no existe en /public/galeria,
// muestra un placeholder olivo con el monograma en vez de una imagen rota.
function Tile({ src, alt, wide }: { src: string; alt: string; wide?: boolean }) {
  const [error, setError] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden ${wide ? 'col-span-2 row-span-2' : ''}`}
    >
      <div className="aspect-square h-full w-full">
        {error ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-olive-100 to-olive-200">
            <span className="font-serif text-3xl font-light text-olive-500/70">
              {BODA.novios.monograma}
            </span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setError(true)}
            className="h-full w-full object-cover saturate-[0.9]"
          />
        )}
      </div>
    </motion.div>
  )
}

export default function Galeria() {
  return (
    <section className="section py-28 text-center" id="galeria">
      <p className="overline mb-6" data-reveal>
        Momentos
      </p>
      <h2
        className="mb-12 font-serif text-[clamp(2rem,6vw,3.25rem)] font-light text-olive-800"
        data-reveal-words
      >
        <Words text="Galería" />
      </h2>

      <div
        className="grid auto-rows-fr grid-cols-2 gap-2 md:grid-cols-3"
        data-gallery
        data-reveal-stagger
      >
        {BODA.galeria.map((f, i) => (
          <Tile key={f.src} src={f.src} alt={f.alt} wide={i % 5 === 0} />
        ))}
      </div>
    </section>
  )
}
