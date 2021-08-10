const express = require('express')
const router = express.Router()
const url = require('url')
const uaParser = require('ua-parser-js')
const reqInfo = require('@mr687/reqeust-info')

const controllers = require('./controllers')
const utils = require('./utils')
const middlewares = require('./middlewares')

router.use(async (req, res, next) => {
  req.urlTo = (to) => {
    return `${req.protocol}://${req.get('host')}/${to}`
  }
  res.back = (query) => {
    const prevUrl = req.get('referer') || '/'
    const prev = url.parse(prevUrl)
    return res.redirect(url.format({
      pathname: prev.pathname,
      query: query||{}
    }))
  }
  req.userInfo = {
    ip_info: await reqInfo((req.get('x-forwarded-for') || req.ip || 'unknown').replace(/:\d+$/, '')),
    ua_info: uaParser(req.get('user-agent'))
  }
  res.view = (view, data) => {
    try {
      res.set('Content-Type', 'text/html')
      res.send(Buffer.from(utils.view(view, data)))
    } catch (err) {
      err.statusCode = 500
      return next(err)
    }
  }
  next()
})
router
  .get('/', middlewares.guest, (req, res) => {
    res.view('login', req.query)
  })
  .post('/login', middlewares.guest, controllers.auth.login)

router
  .get('/dashboard', middlewares.auth, controllers.dashboard.index)
  .get('/users', middlewares.auth, controllers.user.index)
  .get('/users/add', middlewares.auth, controllers.user.addForm)
  .get('/users/del', middlewares.auth, controllers.user.destroy)
  .post('/users', middlewares.auth, controllers.user.store)
  .get('/profile', middlewares.auth, controllers.auth.profile)
  .get('/change-password', middlewares.auth, controllers.auth.passwordForm)
  .post('/change-password', middlewares.auth, controllers.auth.changePassword)
  .get('/logout', middlewares.auth, controllers.auth.logout)

module.exports = router