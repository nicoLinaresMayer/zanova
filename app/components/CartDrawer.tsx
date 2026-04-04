'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCart, removeFromCart, type CartItem } from '@/lib/cart'
import Link from 'next/link'

type Props = {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: Props) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    if (open) setItems(getCart())

  const handleUpdate = () => setItems(getCart())
  window.addEventListener('cart-updated', handleUpdate)
  return () => window.removeEventListener('cart-updated', handleUpdate)
}, [open])

  function handleRemove(slug: string, color: string, size: string) {
    removeFromCart(slug, color, size)
    setItems(getCart())
    window.dispatchEvent(new Event('cart-updated'))
    }

  const total = items.reduce((acc, i) => acc + i.price, 0)

  const checkoutParams = new URLSearchParams({
    items: JSON.stringify(items)
  }).toString()

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <span className="font-zanova text-lg uppercase tracking-widest">Carrito</span>
              <button onClick={onClose} className="text-gray-400 hover:text-black transition text-xl">✕</button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <p className="text-neutral-400 text-sm uppercase tracking-[0.2em]">Tu carrito está vacío</p>
                  <button onClick={onClose} className="text-xs uppercase tracking-widest underline text-neutral-400 hover:text-black transition">
                    Seguir comprando
                  </button>
                </div>
              ) : (
                items.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start border-b border-gray-100 pb-4">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="font-hero uppercase text-base leading-tight text-black">{item.name}</p>
                        <p className="text-xs text-neutral-400 mt-1">{item.color} · Talle {item.size}</p>
                        <p className="text-sm font-medium mt-2 text-black">$ {Number(item.price).toLocaleString('es-AR')}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.slug, item.color, item.size)}
                      className="text-neutral-300 hover:text-red-400 transition text-sm flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-gray-100 space-y-4 text-black ">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-500 uppercase tracking-wider">Total</span>
                  <span className="font-medium text-lg">$ {total.toLocaleString('es-AR')}</span>
                </div>
                <Link
                  href={`/checkout?${checkoutParams}`}
                  onClick={onClose}
                  className="block w-full bg-black text-white text-center py-4 text-sm uppercase tracking-widest hover:bg-neutral-800 transition"
                >
                  Finalizar compra
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}