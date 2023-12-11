import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const userAdmin = await prisma.user.upsert({
    where: { email: 'adm@adm.com' },
    update: {},
    create: {
      email: 'adm@adm.com',
      password: hashSync('adm', 8),
      name: 'Admin',
      role: 'ADMIN',
      address: '',
    },
  })
  const user1 = await prisma.user.upsert({
    where: { email: 'aaa@aaa.com' },
    update: {},
    create: {
      email: 'aaa@aaa.com',
      password: hashSync('aaa', 8),
      name: 'Roger Wilco',
      role: 'USER',
      address: '1234 Main St, Anytown, USA',
    },
  })

  const createManyProducts = await prisma.product.createMany({
    data: [
      {
        img: '../../src/assets/images/kodak-overlay.png',
        title: 'Kodachrome',
        description:
          'Iconic for its vibrant colors and fine grain, Kodachrome revolutionized photography, capturing history with its saturated brilliance.',
        path: 'product-1',
        type: 'Kodachrome',
        price: 10,
        overlay: '../../src/assets/images/kodak-overlay.png',
        available: true,
      },
      {
        img: '../../src/assets/images/overlay2.png',
        title: 'Movie Reel',
        description:
          'A nostalgic tribute to cinemas golden age, the Movie Reel print embodies classic film magic with circular frames that echo the timeless allure of the silver screen.',
        path: 'product-2',
        type: 'Movie Reel',
        price: 15,
        overlay: '../../src/assets/images/overlay2.png',
        available: true,
      },
      {
        img: '../../src/assets/images/overlay3.png',
        title: 'Kodak Portra',
        description:
          'Celebrating natural skin tones and versatility, the Kodak Portra-inspired print captures portraits with exceptional depth and true-to-life colors, telling compelling visual stories.',
        path: 'product-3',
        type: 'Kodak Portra',
        price: 20,
        overlay: '../../src/assets/images/overlay3.png',
        available: true,
      },
    ],
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
