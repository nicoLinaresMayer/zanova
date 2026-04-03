import { createClient } from '@supabase/supabase-js'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function GET() {
  const supabase = getAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, name, slug, description, position,
      product_variants (id, color, size, stock, stock_amoremio, price, color_position),
      product_images (id, url, color, position)
    `)
    .order('position', { ascending: true })
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function POST(request: Request) {
  const supabase = getAdminClient()
  const body = await request.json()
  const { data, error } = await supabase
    .from('products')
    .insert(body)
    .select()
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function PATCH(request: Request) {
  const supabase = getAdminClient()
  const { id, ...fields } = await request.json()
  const { data, error } = await supabase
    .from('products')
    .update(fields)
    .eq('id', id)
    .select()
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}