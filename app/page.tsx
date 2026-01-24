'use client'

import {motion} from 'framer-motion'
import Link from 'next/link'
import ProductsSection from './components/ProductsSection';

const INSTAGRAM_URL = 'https://www.instagram.com/zanova.zn/'

export default function Landing() {
    return (
    <>
     <section className="relative h-[calc(100svh-4rem)] w-full">
  {/* Imagen */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/zanova_bg_2.jpg')" }}
  />


  <div className="absolute inset-0 bg-black/40" />

  <div className="relative z-10 flex h-full w-full flex-col items-center justify-center- translate-y-[20%]">
    
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center gap-2 mb-8"
    >
      <h2 className="text-xl font-bold text-white">
        Próximamente
      </h2>
      <h1 className="text-2xl font-bold font-zanova text-white">
        Tienda Zanova
      </h1>
    </motion.a>

    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center"
    >
      <h1 className="text-3xl font-ig text-white drop-shadow-lg flex flex-col items-center">
        <span className="text-2xl font-times -mb-1">
          Visitanos en
        </span>
        Instagram
      </h1>

      <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 20" stroke="white" className="w-6 h-6 mt-9" animate={{
                        x: [
                            5, 10, 5
                        ],
                        rotate: [90, 90, 90]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut"
                    }}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"/>
                </motion.svg>
    </motion.a>

  </div>
</section>



      {/* CONTENIDO DEBAJO */}
      <section className="bg-white text-black">
        <ProductsSection />
      </section>
    </>
  );
}
