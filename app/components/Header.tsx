'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from "next/link"

export default function Header() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0.9]) // fade sutil

  return (
    <motion.header
      style={{ opacity }}
      className="fixed top-0 left-0 w-full bg-white p-4 z-50 shadow-md"
    >
    <Link href="/">
     <h1 className="text-3xl font-bold text-center font-zanova text-light-black">Zanova</h1>
    </Link>
     
    </motion.header>
  )
}
