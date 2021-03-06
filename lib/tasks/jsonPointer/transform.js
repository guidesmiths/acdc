var Joi = require('joi')
var flow = require('../flow')
var shorthand = require('../../utils/shorthand')
var get = shorthand(require('./get'))
var set = shorthand(require('./set'))
var schemas = require('../../schemas')

module.exports = {
    fn: function transform(input, ctx, cb) {
        flow.run.fn(input, {
            params: flow.sequence([
                get(ctx.params.from),
                ctx.params.transformer,
                set(ctx.params.to || ctx.params.from)
            ])
        }, cb)
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()),
        params: Joi.object().keys({
            from: Joi.string().allow(''),
            transformer: schemas.taskdef,
            to: Joi.string().optional()
        })
    }).meta({
        description: 'Passes the input document through an asynchronous transformation',
        usage: 'transform("/customer/contact/email", lookup(), "/customer/username")'
    })
}
