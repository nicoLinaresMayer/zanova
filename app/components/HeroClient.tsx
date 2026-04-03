'use client'

import { useEffect, useState } from 'react'

type Props = {
  heroImage: string | null
}

export default function HeroClient({ heroImage }: Props) {
  const [h, setH] = useState<number>(() => 
  typeof window !== 'undefined' ? window.innerHeight * 0.85 : 0
)

  useEffect(() => {
    setH(window.innerHeight * 0.85)
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden no-select bg-neutral-900"
      style={{ height: h ? `${h}px` : '85dvh' }}
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
          <span className="block text-[clamp(3.5rem,10vw,8rem)] font-bold mt-10 font-hero">
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