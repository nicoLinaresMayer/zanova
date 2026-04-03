'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Product } from '@/lib/products'

type Props = {
  products: Product[]
}

function ProductCard({ p, index }: { p: Product; index: number }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const touchStartX = useRef<number | null>(null)
  const [currentColor, setCurrentColor] = useState<string>(p.colors[0] ?? '')

  const images = p.images.map(img => img.url)

  const availableColors = p.colors.filter(color =>
    p.variants.some(v => v.color === color && (v.stock ?? 0) > 0)
  )

  const SIZE_ORDER = ['S', 'M', 'L', 'XL', 'XXL']
  const availableSizes = [...new Set(
    p.variants.filter(v => (v.stock ?? 0) > 0).map(v => v.size)
  )].sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b))

  function goTo(next: number, dir: 1 | -1) {
    setDirection(dir)
    setCurrent(next)
    const colorOfNext = p.images[next]?.color
    if (colorOfNext) setCurrentColor(colorOfNext)
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-400 mb-2">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Imagen principal con swipe */}
<div
  className="relative aspect-[3/4] overflow-hidden bg-neutral-100"
  onTouchStart={handleTouchStart}
  onTouchEnd={(e) => {
    if (touchStartX.current === null || images.length <= 1) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    touchStartX.current = null
    if (Math.abs(diff) < 40) return // tap corto → no prevenimos nada, el link funciona
    e.preventDefault()
    if (diff > 0) {
      goTo((current + 1) % images.length, 1)
    } else {
      goTo((current - 1 + images.length) % images.length, -1)
    }
  }}
>
  <Link href={`/products/${p.slug}?color=${encodeURIComponent(currentColor)}`} className="block w-full h-full">
    <AnimatePresence mode="sync" custom={direction}>
      <motion.img
        key={current}
        src={images[current]}
        alt={p.name}
        custom={direction}
        variants={{
          enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
          center: { x: 0, opacity: 1 },
          exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
        }}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="w-full h-full object-cover absolute inset-0"
        draggable={false}
      />
    </AnimatePresence>
  </Link>

  {/* Indicador de posición */}
  {images.length > 1 && (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
      {images.map((_, i) => (
        <div
          key={i}
          className={`w-1 h-1 rounded-full transition-all ${
            i === current ? 'bg-white' : 'bg-white/40'
          }`}
        />
      ))}
    </div>
  )}
</div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className={`flex-shrink-0 w-12 h-12 overflow-hidden border transition-all duration-200 ${
                i === current ? 'border-black' : 'border-transparent opacity-50'
              }`}
            >
              <img src={img} alt={`Vista ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <Link href={`/products/${p.slug}?color=${encodeURIComponent(currentColor)}`} className="mt-3 flex flex-col gap-1 px-0.5">
        <h3 className="font-hero font-bold text-lg uppercase leading-tight">{p.name}</h3>
        <div className="flex items-center gap-3 mt-1">
          {availableColors.length > 0 && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              {availableColors.join(' · ')}
            </span>
          )}
          {availableColors.length > 0 && availableSizes.length > 0 && (
            <span className="text-neutral-200 text-xs">|</span>
          )}
          {availableSizes.length > 0 && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              {availableSizes.join(' · ')}
            </span>
          )}
        </div>
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