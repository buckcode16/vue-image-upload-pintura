import { signup, signin } from '../controller/auth.controller.js'
import express from 'express'

const router = express.Router()

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept',
  )
  next()
})

router.post('/auth/signup', signup)

router.post('/auth/signin', signin)

export default router
