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

export async function confirmOrder(req, res) {
  const orderId = req.params.orderId
  console.log(orderId)
  const order = await prisma.order.update({
    where: {
      id: parseInt(orderId),
    },
    data: {
      order_status: 'SHIPPED',
    },
  })
  res.json({ message: 'Order created successfully!', order })
}

export async function getOrders(req, res) {
  if (!req.params.userId) {
    const orders = await prisma.order.findMany({
      include: {
        prints: {
          include: {
            images: true,
            product: true,
          },
        },
        user: true,
      },
    })
    return res.json(orders)
  }
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

export async function updateOrders(req, res) {
  const orderIds = req.body.data.orderIds

  var paymentMethod = ''

  switch (req.body.data.paymentMethod) {
    case 'tng-ewallet':
      paymentMethod = 'TNG_EWALLET'
      break

    case 'credit-card':
      paymentMethod = 'CREDIT_CARD'
      break
    case 'paypal':
      paymentMethod = 'PAYPAL'
      break

    default:
      break
  }

  console.log(paymentMethod)
  const order = await prisma.order.updateMany({
    where: {
      id: {
        in: orderIds.map((orderId) => parseInt(orderId)),
      },
    },
    data: {
      payment_type: paymentMethod,
      order_status: 'PAID',
    },
  })
  res.json({ message: 'Orders updated successfully!', order })
}
