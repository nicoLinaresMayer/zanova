'use client'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Header() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0.9]) // fade sutil

  return (
    
<Link href="/">
    <motion.header
      style={{ opacity }}
      className="fixed top-0 left-0 w-full bg-white p-4 z-50 bg-gradient-to-b from-black/15 to-transparent"
    >
      
      <h1 className="text-3xl tracking-widest text-center font-zanova text-light-black pointer-events-none">Zanova</h1>
    
    </motion.header>
      </Link>
    
  )
}
