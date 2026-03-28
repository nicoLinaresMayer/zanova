'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const INSTAGRAM_URL = 'https://www.instagram.com/zanova.zn/'

export default function Hero() {
  const [h, setH] = useState<number | null>(null)

  useEffect(() => {
    setH(window.innerHeight * 0.85)
  }, [])

  if (h === null) return null

  return (
    <section
      className="relative w-full overflow-hidden no-select"
      style={{ height: `${h}px` }}
    >
      {/* Imagen de fondo SOLO del hero */}
      <img
        src="/hero.jpg?v=2"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[0%_50%]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido */}
        <div className="relative z-10 flex h-full h-full flex-col items-center justify-start pt-[20vh]  text-pearl">

          <h1 className="font-zanova text-center leading-none tracking-widest">
            <span className="block text-[clamp(2.5rem,8vw,6rem)]">
              TEMPORADA 2026
            </span>
            <span className="block text-[clamp(3.5rem,10vw,8rem)] font-bold mt-10">
              DROPS
            </span>
          </h1>

          <p className="mt-6 text-sm font-times uppercase tracking-[0.3em] opacity-80">
            Lanzamientos limitados
          </p>

        </div>
    </section>
  )
}
