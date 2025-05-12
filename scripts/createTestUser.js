// scripts/createTestUser.js

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
   const existingUser = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (existingUser) {
    console.log("User already exists:", existingUser.email);
    return;
  }
  const password = "admin123"; // Change if needed
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(" Admin user created:", user);
}

main()
  .catch((e) => {
    console.error(" Failed to create user:", e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
