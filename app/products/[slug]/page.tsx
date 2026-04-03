'use client'

import { useState, useEffect } from 'react'
import { getProductBySlug } from '@/lib/products'
import type { Product } from '@/lib/products'
import { notFound } from 'next/navigation'
import ProductGallery from '../../components/ProductGallery'

declare global {
  interface Window { MercadoPago: any }
}

type Props = {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showBrick, setShowBrick] = useState(false)

  useEffect(() => {
    params.then(async ({ slug }) => {
      const found = await getProductBySlug(slug)
      if (!found) notFound()
      setProduct(found)
      // preseleccionar primer color con stock
      const firstImage = found.images
      .filter(img => img.position > 0)
      .sort((a, b) => a.position - b.position)[0]
      const firstColor = firstImage?.color ?? found.colors[0] ?? null
      setSelectedColor(firstColor)
    })

    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  if (!product) return null

  // Imágenes filtradas por color seleccionado
  const visibleImages = product.images
    .filter(img => img.color === selectedColor )
    .map(img => img.url)


    
  // Talles disponibles para el color seleccionado
  const SIZE_ORDER = ['S', 'M', 'L', 'XL', 'XXL']

  const sizesForColor = product.variants
    .filter(v => v.color === selectedColor)
    .sort((a, b) => SIZE_ORDER.indexOf(a.size) - SIZE_ORDER.indexOf(b.size))

  // Precio: buscar variante seleccionada o primer precio disponible
  const selectedVariant = product.variants.find(
    v => v.color === selectedColor && v.size === selectedSize
  )
  const displayPrice = selectedVariant?.price
    ?? product.variants.find(v => v.price)?.price
    ?? null

  // Stock de la variante seleccionada
  const selectedStock = selectedVariant?.stock ?? null

  async function handleComprar() {
    if (!window.MercadoPago || !selectedVariant) return
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: product!.slug,
          name: product!.name,
          price: displayPrice,
          size: selectedSize,
          color: selectedColor,
        })
      })
      const { preference_id } = await res.json()

      const mp = new window.MercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY, {
        locale: 'es-AR',
        advancedFraudPrevention: false,
      })

      const bricksBuilder = mp.bricks()
      const container = document.getElementById('payment-brick-container')
      if (container) container.innerHTML = ''

      await bricksBuilder.create('payment', 'payment-brick-container', {
        initialization: {
          amount: Number(displayPrice),
          preferenceId: preference_id,
        },
        customization: {
          paymentMethods: {
            ticket: 'all',
            creditCard: 'all',
            debitCard: 'all',
            mercadoPago: 'all',
          },
        },
        callbacks: {
          onReady: () => { setShowBrick(true); setLoading(false) },
          onSubmit: async ({ formData }: any) => {
            const res = await fetch('/api/process-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.status === 'approved') window.location.href = '/gracias'
            else if (data.status === 'pending') window.location.href = '/pendiente'
            else window.location.href = '/error'
          },
          onError: (error: any) => { console.error(error); setLoading(false) },
        },
      })
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-4 text-black">
      <div className="grid md:grid-cols-2 gap-6 items-start">

        {/* Galería — imágenes del color seleccionado */}
        <div className="w-full">
          <ProductGallery images={visibleImages} />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-hero">{product.name}</h1>
          <p className="text-gray-700 text-lg">{product.description}</p>

          {/* Colores */}
          <div>
            <span className="mr-2 font-medium">Colores disponibles:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {product.colors.map(color => {
                const hasStock = product.variants.some(v => v.color === color && v.stock > 0)
                return (
                  <button
                    key={color}
                    onClick={() => {
                      setSelectedColor(color)
                      setSelectedSize(null) // resetear talle al cambiar color
                    }}
                    disabled={!hasStock}
                    className={`px-4 py-2 border rounded-md text-sm transition-all duration-200 ${
                      selectedColor === color
                        ? 'bg-black text-white border-black'
                        : hasStock
                        ? 'bg-white text-black border-gray-300 hover:bg-gray-100'
                        : 'bg-white text-gray-300 border-gray-200 cursor-not-allowed line-through'
                    }`}
                  >
                    {color}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Talles — solo para el color seleccionado */}
          <div>
            <span className="mr-2 font-medium">Talles disponibles:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizesForColor.map(variant => (
                <button
                  key={variant.size}
                  onClick={() => setSelectedSize(variant.size === selectedSize ? null : variant.size)}
                  disabled={variant.stock === 0}
                  className={`px-4 py-2 border rounded-md text-sm transition-all duration-200 ${
                    selectedSize === variant.size
                      ? 'bg-black text-white border-black'
                      : variant.stock > 0
                      ? 'bg-white text-black border-gray-300 hover:bg-gray-100'
                      : 'bg-white text-gray-300 border-gray-200 cursor-not-allowed line-through'
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

         
          {/* Botón comprar */
          }
          {!showBrick && false && (
            <button
              onClick={handleComprar}
              disabled={loading || !selectedSize || !selectedColor || selectedStock === 0}
              className="mt-4 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Cargando...' : !selectedSize ? 'Seleccioná un talle' : 'Comprar'}
            </button>
          )}

          <div id="payment-brick-container" />
        </div>
      </div>
    </div>
  )
}