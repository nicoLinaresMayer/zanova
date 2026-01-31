'use client'

import { motion } from 'framer-motion'

const INSTAGRAM_URL = 'https://www.instagram.com/zanova.zn/'

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden">
      
      {/* Imagen de fondo SOLO del hero */}
      <img
        src="/public/hero.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[50%_50%]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] text-pearl">
        
        <div className="absolute top-[20%]">
          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-1.5xl font-times text-center">
              Próximamente
            </h2>
            <h1 className="text-2xl font-bold text-center font-zanova">
              Tienda Zanova
            </h1>
          </motion.a>

          <motion.a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center mt-16"
          >
            <span className="text-1.5xl font-times mb-2">
              Visitános en
            </span>
            <span className="text-3xl font-ig">Instagram</span>

            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 20"
              stroke="white"
              className="w-6 h-6 mt-8"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </motion.a>
        </div>

      </div>
    </section>
  )
}
