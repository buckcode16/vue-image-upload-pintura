import { PrismaClient } from '@prisma/client'

import jwt from 'jsonwebtoken'
import { hashSync, compareSync } from 'bcrypt'

const { sign } = jwt
const prisma = new PrismaClient()

export async function signup(req, res) {
  // check duplicate email
  const isExist = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })

  if (isExist) {
    res.status(400).send({
      message: 'Failed! Email is already in use!',
    })
    return
  }
  // Save User to Database
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      password: hashSync(req.body.password, 8),
      role: 'USER',
    },
  })
  if (user) {
    res.send({ message: 'User registered successfully!' })
  } else {
    res.status(500).send({ message: err.message })
  }
}

export async function signin(req, res) {
  await prisma.user
    .findUnique({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }
      var passwordIsValid = compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        })
      }

      const token = sign({ id: user.id }, 'secret', {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      })

      res.status(200).send({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: token,
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}
