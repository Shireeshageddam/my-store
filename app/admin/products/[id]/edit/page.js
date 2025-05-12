
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProductFormWrapper from "./ProductFormWrapper";



// Fetch product from the database based on ID
export async function generateMetadata({ params }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    return {notFound:true };
  }
  return {
    title: `Edit ${product.name}`,
  };
}

export default async function EditProductPage({ params }){
  const { id } = params; 
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-red-600">Access Denied. Please login.</div>;
  }

  const product = await prisma.product.findUnique({
    where: { id},
  });


   if (!product) {
    return <div>Product not found.</div>;
  }

  const categories = await prisma.category.findMany(); 
  return (
    <div className="space-y-4">
      <ProductFormWrapper
        defaultValues={product}
        categories={categories}
        productId={id}
      />
    </div>
  );
}