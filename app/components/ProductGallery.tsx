'use client'

import { useState } from 'react'

type Props = {
  images: string[]
}

export default function ProductGallery({ images }: Props) {
  const [current, setCurrent] = useState(0)

  return (
    <div className="flex flex-col gap-2"> {/* gap más pequeño */}
      {/* Imagen principal */}
      <div className="w-full rounded-xl border border-gray-200 shadow-md overflow-hidden">
        <img
          src={images[current]}
          alt={`Imagen ${current + 1}`}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-2 overflow-x-auto">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
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
