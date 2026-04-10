import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const preferenceId = searchParams.get('preference_id')

  if (!preferenceId) {
    return Response.json({ error: 'preference_id requerido' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data, error } = await supabase
    .from('orders')
    .select('product_name, color, size, price, city, name')
    .eq('mp_preference_id', preferenceId)
    .single()

  if (error || !data) {
    return Response.json({ error: 'Pedido no encontrado' }, { status: 404 })
  }

  return Response.json(data)
}