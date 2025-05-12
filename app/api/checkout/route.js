
import { NextResponse } from "next/server";
import { prisma } from '@/lib/prisma'; // Import Prisma client
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Your secret Stripe key

export async function POST(req) {
  try {
    const { items, userEmail } = await req.json(); // Assuming you're passing the cart items and user email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 400 });
      }

      const lineItems = items.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100, // Stripe expects the amount in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: user.email, // Use the user's email from Prisma
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

     