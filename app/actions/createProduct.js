"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createProduct(formData) {
  await prisma.product.create({
    data: {
      name: formData.name,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
      categoryId: formData.categoryId,
    },
  });

  redirect("/admin/products");
}
