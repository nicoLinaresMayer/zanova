export type Product = {
  slug: string
  name: string
  description: string
  images: string[]       // ojo, ahora es "images"
  mp_link: string
  price: string
  sizes?: string[]       // opcional si querés talles
}

const SHEET_URL =
  'https://opensheet.elk.sh/1HgnZI2FrUcADcxgsXVkdcKFE2gGiEbZZ8BRQvwAE2j0/Activos'

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(SHEET_URL, {
    cache: 'no-store', // clave para que siempre traiga datos nuevos en dev
  })

  if (!res.ok) {
    throw new Error('Error cargando productos')
  }

  const data = await res.json()

  // Transformar columnas de imágenes en array
  return data
    .filter((p: any) => p.slug) // filtramos productos válidos
    .map((p: any) => ({
      slug: p.slug,
      name: p.name,
      description: p.description,
      mp_link: p.mp_link,
      price: p.price,
      sizes: p.sizes ? p.sizes.split(',') :  ['S', 'M', 'L', 'XL'], // opcional
      images: [p.image1, p.image2, p.image3].filter(Boolean), // acá generamos el array
    }))
}
