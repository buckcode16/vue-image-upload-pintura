import { uploadImages, getImages } from '../controller/print.controller.js'
import { promises as fsPromises } from 'fs'
import express from 'express'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { join, dirname, extname } from 'path'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Multer configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const userID = req.params.userId // Extract userID from request parameters
    const orderID = req.params.orderId // Extract orderID from request parameters

    // Define the destination directory dynamically based on userID and orderID
    const destination = join(__dirname, '../../client/public/uploads/', userID)
    // Ensure the directory exists
    await fsPromises.mkdir(destination, { recursive: true })

    cb(null, destination)
  },
  filename: (req, file, cb) => {
    // Use a meaningful filename (you can modify this as needed)
    const filename = `image${Date.now()}${extname(file.originalname)}`
    cb(null, filename)
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
})

router.post('/upload/:userId', upload.array('images'), uploadImages)
router.get('/images/:userId', getImages)

export default router
