import express from 'express'
import cors from 'cors'
import authRouter from './api/auth.api.js'
import printRouter from './api/print.api.js'
import orderRouter from './api/order.api.js'
import productRouter from './api/product.api.js'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const app = express()

var corsOptions = {
  origin: 'http://localhost:5173',
}

// Get the current module's file path
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Serve static files from the Vue build directory
app.use(express.static(join(__dirname, '../client/public')))

// Cors config
app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use(authRouter)
app.use(printRouter)
app.use(orderRouter)
app.use(productRouter)

// set port, listen for requests
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
