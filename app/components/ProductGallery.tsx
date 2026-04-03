'use client'

import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  images: string[]
}

export default function ProductGallery({ images }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const touchStartX = useRef<number | null>(null)

  function goTo(next: number, dir: 1 | -1) {
    setDirection(dir)
    setCurrent(next)
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Imagen principal */}
      <div className="relative w-full aspect-[3/4] rounded-xl border border-gray-200 shadow-md overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.img
            key={current}
            src={images[current]}
            alt={`Imagen ${current + 1}`}
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

        {/* Capa de swipe */}
        <div
          className="absolute inset-0"
          onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
          onTouchEnd={e => {
            if (touchStartX.current === null || images.length <= 1) return
            const diff = touchStartX.current - e.changedTouches[0].clientX
            if (Math.abs(diff) < 40) return
            e.preventDefault()
            if (diff > 0) {
              goTo((current + 1) % images.length, 1)
            } else {
              goTo((current - 1 + images.length) % images.length, -1)
            }
            touchStartX.current = null
          }}
        />

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
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`flex-shrink-0 border-2 rounded-md cursor-pointer ${
              i === current ? 'border-black' : 'border-transparent'
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${i + 1}`}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}