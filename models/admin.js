const monk = require('../db/monk')

const model = monk.get('admin')
model.createIndex({username: 1}, {unique: 1})

module.exports = {
  model,
  updateLogin: async (req, username) => {
    return await model.update(
      {username}, {
        $set: {
          last_login: (new Date).getTime(),
          last_ip: (req.get('x-forwarded-for') || req.ip || 'unknown').replace(/:\d+$/, ''),
          last_user_agent: req.get('user-agent'),
          last_login_info: await req.userInfo
        }
      }
    )
  }
}