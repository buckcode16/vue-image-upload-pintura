import {
  createOrder,
  getOrders,
  updateOrders,
  confirmOrder,
} from '../controller/order.controller.js'
import express from 'express'

const router = express.Router()

router.post('/order/:userId', createOrder)
router.post('/order', updateOrders)
router.post('/order/confirm/:orderId', confirmOrder)
router.get('/order/:userId?', getOrders)

export default router
