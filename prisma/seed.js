import pkg from "@prisma/client";
const{ PrismaClient } = pkg;
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Store the user with the hashed password
  await prisma.user.create({
    data: {
      email: "admin@example.com", // your desired admin email
      password: hashedPassword, // hashed password
      role: "admin", // assign role as admin
    },
  });

  console.log("Admin user created with hashed password");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
