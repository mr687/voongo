const monk = require('monk')

module.exports = monk(app.env.MONGODB_URI)