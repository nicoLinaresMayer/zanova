'use client'

import { useState, useEffect } from 'react'
import { getProductBySlug } from '@/lib/products'
import type { Product } from '@/lib/products'
import { notFound } from 'next/navigation'
import ProductGallery from '../../components/ProductGallery'
import { useRouter } from 'next/navigation'
import { addToCart } from '@/lib/cart'

declare global {
  interface Window { MercadoPago: any }
}

type Props = {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null)
  const [mounted, setMounted] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showBrick, setShowBrick] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    params.then(async ({ slug }) => {
      const found = await getProductBySlug(slug)
      if (!found) notFound()
      setProduct(found)

      document.title = `${found.name} · Zanova`

      const searchParams = new URLSearchParams(window.location.search)
      const colorFromUrl = searchParams.get('color')
      const firstColor = colorFromUrl && found.colors.includes(colorFromUrl)
        ? colorFromUrl
        : found.colors[0] ?? null
      setSelectedColor(firstColor)
    })

    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  if (!mounted || !product) return (
    <div className="max-w-6xl mx-auto px-6 py-4">
      <div className="grid md:grid-cols-2 gap-6 items-start animate-pulse">

        {/* Skeleton galería */}
        <div className="w-full aspect-[3/4] bg-neutral-200 rounded-xl" />

        {/* Skeleton info */}
        <div className="flex flex-col gap-4">
          <div className="h-8 bg-neutral-200 rounded w-3/4" />
          <div className="h-4 bg-neutral-200 rounded w-full" />
          <div className="h-4 bg-neutral-200 rounded w-2/3" />
          <div className="mt-4">
            <div className="h-3 bg-neutral-200 rounded w-24 mb-3" />
            <div className="flex gap-2">
              <div className="h-10 w-20 bg-neutral-200 rounded-md" />
              <div className="h-10 w-20 bg-neutral-200 rounded-md" />
            </div>
          </div>
          <div className="mt-2">
            <div className="h-3 bg-neutral-200 rounded w-24 mb-3" />
            <div className="flex gap-2">
              <div className="h-10 w-14 bg-neutral-200 rounded-md" />
              <div className="h-10 w-14 bg-neutral-200 rounded-md" />
              <div className="h-10 w-14 bg-neutral-200 rounded-md" />
              <div className="h-10 w-14 bg-neutral-200 rounded-md" />
            </div>
          </div>
          <div className="mt-4 h-12 bg-neutral-200 rounded-lg w-full" />
        </div>
      </div>
    </div>
  )

  const visibleImages = product.images
    .filter(img => img.color === selectedColor)
    .map(img => img.url)

  // Talles disponibles para el color seleccionado
  const SIZE_ORDER = ['S', 'M', 'L', 'XL', 'XXL']

  const sizesForColor = product.variants
    .filter(v => v.color === selectedColor)
    .sort((a, b) => SIZE_ORDER.indexOf(a.size) - SIZE_ORDER.indexOf(b.size))

  const selectedVariant = product.variants.find(
    v => v.color === selectedColor && v.size === selectedSize
  )
  const displayPrice = selectedVariant?.price
    ?? product.variants.find(v => v.price)?.price
    ?? null

  const selectedStock = selectedVariant?.stock ?? null

  async function handleComprar() {
  if (!selectedSize || !selectedColor || !displayPrice) return

  const imagesOfColor = product!.images.filter(img => img.color === selectedColor)
  const cartImage = imagesOfColor[1]?.url ?? imagesOfColor[0]?.url ?? ''

  const item = {
    slug: product!.slug,
    name: product!.name,
    color: selectedColor,
    size: selectedSize,
    price: displayPrice,
    image: cartImage,
  }
  
  console.log('Agregando al carrito:', item)
  addToCart(item)
  window.dispatchEvent(new Event('cart-updated'))
  window.dispatchEvent(new CustomEvent('open-cart'))
}

  return (
    <div className="max-w-6xl mx-auto px-6 py-4 text-black">
      <div className="grid md:grid-cols-2 gap-6 items-start">

        {/* Galería */}
        <div className="w-full">
          <ProductGallery
            key={selectedColor ?? 'default'}
            images={visibleImages}
          />
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
                      setSelectedSize(null)
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

          {/* Talles */}
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

          {/* Botón comprar */}
          {!showBrick && (
            <button
              onClick={handleComprar}
              disabled={!selectedSize || !selectedColor || selectedStock === 0}
              className="mt-4 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!selectedSize ? 'Seleccioná un talle' : 'Agregar al carrito'}
            </button>
          )}

          <div id="payment-brick-container" />
        </div>
      </div>
    </div>
  )
}