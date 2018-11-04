#!/usr/bin/env node

const express = require('express')
const bodyParser = require('body-parser')
const Joi = require('joi')

const schema = Joi.object().keys({
  templateName: Joi.string().required(),
  templateOptions: Joi.object().required(),
  emailOptions: Joi.object().required(),
  language: Joi.string()
})

exports.createEmailRouter = (config = {}) => {
  const env = require('./utils/env')(config)
  const service = require('./email')(env)

  const router = express.Router()
  router.use(bodyParser.json({}))
  router.post('/send', (req, res, next) => {
    const { body } = req
    const result = Joi.validate(body, schema)
    if (result.error) {
      return res.status(400).json({
        error: result.error.message || String(result.error)
      })
    }
    const {
      emailOptions,
      templateName,
      templateOptions,
      language
    } = req.body
    service.sendTemplatedEmail(emailOptions, templateName, templateOptions, language)
      .then(response => res.json(response))
      .catch(err => res.status(500).json({ error: err.message || String(err) }))
  })
  return router
}

exports.createApp = (config) => {
  const app = express()
  const emailRouter = exports.createEmailRouter(config)

  app.use('/email', emailRouter)

  app.get('/healthcheck', (req, res) => {
    res.status(200).send({ 'status': 'OK' })
  })

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain')
    const pattern = process.env.ROBOTS_INDEX === 'true' ? '' : ' /'
    res.send(`User-agent: *\nDisallow:${pattern}\n`)
  })

  return app
}

