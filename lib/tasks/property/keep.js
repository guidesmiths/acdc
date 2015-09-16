var Joi = require('joi')
var flow = require('../flow')
var shorthand = require('../../utils/shorthand')
var get = shorthand(require('./get'))
var set = shorthand(require('./set'))
var schemas = require('../../schemas')

module.exports = {
    fn: function keep(input, ctx, cb) {

        flow.run.fn(input, {
            params: ctx.params.path ?
                flow.sequence([
                    get(ctx.params.path),
                    set(ctx.params.path)
                ]) : get(ctx.params.path)
        }, cb)
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()),
        params: Joi.object().keys({
            path: Joi.string().allow('').optional()
        })
    })
}
