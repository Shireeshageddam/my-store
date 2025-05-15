import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Link from "next/link";
import { PrismaClient } from "@/lib/prisma";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";


export default async function CategoryList() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="text-red-600">Access Denied. Please login.</div>;
  }
  
  const categories = await prisma.category.findMany();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <Link href="/admin/categories/new" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded">
        Add New Category
      </Link>

      <table className="mt-4 w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border p-2">{category.name}</td>
              <td className="border p-2">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded"
                >
                  Edit
                </Link>
                <DeleteCategoryButton id={category.id}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
