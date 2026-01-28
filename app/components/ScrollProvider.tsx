'use client'

import { createContext, useContext } from 'react'
import { useScroll } from 'framer-motion'

const ScrollContext = createContext<ReturnType<typeof useScroll> | null>(null)

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const scroll = useScroll()

  return (
    <ScrollContext.Provider value={scroll}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useGlobalScroll() {
  const ctx = useContext(ScrollContext)
  if (!ctx) {
    throw new Error('useGlobalScroll must be used inside ScrollProvider')
  }
  return ctx
}
