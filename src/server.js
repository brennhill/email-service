
const env = require('./utils/env')()
const winston = require('winston')
const app = require('./app')

const port = +env('MICROSERVICE_PORT') || 0
const service = app.createApp().listen(port)
const address = service.address()
winston.info('NODE_ENV: ' + process.env.NODE_ENV)
winston.info(`Listening on port ${address.port}! Send an HTTP POST to http://${address.address}:${address.port}/email/send for sending an email`)

