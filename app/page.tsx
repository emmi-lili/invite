'use client'

import { useScrollFx } from '@/components/useScrollFx'
import Hero from '@/components/Hero'
import Countdown from '@/components/Countdown'
import Itinerario from '@/components/Itinerario'
import Ubicacion from '@/components/Ubicacion'
import DressCode from '@/components/DressCode'
import Galeria from '@/components/Galeria'
import Rsvp from '@/components/Rsvp'
import Regalos from '@/components/Regalos'
import Footer from '@/components/Footer'
import FloatingCta from '@/components/FloatingCta'

export default function Page() {
  const root = useScrollFx()

  return (
    <>
      <main ref={root as React.RefObject<HTMLElement>} className="overflow-hidden">
        <Hero />
        <Countdown />
        <Itinerario />
        <Ubicacion />
        <DressCode />
        <Galeria />
        <Rsvp />
        <Regalos />
        <Footer />
      </main>
      <FloatingCta />
    </>
  )
}
