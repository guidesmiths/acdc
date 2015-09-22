var Joi = require('joi')
var schemas = require('../../schemas')
var hogan = require('hogan')

module.exports = {
    fn: function render(input, ctx, cb) {
        if (input === undefined || input === null) return cb()
        cb(null, hogan.compile(ctx.params.template).render(input))
    },
    schema: schemas.context.keys({
        input: Joi.object().optional(),
        params: Joi.object().keys({
            template: Joi.string()
        })
    })
}
