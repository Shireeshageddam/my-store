"use client";
import { useCartStore } from '@/lib/store/cartStore'
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const { items} = useCartStore()
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  
  const total = items.reduce((sum, item) =>
    sum + Number(item.price) * Number(item.quantity || 1),
    0
  );


  const handleCheckout = async () => {
    setLoading(true);


    try{
      const response = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" 

      },
        body: JSON.stringify({
            items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: Number(item.price),
            quantity: Number(item.quantity || 1),
          })),
          email: session?.user?.email || "guest@example.com", // fallback email
        }),
      });


     const data = await response.json()
     
     if (data.sessionId) {
        const stripe = await stripePromise;
        stripe.redirectToCheckout({ sessionId: data.sessionId });

        if (error) {
          console.error('Error during Stripe redirect:', error);
        }
      } else {
        console.error("Stripe session creation failed", data.error);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={handleCheckout} disabled={loading}
      className={`w-full px-4 py-2 rounded-xl text-white font-semibold transition duration-200 ${
        loading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      }`}
    >
      
     
        {loading ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  )
}

export default Checkout