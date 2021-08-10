const handlebars = require('handlebars')
const handlebarsLayout = require('handlebars-layouts')
const fs = require('fs')

const loadHtml = (filename) => {
  const path = `${basedir}/views/${filename}.html`
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf-8')
  }
  return false
}
handlebars.registerHelper(handlebarsLayout(handlebars))

handlebars.registerPartial('layout', loadHtml('template/layout'))
handlebars.registerPartial('error', loadHtml('partials/error'))

module.exports = handlebars