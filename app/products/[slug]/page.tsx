import { getProducts } from '@/lib/products'
import { notFound } from 'next/navigation'
import ProductGallery from '../../components/ProductGallery'


export async function generateStaticParams() {
  const products = await getProducts()

  return products.map(p => ({
    slug: p.slug,
  }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const products = await getProducts()

  const product = products.find(p => p.slug === slug)

  if (!product) notFound()

  // Ejemplo de talles, podés traerlos desde Google Sheets también
  const sizes = product.sizes || ['S', 'M', 'L', 'XL']

  return (
    <div className="max-w-6xl mx-auto px-6 py-4 text-black">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Imagen del producto */}
        <div className="w-full">
          <ProductGallery images={product.images} />
        </div>

        {/* Detalles del producto */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold font-zanova">{product.name}</h1>
          <p className="text-gray-700 text-lg">{product.description}</p>

          {/* Talles disponibles */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="mr-2 font-medium">Talles disponibles:</span>
            {sizes.map((size) => (
              <button
                key={size}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Botón de compra */}
          <a
            href={product.mp_link}
            target="_blank"
            className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition"
          >
            Comprar
          </a>
        </div>
      </div>
    </div>
  )
}
