'use client'
import { useEffect } from 'react'
import Rsvp from '@/components/Rsvp'
export default function Preview() {
  useEffect(() => {
    const t = setTimeout(() => {
      const input = document.querySelector('#rsvp input[type="text"]') as HTMLInputElement | null
      if (input) {
        const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!
        setter.call(input, 'Emmi & Santi')
        input.dispatchEvent(new Event('input', { bubbles: true }))
      }
      setTimeout(() => {
        const btn = document.querySelector('#rsvp button[type="submit"]') as HTMLButtonElement | null
        btn?.click()
      }, 300)
    }, 800)
    return () => clearTimeout(t)
  }, [])
  return <main><Rsvp /></main>
}
