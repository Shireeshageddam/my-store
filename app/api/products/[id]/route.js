import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try{
  const body = await req.json();
  const { name, price, categoryId,imageUrl,description } = body;

  const updatedProduct = await prisma.product.update({
    where: { id: params.id},
    data: { name, price: parseFloat(price), categoryId,imageUrl,description,
     },
  });

   return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Update Error:", error);
    return new NextResponse("Failed to update product", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    
   const deletedProduct = await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Product deleted", deletedProduct });
  } catch (error) {
    console.error("Delete Error:", error);
    return new NextResponse("Failed to delete product", { status: 500 });
  }
}