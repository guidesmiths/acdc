var Joi = require('joi')
var flow = require('../flow')
var shorthand = require('../../dsl/shorthand')
var get = shorthand(require('./get'))
var set = shorthand(require('./set'))
var schemas = require('../../schemas')

module.exports = {
    fn: function transformProperty(input, ctx, cb) {
        flow.run.fn(input, {
            params: flow.sequence([
                get(ctx.params.from),
                ctx.params.transformer,
                set(ctx.params.to)
            ])
        }, cb)
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()),
        params: Joi.object().keys({
            from: Joi.string(),
            transformer: Joi.any(),
            to: Joi.string()
        })
    })
}