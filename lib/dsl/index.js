var debug = require('debug')('acdc:dsl:task')
var R = require('ramda')

module.exports = R.merge(
    require('require-all')(__dirname),
    { alias: function(name, fn) {
        debug('Aliasing', name)
        this[name] = fn
    }}
)