'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useGlobalScroll } from '../components/ScrollProvider'
export function FloatingLogo() {

const { scrollY } = useGlobalScroll()
const FINAL_Y = -420

  const rawY = useTransform(
    scrollY,
    [0, 100],
    [0, FINAL_Y],
    { clamp: true }
  )

  const rawScale = useTransform(
    scrollY,
    [0, 100],
    [1, 0.55],
    { clamp: true }
  )

  const rawLetterSpacing = useTransform(
    scrollY,
    [0, 100],
    [0.12, 0.02],
    { clamp: true }
  )

  const rawColor = useTransform(
    scrollY,
    [0, 16, 100],
    ['#000000', '#000000', '#ff0000']
  )

  const y = rawY
  const scale = rawScale;
  const letterSpacing  = rawLetterSpacing;
  const color = rawColor;
  //const y = useSpring(rawY, { stiffness: 35, damping: 20 })
  //const scale = useSpring(rawScale, { stiffness: 45, damping: 22 })
  //const letterSpacing = useSpring(rawLetterSpacing, { stiffness: 50, damping: 24 })
  //const color = useSpring(rawColor, { stiffness: 40, damping: 18 })
console.log('FloatingLogo mounted', Math.random())
  return (
    <motion.div
      style={{ y, scale, letterSpacing }}
      className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.span
        style={{ color }}
        className="font-zanova text-7xl tracking-widest"
      >
        ZANOVA
        
      </motion.span>
    </motion.div>
  )
}
