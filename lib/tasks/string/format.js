var Joi = require('joi')
var schemas = require('../../schemas')
var util = require('util')

module.exports = {
    fn: function format(input, ctx, cb) {
        if (input === undefined || input === null) return cb()
        cb(null, util.format.apply(null, [ctx.params.pattern].concat(input)))
    },
    schema: schemas.context.keys({
        input: Joi.array().optional(),
        params: Joi.object().keys({
            pattern: Joi.string()
        })
    })
}
