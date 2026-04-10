'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { clearCart } from '@/lib/cart'

type Order = {
  product_name: string
  color: string
  size: string
  price: number
  city: string
  name: string
}

function GraciasContent() {
  const searchParams = useSearchParams()
  const preferenceId = searchParams.get('preference_id')
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    // Mock temporal
    setOrder({
        product_name: 'Campera Bomber Zanova',
        color: 'Negro',
        size: 'L',
        price: 98900,
        city: 'bahia-blanca',
        name: 'Nico',
    })

      clearCart()
        window.dispatchEvent(new Event('cart-updated'))

    }, [preferenceId])

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-10">

        <h1 className="font-zanova text-3xl uppercase tracking-widest">
          Gracias por tu compra
        </h1>

        {order ? (
          <div className="border border-black/10 p-6 text-left space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Resumen del pedido</p>

            <div className="flex justify-between items-start">
              <div>
                <p className="font-hero font-bold text-xl uppercase">{order.product_name}</p>
                <p className="text-sm text-neutral-500 mt-1">{order.color} · Talle {order.size}</p>
              </div>
              <p className="font-medium">
                $ {Number(order.price).toLocaleString('es-AR')}
              </p>
            </div>

            <div className="border-t border-black/10 pt-4 space-y-1">
              <p className="text-sm text-neutral-500">
                Retiro en <span className="text-black font-medium">
                  {order.city === 'bahia-blanca' ? 'Bahía Blanca' : 'Carmen de Patagones / Viedma'}
                </span>
              </p>
              <p className="text-sm text-neutral-500">
                Hola <span className="text-black font-medium">{order.name}</span>, nos ponemos en contacto a la brevedad.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-neutral-400">Cargando tu pedido...</p>
        )}

        
          <a href="/"
          className="inline-block text-xs uppercase tracking-[0.3em] text-neutral-400 hover:text-black transition"
        >
          Volver al inicio
        </a>

      </div>
    </div>
  )
}

export default function GraciasPage() {
  return (
    <Suspense>
      <GraciasContent />
    </Suspense>
  )
}