const fs = require('fs')

const path = __dirname

const toBeLoad = (filename) => {
  return !filename.endsWith('index.js')
}

const models = {}
const loadModels = (path) => {
  fs.readdirSync(path).forEach(f => {
    if (toBeLoad(f)) {
      models[f.replace('.js','')] = require(`${path}/${f}`)
    }
  })
}

loadModels(path)

module.exports = models