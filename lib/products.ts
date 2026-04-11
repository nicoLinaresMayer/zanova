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
  stock_amoremio: number
  price: number | null
  color_position?: number
  active: boolean
}

export type Product = {
  id: string
  slug: string
  name: string
  description: string | null
  variants: ProductVariant[]
  images: ProductImage[]
  colors: string[]
  sizes: string[]
  active: boolean
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
        stock_amoremio,
        price,
        color_position,
        active
      ),
      product_images (
        url,
        color,
        position
      )
    `)
    .eq('active', true)
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
      active,
      product_variants (
        id,
        color,
        size,
        stock,
        stock_amoremio,
        price,
        color_position,
        active
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
  const variants: ProductVariant[] = (p.product_variants ?? [])
  .filter((v: ProductVariant) => v.active === true)
  .map((v: ProductVariant) => ({
    id: v.id,
    color: v.color,
    size: v.size,
    stock: v.stock ?? 0,
    stock_amoremio: v.stock_amoremio ?? 0,
    price: v.price ?? null,
    color_position: v.color_position ?? 0,
  }))

  // Colores ordenados por color_position
  const colors = [...new Map(
      (p.product_variants ?? [])
        .sort((a: any, b: any) => (a.color_position ?? 0) - (b.color_position ?? 0))
        .map((v: any) => [v.color, v.color_position])
    ).keys()] as string[]

  // Imágenes ordenadas por color_position primero, luego por position
  const images: ProductImage[] = (p.product_images ?? [])
    .filter((img: any) => img.position !== 0)
    .sort((a: any, b: any) => {
      const colorIndexA = colors.indexOf(a.color)
      const colorIndexB = colors.indexOf(b.color)
      if (colorIndexA !== colorIndexB) return colorIndexA - colorIndexB
      return a.position - b.position
    })
    .map((img: any) => ({
      url: img.url,
      color: img.color ?? null,
      position: img.position,
    }))

  const SIZE_ORDER = ['S', 'M', 'L', 'XL', 'XXL']
  const sizes = ([...new Set(variants.map(v => v.size))] as string[])
  .sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b))

  const dataToReturn = {
    id: p.id,
    slug: p.slug,
    name: p.name,
    description: p.description,
    variants,
    images,
    colors,
    sizes,
    active: p.active
  };
  console.log(dataToReturn);
  return dataToReturn
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