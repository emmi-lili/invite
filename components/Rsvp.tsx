'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BODA, MAX_ASISTENTES } from '@/lib/config'
import { supabase, supabaseConfigurado } from '@/lib/supabase'

const EASE = [0.22, 1, 0.36, 1] as const
type Estado = 'idle' | 'enviando' | 'confirmado' | 'error'

export default function Rsvp() {
  const [estado, setEstado] = useState<Estado>('idle')
  const [asiste, setAsiste] = useState(true)
  const [asistentes, setAsistentes] = useState(2)
  const [nombre, setNombre] = useState('')
  const [restriccion, setRestriccion] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const step = (d: number) =>
    setAsistentes((n) => Math.max(1, Math.min(MAX_ASISTENTES, n + d)))

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!nombre.trim()) {
      setErrorMsg('Cuéntanos tu nombre para confirmar.')
      setEstado('error')
      return
    }
    setEstado('enviando')
    setErrorMsg('')

    const payload = {
      nombre: nombre.trim(),
      asiste,
      asistentes: asiste ? asistentes : 0,
      restriccion: restriccion.trim() || null,
      mensaje: mensaje.trim() || null,
    }

    try {
      if (!supabaseConfigurado || !supabase) {
        // Sin Supabase configurado: no rompemos la experiencia, avisamos claro.
        throw new Error(
          'El formulario aún no está conectado. Configura Supabase en .env.local.'
        )
      }
      const { error } = await supabase.from('confirmaciones').insert(payload)
      if (error) throw error
      setEstado('confirmado')
    } catch (err: any) {
      setErrorMsg(err?.message || 'Algo salió mal. Intenta de nuevo.')
      setEstado('error')
    }
  }

  return (
    <section className="relative overflow-hidden pb-10 pt-14" id="rsvp">
      <div className="pointer-events-none absolute inset-0 bg-olive-50/50" />

      <div className="section relative">
        <p
          className="mx-auto max-w-sm text-center font-serif text-lg italic text-ink/70"
          data-reveal
        >
          Por favor confirma antes del {BODA.rsvpDeadline}.
        </p>

        {/* Escena del sobre: pared interna (detrás) · carta · panel frontal (delante). */}
        <div className="relative mx-auto mt-12 w-full max-w-[400px]" data-reveal>
          {/* 1 · Pared interna del sobre, visible por la abertura en V */}
          <svg
            className="absolute inset-x-0 bottom-0 z-0 h-36 w-full"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect x="0" y="0" width="400" height="200" fill="#2f2d16" />
          </svg>

          {/* 2 · La carta emerge del sobre al entrar en viewport */}
          <motion.div
            initial={{ y: 54, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="relative z-10 mx-auto w-[84%] rounded-[3px] border border-olive-200 bg-white px-6 pb-40 pt-7 shadow-[0_2px_6px_rgba(45,45,22,0.08),0_20px_44px_-16px_rgba(45,45,22,0.30)]"
          >
            <h3 className="mb-6 font-serif text-2xl font-light text-olive-800">
              Confirmación de asistencia
            </h3>
            <AnimatePresence mode="wait">
              {estado === 'confirmado' ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                  className="py-2 text-center"
                >
                  <div className="rule-diamond mb-6" />
                  <p className="font-serif text-3xl font-light text-olive-800">
                    {asiste ? '¡Gracias, ' : 'Te vamos a extrañar, '}
                    {nombre.split(' ')[0]}!
                  </p>
                  <p className="mt-4 font-serif text-lg italic text-ink/70">
                    {asiste
                      ? `Nos vemos el ${BODA.diaCorto}. Guardamos ${asistentes} ${
                          asistentes === 1 ? 'lugar' : 'lugares'
                        } para ti.`
                      : 'Gracias por avisarnos. Te tendremos presente ese día.'}
                  </p>
                  <div className="rule-diamond mt-8" />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={enviar}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex flex-col gap-7 text-left"
                >
                {/* Nombre */}
                <label className="flex flex-col gap-2">
                  <span className="font-sans text-[0.65rem] uppercase tracking-overline text-olive-600">
                    Nombre completo
                  </span>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre y el de tu acompañante"
                    className="border-b border-olive-300 bg-transparent pb-2 font-serif text-lg text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-olive-700"
                  />
                </label>

                {/* Asiste / No asiste */}
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-[0.65rem] uppercase tracking-overline text-olive-600">
                    ¿Nos acompañas?
                  </span>
                  <div className="flex gap-3">
                    {[
                      { v: true, l: 'Sí, ahí estaré' },
                      { v: false, l: 'No podré' },
                    ].map((o) => (
                      <button
                        key={String(o.v)}
                        type="button"
                        onClick={() => setAsiste(o.v)}
                        className={`flex-1 border px-4 py-3 font-sans text-xs uppercase tracking-overline transition-colors duration-300 ${
                          asiste === o.v
                            ? 'border-olive-700 bg-olive-700 text-cream'
                            : 'border-olive-300 text-olive-700 hover:border-olive-500'
                        }`}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stepper de asistentes */}
                <AnimatePresence initial={false}>
                  {asiste && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex flex-col gap-2 overflow-hidden"
                    >
                      <span className="font-sans text-[0.65rem] uppercase tracking-overline text-olive-600">
                        ¿Cuántos asistirán?
                      </span>
                      <div className="flex items-center gap-6">
                        <button
                          type="button"
                          onClick={() => step(-1)}
                          className="flex h-11 w-11 items-center justify-center border border-olive-300 font-serif text-2xl text-olive-700 transition-colors hover:border-olive-700 disabled:opacity-30"
                          disabled={asistentes <= 1}
                          aria-label="Quitar asistente"
                        >
                          −
                        </button>
                        <span className="min-w-[2ch] text-center font-serif text-3xl font-light tabular-nums text-olive-800">
                          {asistentes}
                        </span>
                        <button
                          type="button"
                          onClick={() => step(1)}
                          className="flex h-11 w-11 items-center justify-center border border-olive-300 font-serif text-2xl text-olive-700 transition-colors hover:border-olive-700 disabled:opacity-30"
                          disabled={asistentes >= MAX_ASISTENTES}
                          aria-label="Agregar asistente"
                        >
                          +
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Restricción alimentaria */}
                <label className="flex flex-col gap-2">
                  <span className="font-sans text-[0.65rem] uppercase tracking-overline text-olive-600">
                    Restricción alimentaria (opcional)
                  </span>
                  <input
                    type="text"
                    value={restriccion}
                    onChange={(e) => setRestriccion(e.target.value)}
                    placeholder="Vegetariano, sin gluten…"
                    className="border-b border-olive-300 bg-transparent pb-2 font-serif text-lg text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-olive-700"
                  />
                </label>

                {/* Mensaje */}
                <label className="flex flex-col gap-2">
                  <span className="font-sans text-[0.65rem] uppercase tracking-overline text-olive-600">
                    Un mensaje para los novios (opcional)
                  </span>
                  <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    rows={3}
                    placeholder="Escríbenos algo bonito…"
                    className="resize-none border-b border-olive-300 bg-transparent pb-2 font-serif text-lg text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-olive-700"
                  />
                </label>

                {estado === 'error' && (
                  <p className="font-sans text-sm text-red-800/80">{errorMsg}</p>
                )}

                {/* Botón: el ancho se anima solo con layout */}
                <motion.button
                  layout
                  type="submit"
                  disabled={estado === 'enviando'}
                  className="mt-2 self-center border border-olive-700 bg-olive-700 px-10 py-4 font-sans text-xs uppercase tracking-overline text-cream transition-colors duration-300 hover:bg-olive-800 disabled:opacity-70"
                >
                  {estado === 'enviando' ? 'Enviando…' : 'Confirmar asistencia'}
                </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 3 · Panel frontal del sobre: tapa el borde inferior de la carta
              (efecto "insertada"). La abertura en V deja ver la pared interna. */}
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-36 w-full"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="sobreFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#65632f" />
                <stop offset="1" stopColor="#403e22" />
              </linearGradient>
            </defs>
            <path d="M0,60 L200,130 L400,60 L400,200 L0,200 Z" fill="url(#sobreFront)" />
            <path
              d="M0,60 L200,130 L400,60"
              fill="none"
              stroke="#403e22"
              strokeWidth="2.5"
              opacity="0.5"
            />
            <line
              x1="200"
              y1="130"
              x2="200"
              y2="200"
              stroke="#403e22"
              strokeWidth="1.5"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
