var Joi = require('joi')
var schemas = require('../../schemas')
var R = require('ramda')

module.exports = {
    fn: function merge(input, ctx, cb) {
        cb(null, R.mergeAll(input))
    },
    schema: schemas.context.keys({
        input: Joi.array().items(Joi.object())
    })
}
