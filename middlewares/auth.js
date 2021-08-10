const errors = require('http-errors')

module.exports = (req, res, next) => {
  if (req.session.user) {
    return next()
  }
  return next(errors(401))
}