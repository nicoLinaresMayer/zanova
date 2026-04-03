import { createClient } from '@supabase/supabase-js'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(request: Request) {
  const supabase = getAdminClient()
  const body = await request.json()
  const { data, error } = await supabase
    .from('product_variants')
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
    .from('product_variants')
    .update(fields)
    .eq('id', id)
    .select()
    .single()
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data)
}

export async function DELETE(request: Request) {
  const supabase = getAdminClient()
  const { id } = await request.json()
  const { error } = await supabase.from('product_variants').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}