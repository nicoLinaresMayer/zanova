'use client'

import { motion } from 'framer-motion'

const INSTAGRAM_URL = 'https://www.instagram.com/zanova.zn/'

export default function Hero() {
  return (
    <section className="relative min-h-[75dvh] w-full overflow-hidden no-select"> 
      
      {/* Imagen de fondo SOLO del hero */}
      <img
        src="/hero.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[50%_50%]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[75dvh]">
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[75dvh] text-pearl px-4">

  <h1 className="font-zanova text-center leading-none tracking-widest">
    <span className="block text-[clamp(2.5rem,8vw,6rem)]">
      TEMPORADA 2026
    </span>
    <span className="block text-[clamp(3.5rem,10vw,8rem)] font-bold">
      DROPS
    </span>
  </h1>
  <p className="mt-6 text-sm font-times uppercase tracking-[0.3em] opacity-80">
  Lanzamientos limitados
</p>

</div>


      </div>
    </section>
  )
}
