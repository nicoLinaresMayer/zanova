import { MercadoPagoConfig, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!
})

export async function POST(request: Request) {
  const { slug, name, price, size, color } = await request.json()

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
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/gracias`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/error`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pendiente`,
      },
      auto_return: 'approved',
    }
  })

  return Response.json({ 
  preference_id: preference.id,
  init_point: preference.init_point 
})
}