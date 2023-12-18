import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getProducts(req, res) {
  const products = await prisma.product.findMany()
  res.json({ message: 'File uploaded successfully!', products })
}

export async function updateProduct(req, res) {
  const product = await prisma.product.update({
    where: {
      id: parseInt(req.body.product.id),
    },
    data: {
      title: req.body.product.type,
      description: req.body.product.description,
      type: req.body.product.type,
      price: req.body.product.price,
      available: req.body.product.available,
    },
  })
  res.json({ message: 'Product updated successfully!', product })
}
