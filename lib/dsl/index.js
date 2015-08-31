var R = require('ramda')

module.exports = R.merge(
    require('require-all')(__dirname),
    { alias: function(name, fn) {
        this[name] = fn
    }}
)