const {admin} = require('../models')
const bcrypt = require('bcryptjs')
const errors = require('http-errors')

const auth = {
  login: async (req, res, next) => {
    try {
      const {username, password} = req.body
      const user = await admin.model.findOne({username})
      if (!user) throw errors(422, 'username not found!')
      if (await bcrypt.compare(password, user.password)) {
        req.session.user = user
        admin.updateLogin(req, username)
        return res.redirect('/dashboard?ok=1')
      }
      console.log(await bcrypt.compare(password, user.password))
      throw errors(422, 'password mismatch!')
    } catch (err) {
      debug(err.message)
      next(err)
    }
  },
  profile: async(req, res, next) => {
    try {
      const user = req.session.user
      res.json({
        ...req.query,
        changePassword: req.urlTo('change-password'),
        user,
        nav: {
          users: req.urlTo('users'),
          profile: req.urlTo('profile'),
          logout: req.urlTo('logout'),
        }
      })
    } catch (err) {
      debug(err.message)
      next(err)
    }
  },
  passwordForm: (req, res) => {
    res.view('admin/password', req.query)
  },
  changePassword: async (req, res, next) => {
    try {
      const {old, password, confirm} = req.body
      if (password !== confirm) throw errors(422, 'password !== confirm password')
      if (bcrypt.compareSync(old, req.session.user.password)) {
        await admin.model.update(
          {_id: req.session.user._id},
          {
            $set: {
              password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            }
          }
        )
        return res.redirect('/profile?ok=1')
      }
      throw errors(422, 'old password === false')
    } catch (err) {
      debug(err.message)
      next(err)
    }
  },
  logout: (req, res, next) => {
    next(errors(401))
  }
}

module.exports = auth