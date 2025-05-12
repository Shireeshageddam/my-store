import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { prisma } from '@/lib/prisma'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
  

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
     const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    })


    const email = session.customer_email || session.customer_details?.email

    if (!email) {
      console.error('❌ No email found in session:', session)
      return new Response('Missing customer email', { status: 400 })
    }



    const user = await prisma.user.findUnique({
      where: { email }, // Assuming `customer_email` is available
    })

    if (!user) {
      console.error('User not found for email:', email)
      return new Response(`User not found`, { status: 400 })
    }

    try{
      const order = await prisma.order.create({
      data: {
        userId: user.id, // Assuming user ID is stored in session.customer
        total: session.amount_total / 100, // Convert to dollars
        orderItems: {
          create: lineItems.data.map((item) => ({
             productId: item.price.product.metadata.productId, // make sure you store Stripe product ID in your DB!
        quantity: item.quantity,
        price: item.amount_total / 100,
          })),
        },
      },
    })

    console.log('✅ Order saved:', order.id)
  }catch (err) {
    console.error("❌ Error creating order:", err.message);
    return new Response("Order creation failed", { status: 500 });
  }
}
return NextResponse.json({ received: true })
}


  

