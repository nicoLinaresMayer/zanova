'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Product } from '@/lib/products'

type Props = {
  products: Product[]
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="flex flex-col">
      {/* Número editorial */}
      <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 mb-2 font-ig">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Imagen principal */}
      <Link href={`/products/${p.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          {p.images[current] ? (
            <img
              src={p.images[current]}
              alt={p.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200" />
          )}
        </div>
      </Link>

      {/* Thumbnails */}
      {p.images.length > 1 && (
        <div className="flex gap-2 mt-2">
          {p.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-12 h-12 overflow-hidden border transition-all duration-200 ${
                i === current ? 'border-black' : 'border-transparent opacity-50'
              }`}
            >
              <img
                src={img}
                alt={`Vista ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Info siempre visible */}
      <Link href={`/products/${p.slug}`} className="mt-3 flex items-baseline justify-between px-0.5">
        <h3 className="font-zanova text-lg uppercase leading-tight">{p.name}</h3>
        
      </Link>
    </div>
  )
}

export default function Products({ products }: Props) {
  return (
    <section className="bg-white text-black">

      {/* Header editorial */}
      <div className="max-w-7xl mx-auto px-5 pt-16 pb-8 flex items-end justify-between border-b border-black">
        <h2 className="font-zanova text-[clamp(2rem,8vw,5rem)] leading-none tracking-tight uppercase">
          Ultimos<br />Lanzamientos
        </h2>
        <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 pb-1 hidden md:block">
          Temporada 2026
        </span>
      </div>

      {/* Grid — 2 columnas siempre */}
      <div className="max-w-7xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-12">
        {products.map((p, i) => (
          <ProductCard key={p.slug} p={p} index={i} />
        ))}
      </div>
    </section>
  )
}