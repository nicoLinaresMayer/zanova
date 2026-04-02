import { createClient } from '@supabase/supabase-js'

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Faltan variables de entorno de Supabase')
  return createClient(url, key)
}

export type ProductImage = {
  url: string
  color: string | null
  position: number
}

export type ProductVariant = {
  id: string
  color: string
  size: string
  stock: number
  price: number | null
}

export type Product = {
  id: string
  slug: string
  name: string
  description: string | null
  variants: ProductVariant[]
  images: ProductImage[]
  // helpers derivados
  colors: string[]
  sizes: string[]
}

export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      slug,
      name,
      description,
      product_variants (
        id,
        color,
        size,
        stock,
        price
      ),
      product_images (
        url,
        color,
        position
      )
    `)
    .order('position', { ascending: true })

  if (error) throw new Error(`Error cargando productos: ${error.message}`)

  return (data ?? []).map(mapProduct)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      slug,
      name,
      description,
      product_variants (
        id,
        color,
        size,
        stock,
        stock_amoremio,
        price
      ),
      product_images (
        url,
        color,
        position
      )
    `)
    .order('position', { ascending: true })
    .eq('slug', slug)
    .single()

  if (error) return null

  return mapProduct(data)
}

function mapProduct(p: any): Product {
  const variants: ProductVariant[] = (p.product_variants ?? []).map((v: any) => ({
    id: v.id,
    color: v.color,
    size: v.size,
    stock: (v.stock ?? 0) + (v.stock_amoremio ?? 0),
    price: v.price ?? null,
  }))

  const images: ProductImage[] = (p.product_images ?? [])
    .sort((a: any, b: any) => a.position - b.position)
    .map((img: any) => ({
      url: img.url,
      color: img.color ?? null,
      position: img.position,
    }))

  // colores únicos con stock > 0 primero, sin stock al final
  const allColors = [...new Set(variants.map(v => v.color))]
  const colors = [
    ...allColors.filter(c => variants.some(v => v.color === c && v.stock > 0)),
    ...allColors.filter(c => variants.every(v => v.color !== c || v.stock === 0)),
  ]

  // talles únicos
  const SIZE_ORDER = ['S', 'M', 'L', 'XL', 'XXL']

  const sizes = [...new Set(variants.map(v => v.size))]
    .sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b))



  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    variants,
    images,
    colors,
    sizes,
  }
}

export async function getHeroImage(): Promise<string | null> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('product_images')
    .select('url')
    .is('product_id', null)
    .eq('position', -1)
    .single()

  if (error || !data) return null
  return data.url
}