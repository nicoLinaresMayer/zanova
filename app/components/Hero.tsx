'use client'

import { useEffect, useState, useRef } from 'react'
import { getHeroImage } from '@/lib/products'

function NWithTilde({ className }: { className?: string }) {
  const nRef = useRef<HTMLSpanElement>(null)
  const [tildePx, setTildePx] = useState(0)

  useEffect(() => {
    const update = () => {
      if (nRef.current) {
        const isMobile = window.innerWidth < 768
        setTildePx(nRef.current.offsetHeight * (isMobile ? 0.50 : 0.6))
      }
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <span className={`relative inline-block ${className ?? ''}`}>
      <span ref={nRef}>n</span>
      <span
        className="absolute left-1/2 -translate-x-1/2 leading-none"
        style={{ bottom: `${tildePx}px`, fontSize: '0.5em' }}
      >
        ~
      </span>
    </span>
  )
}

export default function Hero() {
  const [h, setH] = useState<number | null>(null)
  const [heroImage, setHeroImage] = useState<string | null>(null)

  useEffect(() => {
    setH(window.innerHeight * 0.85)
    getHeroImage().then(setHeroImage)
  }, [])

  if (h === null) return null

  return (
    <section
      className="relative w-full overflow-hidden no-select"
      style={{ height: `${h}px` }}
    >
      {heroImage && (
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[50%_50%]"
        />
      )}

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-start pt-[20vh] text-pearl">
        <h1 className="text-center leading-none tracking-widest">
          <span className="block text-[clamp(2.5rem,8vw,6rem)] font-zanova">
            TEMPORADA
          </span>
          <span className="block text-[clamp(3.5rem,10vw,8rem)] font-bold mt-10 font-hero ">
            OTOÑO - INVIERNO
          </span>
        </h1>

        <p className="mt-10 sm:text-3xl font-times uppercase tracking-[0.3em] opacity-80">
          Lanzamientos limitados
        </p>
      </div>
    </section>
  )
}