'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BODA, MAX_ASISTENTES } from '@/lib/config'
import { supabase, supabaseConfigurado } from '@/lib/supabase'
import { Words } from './useScrollFx'

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
    <section className="relative pb-6 pt-10" id="rsvp">
      <div className="pointer-events-none absolute inset-0 bg-olive-50/60" />
      <div className="section relative text-center">
        <h2
          className="font-serif text-[clamp(2rem,6vw,3.25rem)] font-light text-olive-800"
          data-reveal-words
        >
          <Words text="RSVP" />
        </h2>
        <p className="mx-auto mt-4 max-w-sm font-serif text-lg italic text-ink/70" data-reveal>
          Por favor confirma antes del {BODA.rsvpDeadline}.
        </p>

        <div className="mt-12" data-reveal>
          <AnimatePresence mode="wait">
            {estado === 'confirmado' ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
                className="mx-auto max-w-md py-6"
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
                className="mx-auto flex max-w-md flex-col gap-7 text-left"
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
        </div>
      </div>
    </section>
  )
}
