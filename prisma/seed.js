import pkg from "@prisma/client";
const{ PrismaClient } = pkg;
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  // Hash the password before storing it
  const password = await bcrypt.hash("admin123", 10);

  // Store the user with the hashed password
  await prisma.user.create({
    data: {
      email: "admin@example.com", // your desired admin email
      password: password, // hashed password
      role: "admin", // assign role as admin
    },
  });

  console.log("Admin user created with hashed password");
}

seed()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
