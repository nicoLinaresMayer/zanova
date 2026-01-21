'use client'

import { motion } from 'framer-motion'

const PRODUCTS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  // Generamos imagen aleatoria con Lorem Picsum
  image: `https://picsum.photos/400/400?random=${i + 1}`,
}))

export default function ProductsPage() {
  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold font-times mb-8 text-center">
        Catálogo de Productos
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {PRODUCTS.map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: product.id * 0.1 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-gray-600 mt-2">Descripción corta del producto.</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
