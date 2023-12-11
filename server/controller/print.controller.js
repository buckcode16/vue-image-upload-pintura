import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function uploadImages(req, res) {
  // Create a print
  const print = await prisma.print.create({
    data: {
      user: {
        connect: {
          id: parseInt(req.params.userId),
        },
      },
      product: {
        connect: {
          id: parseInt(req.body.productId),
        },
      },
    },
  })

  // Create image records for the print
  const imageRecords = await Promise.all(
    req.files.map(async (image) => {
      return prisma.image.create({
        data: {
          fieldName: image.fieldname,
          originalName: image.originalname,
          encoding: image.encoding,
          mimeType: image.mimetype,
          destination: image.destination,
          fileName: image.filename,
          path: image.path.substring(image.path.indexOf('\\uploads')),
          size: image.size,
          printId: print.id,
        },
      })
    }),
  )
  // Respond to the client as needed
  res.json({ message: 'File uploaded successfully!', imageRecords })
}

export async function getImages(req, res) {
  // Get the images for the print
  const prints = await prisma.print.findMany({
    where: {
      userId: parseInt(req.params.userId),
    },
    include: {
      images: true,
      order: true,
      product: true,
    },
  })
  // Respond to the client as needed
  res.json(prints)
}
