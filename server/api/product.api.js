import { getProducts } from '../controller/product.controller.js'
import express from 'express'

const router = express.Router()

router.get('/products', getProducts)

export default router
