// app/api/categories/[id]/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// UPDATE a category
export async function PUT(req, { params }) {
  const body = await req.json();
   const category = await prisma.category.update({
    where: { id: params.id },
    data: { name: data.name },
  });

  return NextResponse.json(category);
}

// DELETE a category
export async function DELETE(req, { params }) {
  try{
  await prisma.category.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Category deleted" });
}catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { message: "Failed to delete category" },
      { status: 500 }
    );
  }
}
