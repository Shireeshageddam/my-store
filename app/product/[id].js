'use client';

import Image from 'next/image';
import { useCartStore } from '@/lib/store/cartStore';
import { prisma } from "@/lib/prisma";
import { useState } from "react";

export async function getServerSideProps({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return { notFound: true };
  }

  return { props: { product } };
}

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    const cartProduct = { ...product, quantity };
    addToCart(cartProduct);
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Image src={product.imageUrl} alt={product.name} 
          width={800}
          height={384}
          className="w-full object-cover"/>
        </div>
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-500 mb-4">${product.price}</p>
          <p className="text-lg mb-4">{product.description}</p>

          <div className="flex items-center mb-4">
            <label className="mr-2">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="border p-2 rounded"
            />
          </div>

          <button onClick={handleAddToCart} className="bg-blue-500 text-white px-6 py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
