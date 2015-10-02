var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {
    fn: function parseInteger(input, ctx, cb) {
        if (input === undefined || input === null) return cb()
        cb(null, parseInt(input, ctx.params.radix))
    },
    schema: schemas.context.keys({
        input: Joi.number().integer().optional(),
        params: Joi.object().keys({
            radix: Joi.number().integer().default(10).optional()
        })
    })
}

