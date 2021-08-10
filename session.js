const session = require('express-session')
const RedisStore = require('connect-redis')(session)

const redisClient = require('./db/redis')
const store = new RedisStore({client: redisClient})

module.exports = session({
  secret: app.env.APP_SECRET,
  resave: false,
  saveUninitialized: false,
  store,
  name: 'sid',
  cookie: {
    secure: app.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }
})