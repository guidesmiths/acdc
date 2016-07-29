var debug = require('debug')('acdc:tasks:string:isEmpty')
var Joi = require('joi')
var schemas = require('../../schemas')
var R = require('ramda')

module.exports = {

    fn: function empty(input, ctx, cb) {
        cb(null, R.isEmpty(input))
    },
    schema: schemas.context.keys({
        input: Joi.string().allow('').optional()
    })
}
