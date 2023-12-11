import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createOrder(req, res) {
  const printIds = req.body.data.prints
  // Create a print
  const order = await prisma.order.create({
    data: {
      userId: parseInt(req.params.userId),
      prints: {
        connect: printIds.map((printId) => ({ id: parseInt(printId) })),
      },
    },
  })
  res.json({ message: 'Order created successfully!', order })
}

export async function getOrders(req, res) {
  const orders = await prisma.order.findMany({
    where: {
      userId: parseInt(req.params.userId),
    },
    include: {
      prints: {
        include: {
          images: true,
          product: true,
        },
      },
    },
  })
  res.json(orders)
}
