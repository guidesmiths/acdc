var debug = require('debug')('acdc:dsl:task')
var R = require('ramda')

module.exports = require('require-all')({
    dirname: __dirname,
    filter: /^(?!index\.js$)(.+)\.js$/
})