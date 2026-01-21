"use client"

import { motion } from "framer-motion"

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold"
      >
        Hola Next + Tailwind
      </motion.div>
    </main>
  )
}
