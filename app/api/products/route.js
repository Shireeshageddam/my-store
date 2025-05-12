
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try{
  const products = await prisma.product.findMany({ include: { category: true } });
  return NextResponse.json(products);
}catch (error) {
    console.error("GET Error:", error);
    return new NextResponse("Failed to fetch products", { status: 500 });
  }
}

export async function POST(req) {
   try {
  const body = await req.json();
  console.log("Request Body:", body);
  const { name, price, categoryId, imageUrl,description } = body;

   if (!name || !price || !categoryId || !imageUrl || !description) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        categoryId,
        imageUrl, // Assuming imageUrl is being passed correctly
        description,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}