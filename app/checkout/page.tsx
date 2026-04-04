'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { clearCart } from '@/lib/cart'

type CartItem = {
  slug: string
  name: string
  color: string
  size: string
  price: number
  image: string
}

function CheckoutForm() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const itemsParam = searchParams.get('items')
  const items: CartItem[] = itemsParam ? JSON.parse(itemsParam) : []

  const slug = items[0]?.slug ?? searchParams.get('slug') ?? ''
  const name = items[0]?.name ?? searchParams.get('name') ?? ''
  const color = items[0]?.color ?? searchParams.get('color') ?? ''
  const size = items[0]?.size ?? searchParams.get('size') ?? ''
  const price = items[0]?.price ?? searchParams.get('price') ?? ''
  const totalPrice = items.length > 0
    ? items.reduce((acc, i) => acc + i.price, 0)
    : Number(price)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  function validate() {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = 'Requerido'
    if (!formData.phone.trim()) e.phone = 'Requerido'
    if (!formData.email.trim()) e.email = 'Requerido'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Email inválido'
    if (!formData.city) e.city = 'Requerido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handlePagar() {
    if (!validate()) return
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.length > 0 ? items : null,
          slug,
          name,
          price,
          size,
          color,
          buyer: formData,
        })
      })
      const { init_point } = await res.json()
      window.location.href = init_point
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const inputClass = (field: string) => `w-full border-b ${errors[field] ? 'border-red-400' : 'border-black/20'} bg-transparent py-3 text-sm focus:outline-none focus:border-black transition placeholder:text-neutral-400`

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="font-hero text-2xl tracking-widest uppercase">Zanova</h1>
        </div>

        {/* Resumen del pedido */}
        <div className="border border-black/10 p-6 mb-10 space-y-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4">Tu pedido</p>

          {items.length > 0 ? (
            <>
              {items.map((item, i) => (
                <div key={i} className="flex justify-between items-start py-2 border-b border-black/5 last:border-0">
                  <div>
                    <p className="font-hero uppercase text-sm">{item.name}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{item.color} · Talle {item.size}</p>
                  </div>
                  <p className="text-sm font-medium">$ {Number(item.price).toLocaleString('es-AR')}</p>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3">
                <span className="text-xs uppercase tracking-wider text-neutral-400">Total</span>
                <p className="font-medium text-lg">$ {totalPrice.toLocaleString('es-AR')}</p>
              </div>
            </>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <p className="font-hero text-xl uppercase">{name}</p>
                <p className="text-sm text-neutral-500 mt-1">{color} · Talle {size}</p>
              </div>
              <p className="font-medium text-lg">$ {Number(price).toLocaleString('es-AR')}</p>
            </div>
          )}
        </div>

        {/* Formulario */}
        <div className="space-y-8">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Tus datos</p>

          <div className="space-y-6">
            <div>
              <input
                className={inputClass('name')}
                placeholder="Nombre completo"
                value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                className={inputClass('phone')}
                placeholder="Teléfono / WhatsApp"
                type="tel"
                value={formData.phone}
                onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <input
                className={inputClass('email')}
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <select
                className={`${inputClass('city')} cursor-pointer`}
                value={formData.city}
                onChange={e => setFormData(p => ({ ...p, city: e.target.value }))}
              >
                <option value="">Retiro en:</option>
                <option value="bahia-blanca">Bahía Blanca</option>
                <option value="carmen-patagones">Carmen de Patagones</option>
              </select>
              {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
            </div>
          </div>

          <button
            onClick={handlePagar}
            disabled={loading}
            className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest hover:bg-neutral-800 transition disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'Continuar al pago'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  )
}