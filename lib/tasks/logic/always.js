var debug = require('debug')('acdc:tasks:logic:always')
var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {

    fn: function always(___, ctx, cb) {
        cb(null, true)
    }
}
