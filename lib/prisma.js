// lib/prisma.js
// lib/prisma.js
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global

let prisma

if (!globalForPrisma.prisma) {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ['error'], // optional
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }
} else {
  prisma = globalForPrisma.prisma
}

export { prisma }
