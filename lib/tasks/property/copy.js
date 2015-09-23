var Joi = require('joi')
var flow = require('../flow')
var shorthand = require('../../utils/shorthand')
var get = shorthand(require('./get'))
var set = shorthand(require('./set'))
var schemas = require('../../schemas')

module.exports = {
    fn: function copy(input, ctx, cb) {
        flow.run.fn(input, {
            params: flow.sequence([
                get(ctx.params.from),
                set(ctx.params.to || ctx.params.from)
            ])
        }, cb)
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()),
        params: Joi.object().keys({
            from: Joi.string().allow(''),
            to: Joi.string().optional()
        })
    })
}
