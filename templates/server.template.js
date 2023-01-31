import express from 'express'

[[server.layers.import]]

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

[[server.routes.generate]]

const PORT = process.env.PORT || [[PORT]]

const server = app.listen(PORT, (req, res) => console.log(`Listening port ${PORT}`))
server.on('error', error => logger.error(`Error: ${error}`));