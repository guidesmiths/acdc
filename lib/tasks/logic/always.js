var debug = require('debug')('acdc:tasks:logic:always')

module.exports = {

    fn: function always(___, ctx, cb) {
        cb(null, true)
    }
}
