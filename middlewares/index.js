const fs = require('fs')

const path = __dirname

const toBeLoad = (filename) => {
  return !filename.endsWith('index.js')
}

const middlewares = {}
const load = (path) => {
  fs.readdirSync(path).forEach(f => {
    if (toBeLoad(f)) {
      middlewares[f.replace('.js','')] = require(`${path}/${f}`)
    }
  })
}

load(path)

module.exports = middlewares