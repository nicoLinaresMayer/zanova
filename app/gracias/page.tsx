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
    clearCart()
    window.dispatchEvent(new Event('cart-updated'))

    if (!preferenceId) return

    fetch(`/api/orders/by-preference?preference_id=${preferenceId}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) setOrder(data)
      })
  }, [preferenceId])

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-10">

        <h1 className="font-zanova text-2xl uppercase tracking-widest">
          Gracias por tu compra
        </h1>

        {order ? (
          <div className="border border-black/10 p-6 text-left space-y-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Resumen del pedido</p>

            <div className="flex justify-between items-start">
              <div>
                <p className="font-hero font-bold text-xl uppercase">{order.product_name}</p>
                <p className="text-sm text-neutral-500">{order.color} · Talle {order.size}</p>
                <p className="text-sm text-neutral-500 mt-3">
                Retiro en <span className="text-black font-medium">
                  {order.city === 'bahia-blanca' ? 'Bahía Blanca' : 'Carmen de Patagones / Viedma'}
                </span>
              </p>
              </div>
              <p className="font-medium">
                $ {Number(order.price).toLocaleString('es-AR')}
              </p>
            </div>

            <div className="border-t border-black/10 pt-4 space-y-1">
  
  <p className="text-sm text-neutral-500">
    <span className="text-black font-medium">{order.name}</span>, nos pondremos en contacto a la brevedad.
  </p>

  <div className="pt-4 flex items-center gap-3">
    <p className="text-xs  tracking-[0.2em]">También podés escribirnos en Instagram</p>
    
      <a href="https://instagram.com/zanova.zn"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-black transition-colors"
      aria-label="Instagram"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.34 3.608 1.316.975.975 1.253 2.242 1.316 3.608.058 1.265.069 1.645.069 4.849s-.012 3.584-.07 4.849c-.062 1.366-.34 2.633-1.316 3.608-.975.975-2.242 1.253-3.608 1.316-1.265.058-1.645.069-4.849.069s-3.584-.012-4.849-.07c-1.366-.062-2.633-.34-3.608-1.316-.975-.975-1.253-2.242-1.316-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.34-2.633 1.316-3.608.975-.975 2.242-1.253 3.608-1.316C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.611.443 3.635 1.418 2.659 2.394 2.347 3.558 2.288 4.835.229 8.332.229 15.668 2.288 19.165c.059 1.277.371 2.441 1.347 3.417.975.975 2.139 1.288 3.416 1.347C8.332 23.987 15.668 23.987 19.165 21.928c1.277-.059 2.441-.371 3.417-1.347.975-.975 1.288-2.139 1.347-3.416.059-1.277.072-1.686.072-4.944s-.013-3.667-.072-4.944c-.059-1.277-.371-2.441-1.347-3.417-.975-.975-2.139-1.288-3.416-1.347C15.668.013 8.332.013 12 0z" />
        <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998z" />
        <circle cx="18.406" cy="5.594" r="1.44" />
      </svg>
    </a>
  </div>
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