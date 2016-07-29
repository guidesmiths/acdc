var debug = require('debug')('acdc:tasks:logic:falsey')

module.exports = {

    fn: function falsey(input, ctx, cb) {
        cb(null, !input)
    }
}
