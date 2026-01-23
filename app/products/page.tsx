'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import products from "@/app/data/products.json";


export default function ProductsPage() {
  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold font-times mb-8 text-center">
        Catálogo de Productos
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        {products.map(product => (


          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: product.id * 0.1 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >

                         <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                >

                    <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
                </Link>


            
            <div className="p-4">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
