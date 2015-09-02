var debug = require('debug')('acdc:tasks:logic:falsey')
var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {

    fn: function falsey(input, ctx, cb) {
        cb(null, !input)
    },
}
