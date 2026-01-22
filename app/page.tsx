'use client'

import { motion } from 'framer-motion'


const INSTAGRAM_URL = 'https://www.instagram.com/zanova.zn/'

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90px] gap-1 p-4 ">

      <motion.a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center  gap-4"
      >
   <h1 className="text-6xl f text-center font-ig text-white drop-shadow-lg">  Instagram</h1>
      </motion.a>

      <motion.a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        className="flex items-center justify-center gap-2 mt-3"
      >
        <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-center font-zanova text-white">Tienda Zanova</h1>
        
        <h2 className="text-2xl font-bold text-center text-white"> Proximamente </h2>
        </div>
        

      </motion.a>

    </div>
  )
}
