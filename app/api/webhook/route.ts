import { MercadoPagoConfig, Payment } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Webhook recibido:', JSON.stringify(body))

    // Manejar merchant_order
    if (body.topic === 'merchant_order' && body.resource) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )

      // Traer la merchant order de MP
      const res = await fetch(body.resource, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      })
      const order = await res.json()
      console.log('Merchant order:', JSON.stringify(order))

      // Verificar si hay pagos aprobados
      const approvedPayment = order.payments?.find(
        (p: any) => p.status === 'approved'
      )

      if (approvedPayment) {
        const { error } = await supabase
          .from('orders')
          .update({
            status: 'approved',
            mp_payment_id: String(approvedPayment.id),
          })
          .eq('mp_preference_id', order.preference_id)

        if (error) console.error('Error actualizando orden:', error)
        else console.log('Orden actualizada a approved, preference_id:', order.preference_id)
      }

      return Response.json({ ok: true })
    }

    // Manejar payment directo (por si acaso)
    if (body.type === 'payment') {
      const paymentId = body.data?.id
      if (!paymentId) return Response.json({ ok: true })

      const payment = await new Payment(client).get({ id: paymentId }) as any
      console.log('Pago directo:', payment.status, payment.preference_id)

      if (payment.status === 'approved') {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        await supabase
          .from('orders')
          .update({
            status: 'approved',
            mp_payment_id: String(paymentId),
          })
          .eq('mp_preference_id', payment.preference_id)
      }
    }

    return Response.json({ ok: true })

  } catch (err) {
    console.error('Error en webhook:', err)
    return Response.json({ ok: true })
  }
}