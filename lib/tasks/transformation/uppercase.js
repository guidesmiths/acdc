var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {
    fn: function uppercase(ctx, cb) {
        cb(null, ctx.input ? ctx.input.toUpperCase() : ctx.input)
    },
    schema: schemas.context.keys({
        input: Joi.string().min(0).optional()
    })
}
