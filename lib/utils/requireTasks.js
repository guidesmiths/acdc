var _ = require('lodash')
var shorthand = require('./shorthand')

module.exports = function(path) {
    return require('require-all')({
        dirname: path,
        filter: /^(?!index\.js$)(.+)\.js$/,
        resolve: shorthand
    })
}