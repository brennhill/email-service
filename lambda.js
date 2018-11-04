/**
 * This is a lambda handler that also accepts pings to stay warm.
 * If you are not going to use this microservice as a lambda, you can safely delete it.
 * @param event
 * @param context
 * @param callback
 * @returns {*}
 */
exports.service = function handleLambdaRequest(event, context, callback) {
  if (event.source === 'aws.events') {
    return callback(null, "Warmed up - it's cosy now")
  }
  // eslint-disable-next-line global-require
  const service = require('./src/app').createApp()
  // eslint-disable-next-line global-require
  const awsServerlessExpress = require('aws-serverless-express')
  const server = awsServerlessExpress.createServer(service)
  awsServerlessExpress.proxy(server, event, context)
}
