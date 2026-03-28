import { createClient } from '@supabase/supabase-js'

export type Product = {
  slug: string
  name: string
  description: string
  images: string[]
  mp_link: string
  price: string
  sizes?: string[]
  colors?: string[]
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Faltan las variables de entorno de Supabase (NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY)')
  }

  return createClient(url, key)
}

export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabaseClient()


  const { data, error } = await supabase
    .from('products')
    .select('*')
  if (error) {
    throw new Error(`Error cargando productos: ${error.message}`)
  }
    return (data ?? []).map((p) => ({
    slug: p.slug,
    name: p.name,
    description: p.description,
    mp_link: p.mp_link,
    price: p.price,
    sizes: p.sizes ?? ['S', 'M', 'L', 'XL'],
    colors: p.colors ?? ['Blanco', 'Negro'],
    images: p.images ?? [],   // ya viene como array desde Postgres
  }))
}
