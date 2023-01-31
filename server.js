import express from 'express'

// Realizar aqui el script para importación de capas

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3001

const server = app.listen(PORT, (req, res) => console.log(`Listening port ${PORT}`))
server.on('error', error => logger.error(`Error: ${error}`));