import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  const { email, phone, slug, name, color, size } = await request.json()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error } = await supabase.from('stock_notifications').insert({
        email,
        phone: phone ?? null,
        product_slug: slug,
        product_name: name,
        color,
        size,
    })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}