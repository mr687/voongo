const redis = require('redis')

module.exports = redis.createClient({
  host: app.env.REDIS_HOST,
  port: app.env.REDIS_PORT,
  password: app.env.REDIS_PASSWORD,
  prefix: 'voocket_',
})