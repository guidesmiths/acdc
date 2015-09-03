var Joi = require('joi')
var schemas = require('../../schemas')
var _ = require('lodash').runInContext().mixin({ 'defaults': require('merge-defaults') })

module.exports = {
    fn: function merge(input, ctx, cb) {
        cb(null, _.defaults.apply(_, input.reverse()))
    },
    schema: schemas.context.keys({
        input: Joi.array().items(Joi.object())
    })
}
