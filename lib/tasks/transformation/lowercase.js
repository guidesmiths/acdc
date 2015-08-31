var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {
    fn: function lowercase(ctx, cb) {
        cb(null, ctx.input ? ctx.input.toLowerCase() : ctx.input)
    },
    schema: schemas.context.keys({
        input: Joi.string().min(0).optional()
    })
}
