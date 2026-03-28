'use client'

import { useState, useEffect } from 'react'
import { getProducts } from '@/lib/products'
import { notFound } from 'next/navigation'
import ProductGallery from '../../components/ProductGallery'

type Props = {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: Props) {
  const [product, setProduct] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  useEffect(() => {
    params.then(async ({ slug }) => {
      const products = await getProducts()
      const found = products.find(p => p.slug === slug)
      if (!found) notFound()
      setProduct(found)
    })
  }, [])

  if (!product) return null

  const sizes = product.sizes ?? ['S', 'M', 'L', 'XL']
  const colors = product.colors ?? ['Blanco', 'Negro']

  return (
    <div className="max-w-6xl mx-auto px-6 py-4 text-black">
      <div className="grid md:grid-cols-2 gap-12 items-start">

        {/* Galería */}
        <div className="w-full">
          <ProductGallery images={product.images} />
        </div>

        {/* Detalles */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold font-zanova">{product.name}</h1>
          <p className="text-gray-700 text-lg">{product.description}</p>

          {/* Talles */}
          <div>
            <span className="mr-2 font-medium">Talles disponibles:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                  className={`px-4 py-2 border rounded-md text-sm transition-all duration-200 ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colores */}
          <div>
            <span className="mr-2 font-medium">Colores disponibles:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {colors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color === selectedColor ? null : color)}
                  className={`px-4 py-2 border rounded-md text-sm transition-all duration-200 ${
                    selectedColor === color
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Botón comprar 
          
            <a href={product.mp_link}
            target="_blank"
            className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Comprar
          </a>*/}
        </div>
      </div>
    </div>
  )
}