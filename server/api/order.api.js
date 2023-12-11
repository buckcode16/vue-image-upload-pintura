import { createOrder, getOrders } from '../controller/order.controller.js'
import express from 'express'

const router = express.Router()

router.post('/order/:userId', createOrder)
router.get('/order/:userId', getOrders)

export default router
