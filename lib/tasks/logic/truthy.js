var debug = require('debug')('acdc:tasks:logic:truthy')
var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {

    fn: function input(input, ctx, cb) {
        cb(null, !!input)
    },
}
