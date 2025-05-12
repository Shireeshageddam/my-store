
// app/api/success.js

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Your Stripe secret key

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID missing" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const user = await prisma.user.findUnique({
      where: { email: session.customer_email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    // Create an order in your database
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        total: session.amount_total / 100, // Convert to dollars
      },
    });

    // Optional: You can create order items here if needed (depends on your app's structure)

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
