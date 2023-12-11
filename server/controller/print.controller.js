import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function uploadImages(req, res) {
  // Your verification and processing logic here
  // console.log(req.body.type)
  // console.log(req.body.price)
  // console.log('userId', req.params.userId)
  // console.log(req.params.orderId)
  // console.log(req.files)

  // Create a print
  const print = await prisma.print.create({
    data: {
      type: req.body.type,
      price: parseFloat(req.body.price),
      user: {
        connect: {
          id: parseInt(req.params.userId),
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
    },
  })
  // Respond to the client as needed
  res.json(prints)
}
