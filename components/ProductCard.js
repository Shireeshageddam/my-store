'use client';
import { useCartStore } from '@/lib/store/cartStore';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition">
      {product.imageUrl && (
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={300}
          className="object-cover w-full h-60 rounded"
        />
      )}

      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600 mt-1">{product.description}</p>
      <p className="text-lg font-bold mt-2 text-blue-600">${product.price}</p>

      {/* ⭐ Rating */}
      <div className="flex items-center text-yellow-500 text-sm mt-1">
        {'★'.repeat(Math.round(product.rating || 4))}
        <span className="text-gray-400 ml-2">({product.rating || 4}/5)</span>
      </div>

      {/* 🛒 Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
