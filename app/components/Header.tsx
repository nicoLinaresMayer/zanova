'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function Header() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0.9]) // fade sutil

  return (
    <motion.header
      style={{ opacity }}
      className="fixed top-0 left-0 w-full bg-pearl p-4 z-50 bg-gradient-to-b from-black/15 to-transparent pointer-events-none"
    >
      <h1 className="text-3xl md:text-5xl tracking-widest text-center font-zanova text-light-black">Zanova</h1>
    </motion.header>
  )
}
