var Joi = require('joi')
var schemas = require('../../schemas')
var moment = require('moment')

module.exports = {
    fn: function format(input, ctx, cb) {
        if (input === undefined || input === null) return cb()
        var result = ctx.params.format ? moment(input).format(ctx.params.format) : moment(input).toISOString()
        cb(null, result)
    },
    schema: schemas.context.keys({
        input: Joi.date().optional(),
        params: Joi.object().keys({
            format: Joi.string().optional()
        })
    })
}
