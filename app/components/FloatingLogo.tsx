'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useGlobalScroll } from '../components/ScrollProvider'
export function FloatingLogo() {


console.log('FloatingLogo mounted', Math.random())
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.span
        className="font-zanova text-7xl"
      >
        {/*ZANOVA*/}
        
      </motion.span>
    </motion.div>
  )
}
