var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {
    fn: function split(input, ctx, cb) {
        if (input === undefined || input === null) return cb()
        cb(null, input.split(ctx.params.pattern))
    },
    schema: schemas.context.keys({
        input: Joi.string().allow('').optional(),
        params: Joi.object().keys({
            pattern: Joi.alternatives().try(Joi.string(), Joi.object().type(RegExp)).required()
        })
    })
}
