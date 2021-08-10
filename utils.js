const fs = require('fs')
const handlebars = require('./lib/handlebars')

const loadHtml = (filename) => {
  const path = `${basedir}/views/${filename}.html`
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf-8')
  }
  return false
}
module.exports.loadHtml = loadHtml
module.exports.view = (filename, data = {}, next) => {
  try {
    const file = loadHtml(filename)
    if (!file) return '{ no-view }'
    const template = handlebars.compile(file)
    return template(data)
  } catch (err) {
    throw err
  }
}