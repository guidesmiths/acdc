var debug = require('debug')('acdc:dsl:task')

module.exports = require('require-all')({
    dirname: __dirname,
    filter: /^(?!index\.js$)(.+)\.js$/
})