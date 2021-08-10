const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const debug = require('debug')('app:voocket')

require('dotenv').config()
const app = module.exports = express()
app.env = process.env
global.app = app
global.debug = debug
global.basedir = __dirname

const routes = require('./routes')
const session = require('./session')

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
}
let corsOptions = {
  origin: 'https://voongo.ngoder.com',
  optionsSuccessStatus: 200
}
if (app.get('env') === 'development') {
  corsOptions = {}
}
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}))
app.use(express.static('./public'))
app.use(session)
app.use(routes)
app.use((err, req, res, next) => {
  if (err) {
    if (err.statusCode >= 500) {
      return res.view('errors/500')
    }
    if (err.statusCode === 401) {
      req.session.destroy()
      return res.redirect('/')
    }
    if (err.statusCode === 307) return res.redirect(`/dashboard?message=${err.message}`)
    return res.back({error: err.message})
  }
  next()
})

const port = app.env.APP_PORT || 2323
app.listen(port, () => debug(`listening on port ${port}`))