'use client'

import { useScrollFx } from '@/components/useScrollFx'
import Hero from '@/components/Hero'
import Countdown from '@/components/Countdown'
import Itinerario from '@/components/Itinerario'
import DressCode from '@/components/DressCode'
import Rsvp from '@/components/Rsvp'
import Regalos from '@/components/Regalos'
import Footer from '@/components/Footer'

export default function Page() {
  const root = useScrollFx()

  return (
    <>
      <main ref={root as React.RefObject<HTMLElement>} className="overflow-hidden">
        <Hero />
        <Countdown />
        <Itinerario />
        <DressCode />
        <Rsvp />
        <Regalos />
        <Footer />
      </main>
    </>
  )
}
