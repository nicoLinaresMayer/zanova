'use client'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'
import CartDrawer from './CartDrawer'
import { getCart } from '@/lib/cart'

export default function Header() {
  const { scrollY } = useScroll()
  const [cartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
      setCartCount(getCart().length)
      const handleStorage = () => setCartCount(getCart().length)
      const handleOpenCart = () => setCartOpen(true)  // 👈

      window.addEventListener('storage', handleStorage)
      window.addEventListener('cart-updated', handleStorage)
      window.addEventListener('open-cart', handleOpenCart)  // 👈
      return () => {
        window.removeEventListener('storage', handleStorage)
        window.removeEventListener('cart-updated', handleStorage)
        window.removeEventListener('open-cart', handleOpenCart)  // 👈
      }
    }, [])

  const headerOpacityRaw = useTransform(scrollY, [0, 100], [1, 0.9])
  const headerOpacity = useSpring(headerOpacityRaw, { stiffness: 100, damping: 20, mass: 0.3 })

  const iconsOpacityRaw = useTransform(scrollY, [0, 150], [0, 1])
  const iconsOpacity = useSpring(iconsOpacityRaw, { stiffness: 40, damping: 25, mass: 0.5 })

  return (
    <>
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 w-full bg-white p-4 z-50 bg-gradient-to-b from-black/15 to-transparent"
      >
        <div className="relative max-w-6xl mx-auto h-12">
          {/* Logo centrado */}
          <Link href="/">
            <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl tracking-widest font-zanova text-light-black">
              Zanova
            </h1>
          </Link>

          {/* Iconos sociales */}
          <motion.div
            style={{ opacity: iconsOpacity }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 flex gap-3 items-center"
          >
            {/* Instagram */}
            <a href="https://instagram.com/zanova.zn" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.34 3.608 1.316.975.975 1.253 2.242 1.316 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.34 2.633-1.316 3.608-.975.975-2.242 1.253-3.608 1.316-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.34-3.608-1.316-.975-.975-1.253-2.242-1.316-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.34-2.633 1.316-3.608.975-.975 2.242-1.253 3.608-1.316C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.611.443 3.635 1.418 2.659 2.394 2.347 3.558 2.288 4.835.229 8.332.229 15.668 2.288 19.165c.059 1.277.371 2.441 1.347 3.417.975.975 2.139 1.288 3.416 1.347C8.332 23.987 15.668 23.987 19.165 21.928c1.277-.059 2.441-.371 3.417-1.347.975-.975 1.288-2.139 1.347-3.416.059-1.277.072-1.686.072-4.944s-.013-3.667-.072-4.944c-.059-1.277-.371-2.441-1.347-3.417-.975-.975-2.139-1.288-3.416-1.347C15.668.013 8.332.013 12 0z" />
                <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z" />
                <circle cx="18.406" cy="5.594" r="1.44" />
              </svg>
            </a>

            {/* WhatsApp 
            <a href="https://wa.me/5491123456789" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="WhatsApp">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.52 3.48A11.933 11.933 0 0 0 12 .004C5.373.004 0 5.377 0 12c0 2.116.55 4.14 1.592 5.945L0 24l6.31-1.651A11.928 11.928 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.206-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.657-.505-5.184-1.46l-.372-.226-3.752.981.998-3.64-.243-.378A9.954 9.954 0 0 1 2 12c0-5.523 4.477-10 10-10 2.664 0 5.164 1.042 7.054 2.932C21.958 6.836 23 9.336 23 12c0 5.523-4.477 10-10 10zm5.262-7.153c-.272-.136-1.61-.794-1.86-.885-.25-.091-.432-.136-.613.136-.181.272-.698.885-.855 1.065-.157.181-.314.204-.586.068-.272-.136-1.15-.422-2.19-1.351-.81-.721-1.356-1.61-1.518-1.882-.157-.272-.017-.419.119-.555.122-.123.272-.317.408-.476.136-.157.181-.272.272-.454.091-.181.045-.34-.023-.476-.068-.136-.613-1.478-.841-2.028-.221-.532-.447-.46-.613-.47l-.523-.009c-.181 0-.476.068-.725.34s-.949.928-.949 2.264.973 2.625 1.108 2.807c.136.181 1.917 2.928 4.646 4.108.65.28 1.156.447 1.551.573.651.217 1.244.187 1.713.114.522-.079 1.61-.657 1.838-1.292.227-.635.227-1.18.159-1.292-.068-.113-.25-.181-.523-.317z" />
              </svg>
            </a>*/}

            {/* Carrito */}
              {cartCount > 0 && (
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="Carrito"
              >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>)}
          </motion.div>
        </div>
      </motion.header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}