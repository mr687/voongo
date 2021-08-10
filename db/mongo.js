const {MongoClient} = require('mongodb')
const client = new MongoClient(
  `mongodb://${app.env.MONGODB_URI}`,
  {
    useUnifiedTopology: true
  }
)
module.exports = client.connect()