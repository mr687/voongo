const mongo = require('../db/mongo')
const {} = require('mongodb')

module.exports = {
  add: async (data) => {
    if (!data) return
    let client = null
    try {
      client = await mongo
      const db = client.db(data.db)
      const res = await db.addUser(...data.user)
      return res
    } catch (err) {
      throw err
    }
  },
  del: async (data) => {
    if (!data) return
    let client = null
    try {
      client = await mongo
      const db = client.db(data.db)
      const res = await db.removeUser(data.user)
      return res
    } catch (err) {
      throw err
    }
  }
}