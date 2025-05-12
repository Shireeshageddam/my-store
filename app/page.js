export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma"; // Adjust path if needed
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function HomePage() {
  const products = await prisma.product.findMany();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
