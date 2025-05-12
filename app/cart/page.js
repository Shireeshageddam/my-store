'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from '@/lib/store/cartStore';

const Cart = () => {
  const { items, removeFromCart } = useCartStore();
   const router = useRouter(); 
  
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-white-800">Shopping Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Add some products!</p>
      ) : (
        <div className="space-y-6">
            {items.map((item) => (

              <div key={item.id} className="flex border border-gray-300 rounded-xl overflow-hidden shadow-sm">

                  <Image src={item.imageUrl} alt={item.name} 
                   width={128}  
                   height={128} 
                  className="object-cover mt-4 ml-4"/>

                  <div className="flex flex-col items-end flex-1 text-right p-4">
                    <div>
                       <h2 className="text-xl font-semibold text-white-800">{item.name}</h2>
                       <p className="text-white-500 mt-1 p-4">${item.price}</p>

                </div>

                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-600 hover:bgred-700 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

          <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-lg font-semibold text-white-800">Total: ${total.toFixed(2)}</p>

            <div className="flex gap-4">
            <button onClick={handleCheckout} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
              Checkout
            </button>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">Continue Shopping</Link>
          </div>
        </div>
       </div> 
      )}
    </div>
  );
};

export default Cart;
