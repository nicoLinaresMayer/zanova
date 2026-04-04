import { MercadoPagoConfig, Payment } from 'mercadopago'
import { createClient } from '@supabase/supabase-js'

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Webhook recibido:', JSON.stringify(body))

    // MP manda distintos tipos de notificaciones — solo nos interesan los pagos
   // MP puede mandar "payment" o "merchant_order"
    if (body.type !== 'payment' && body.topic !== 'payment') {
    return Response.json({ ok: true })
    }

    const paymentId = body.data?.id ?? body.resource?.split('/').pop()
    if (!paymentId) {
      return Response.json({ ok: true })
    }

    // Consultamos a MP los detalles reales del pago
    const payment = await new Payment(client).get({ id: paymentId })
    console.log('Pago:', payment.status, payment.external_reference)

    if (payment.status === 'approved') {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )

      // Actualizamos la orden por el preference_id
      const { error } = await supabase
        .from('orders')
        .update({
          status: 'approved',
          mp_payment_id: String(paymentId),
        })
        .eq('mp_preference_id', payment.preference_id)

      if (error) console.error('Error actualizando orden:', error)
      else console.log('Orden actualizada a approved')
    }

    // Siempre respondés 200 — si no, MP reintenta indefinidamente
    return Response.json({ ok: true })

  } catch (err) {
    console.error('Error en webhook:', err)
    // Igual respondés 200 para que MP no reintente
    return Response.json({ ok: true })
  }
}