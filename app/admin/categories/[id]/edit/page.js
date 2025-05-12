import { prisma } from "@/lib/prisma";
import CategoryFormWrapper from "./CategoryFormWrapper";
import { redirect } from "next/navigation";

export default async function EditCategoryPage({ params }) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (!category) return <div>Category not found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>
      <CategoryFormWrapper category={category} id={params.id} />
    </div>
  );
}
