import { MercadoPagoConfig, Preference } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('1. Body recibido:', JSON.stringify(body))

    const { slug, name, price, size, color, buyer } = body
    console.log('2. Buyer:', JSON.stringify(buyer))

   const preference = await new Preference(client).create({
        body: {
          items: [
            {
              id: slug,
              title: `${name} — Talle ${size}, Color ${color}`,
              quantity: 1,
              unit_price: Number(price),
              currency_id: 'ARS',
            }
          ],
          payer: {
            name: buyer.name,
            email: buyer.email,
          },
          back_urls: {
            success: `${process.env.NEXT_PUBLIC_BASE_URL}/gracias`,
            failure: `${process.env.NEXT_PUBLIC_BASE_URL}/error`,
            pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pendiente`,
          },
          auto_return: 'approved',
        }
      })
    console.log('3. Preferencia creada:', preference.id)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const insertData = {
      name: buyer.name,
      phone: buyer.phone,
      email: buyer.email,
      city: buyer.city,
      product_slug: slug,
      product_name: name,
      color,
      size,
      price: Number(price),
      mp_preference_id: preference.id,
      status: 'pending',
    }
    console.log('4. Insertando:', JSON.stringify(insertData))

    const { data, error } = await supabase.from('orders').insert(insertData)
    console.log('5. Resultado insert - data:', JSON.stringify(data))
    console.log('5. Resultado insert - error:', JSON.stringify(error))

    return Response.json({
      preference_id: preference.id,
      init_point: preference.init_point
    })

  } catch (err) {
    console.error('ERROR GENERAL:', err)
    return Response.json({ error: String(err) }, { status: 500 })
  }
}