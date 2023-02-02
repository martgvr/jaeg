import express from 'express'

import { cartsRoutes } from './routes/carts.routes.js'
import { productsRoutes } from './routes/products.routes.js'
import { usersRoutes } from './routes/users.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/carts', cartsRoutes.init())
app.use('/products', productsRoutes.init())
app.use('/users', usersRoutes.init())

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, (req, res) => console.log(`Listening port ${PORT}`))
server.on('error', error => logger.error(`Error: ${error}`));