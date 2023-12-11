import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const checkDuplicateEmail = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })

  if (user) {
    res.status(400).send({
      message: 'Failed! Email is already in use!',
    })
    return
  }
}

export const verifyRegister = {
  checkDuplicateEmail: checkDuplicateEmail,
}
