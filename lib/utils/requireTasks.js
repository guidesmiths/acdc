var _ = require('lodash')
var shorthand = require('../dsl/shorthand')

module.exports = function(path) {
    return require('require-all')({
        dirname: path,
        filter: /^(?!index\.js$)(.+)\.js$/,
        resolve: shorthand
    })
}