const errors = require('http-errors')
const utils = require('../utils')
const db = require('../db/monk')
const models = require('../models')
const url = require('url')

const user = {
  index: async (req, res, next) => {
    const users = await db.get('system.users').find({}, ['userId','user','roles','db'])
    res.json({
      new: req.urlTo('users/add'),
      total: users.length,
      users: users.map(x => {
        x.remove = req.urlTo(`users/del?user=${x.user}&db=${x.db}`)
        return x
      }),
      nav: {
        dashboard: req.urlTo('dashboard'),
        profile: req.urlTo('profile'),
        logout: req.urlTo('logout'),
      },
      ...req.query
    })
  },
  addForm: (req, res) => {
    res.view('user/add')
  },
  store: async (req, res, next) => {
    try {
      const { username,password,role,db } = req.body
      const data = {
        db,
        user: [username,password,{roles: [{role,db}]}]
      }
      const result = await models.user.add(data)
      if (result.ok) res.redirect(url.format({pathname: '/users', query: result}))
      else res.back(result)
    } catch (err) {
      err.statusCode = 500
      debug(err.message)
      next(err)
    }
  },
  destroy: async (req, res, next) => {
    try {
      const result = await models.user.del(req.query)
      if (result) {
        res.redirect('/users?ok=1')
      }else{
        res.redirect('/users?ok=0')
      }
    } catch (err) {
      err.statusCode = 500
      debug(err.message)
      next(err)
    }
  }
}

module.exports = user