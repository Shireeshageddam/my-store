import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"; 
import Link from "next/link";
import ProductRow from "@/components/ProductRow";

export default async function ProductList() {
  // Protect the page using session
  const session = await getServerSession(authOptions);

  // Redirect to login if no session
  if (!session) {
    return <div className="text-red-600">Access Denied. Please log in as admin.</div>; // or just "/"
  }

  // Fetch the products directly in the component
  const products = await prisma.product.findMany({
    include: { category: true }, // Include category data if necessary
  });

  return (
    <div>
      <h2 className="text-2xl font-bold">Products</h2>
      <Link href="/admin/products/new" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded">
        Add New Product
      </Link>

      <table className="mt-4 w-full border">
        <thead>
          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}