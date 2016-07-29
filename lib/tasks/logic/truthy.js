var debug = require('debug')('acdc:tasks:logic:truthy')

module.exports = {

    fn: function truthy(input, ctx, cb) {
        cb(null, !!input)
    }
}
