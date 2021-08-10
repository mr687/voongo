const fs = require('fs')

const path = __dirname

const toBeLoad = (filename) => {
  return !filename.endsWith('index.js')
}

const controllers = {}
const loadControllers = (path) => {
  fs.readdirSync(path).forEach(f => {
    if (toBeLoad(f)) {
      controllers[f.replace('.js','')] = require(`${path}/${f}`)
    }
  })
}

loadControllers(path)

module.exports = controllers