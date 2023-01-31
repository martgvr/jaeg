import express from 'express'

[[layers.import]]

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || [[PORT]]

const server = app.listen(PORT, (req, res) => console.log(`Listening port ${PORT}`))
server.on('error', error => logger.error(`Error: ${error}`));