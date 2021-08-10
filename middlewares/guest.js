const errors = require('http-errors')

module.exports = (req, res, next) => {
  if (!req.session.user) {
    return next()
  }
  const err = new Error('already logged in!')
  err.statusCode = 307
  return next(err)
}