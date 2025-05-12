import { NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Use your Stripe secret key

export async function POST(req) {
  try {
     const body = await req.json();
      const { items, email } = body

        if (!items || !Array.isArray(items) || items.length === 0 || !email) {
      return NextResponse.json(
        { error: 'Invalid request: missing items or email' },
        { status: 400 }
      )
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          metadata: {
            productId: item.id || 'unknow',  // Add the product ID here (from your DB)
          }
        },
        unit_amount: Math.round(item.price * 100),  // Price in cents
      },
      quantity: item.quantity,
    }))

      

     const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
        mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/cancel`, // Redirect if payment is canceled
     customer_email: email,
    });

    // Return the sessionId to the frontend
    return NextResponse.json({ sessionId: session.id});

  } catch (error) {
    console.error("Error during payment processing:", error);
    return NextResponse.json({ error: error.message || 'Internal server Error' }, { status: 500 });
  }
}