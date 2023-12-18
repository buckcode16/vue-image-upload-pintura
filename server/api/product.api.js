import { getProducts, updateProduct } from '../controller/product.controller.js'
import express from 'express'

const router = express.Router()

router.get('/products', getProducts)
router.post('/products', updateProduct)

export default router
