const errors = require('http-errors')
const utils = require('../utils')
const models = require('../models')

const dashboard = {
  index: async (req, res) => {
    res.json({
      auth: true,
      user: {
        _id: req.session.user._id,
        username: req.session.user.username,
      },
      stats: {
        totalUsers: (await models.admin.model.find({})).length,
      },
      nav: {
        users: req.urlTo('users'),
        profile: req.urlTo('profile'),
        logout: req.urlTo('logout'),
      },
      ...req.query
    })
  }
}

module.exports = dashboard