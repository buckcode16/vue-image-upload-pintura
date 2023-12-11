import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getProducts(req, res) {
  const products = await prisma.product.findMany()
  res.json({ message: 'File uploaded successfully!', products })
}
