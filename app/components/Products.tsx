import Link from 'next/link'
import type { Product } from '@/lib/products'
import ProductGallery from '../components/ProductGallery'

type Props = {
  products: Product[]
}

export default function Products({ products }: Props) {
  return (
    <section className="bg-white text-black py-3 px-6">
      
      {/* Header de sección */}
      <div className="max-w-6xl mx-auto mb-16">
        <span className="block text-xs uppercase tracking-[0.3em] text-neutral-600 mb-4">
          Colección Ameri
        </span>

        <h2 className="font-zanova text-3xl md:text-5xl">
          ULTIMOS LANZAMIENTOS
        </h2>
      </div>

      {/* Grid de productos */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {products.map((p) => (
          <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
            <div className="aspect-[3/4] bg-neutral-100 overflow-hidden border border-neutral-200">
              <ProductGallery images={p.images} />
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-medium">{p.name}</h3>
              <p className="text-sm text-neutral-600">{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
