'use client'

import Image from 'next/image'
import { BODA } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="relative bg-white py-16 text-center" id="footer">
      <div className="section flex flex-col items-center">
        {/* Mensaje de cierre en versalitas espaciadas, como la papelería fina. */}
        <p
          className="max-w-sm font-serif text-[clamp(0.82rem,3vw,0.95rem)] uppercase leading-relaxed tracking-[0.18em] text-ink/75"
          data-reveal
        >
          Con mucho cariño, agradeceremos nos confirme su asistencia antes del{' '}
          {BODA.rsvpDeadline}.
        </p>

        {/* Firma: sello M&S + nombres en script + fecha. */}
        <div className="mt-12 w-16 opacity-90" data-reveal>
          <Image
            src="/sello.png"
            alt={`Monograma ${BODA.novios.monograma}`}
            width={200}
            height={200}
            className="h-auto w-full"
          />
        </div>

        <p
          className="mt-5 font-script text-[clamp(2.4rem,11vw,3.25rem)] leading-none text-olive-700"
          data-reveal
        >
          {BODA.novios.ella} &amp; {BODA.novios.el}
        </p>

        <p
          className="mt-5 font-serif text-[0.65rem] uppercase tracking-[0.2em] text-olive-600/70"
          data-reveal
        >
          {BODA.fechaDisplay} · {BODA.ciudad}
        </p>
      </div>
    </footer>
  )
}
