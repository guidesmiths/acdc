var debug = require('debug')('acdc:tasks:property:setValue')
var flow = require('../flow')
var shorthand = require('../../utils/shorthand')
var set = shorthand(require('./set'))
var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {
    fn: function setValue(___, ctx, cb) {
        flow.run.fn(undefined, {
            params: flow.sequence([
                flow.output(ctx.params.value),
                set(ctx.params.to)
            ])
        }, cb)
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            value: Joi.any(),
            to: Joi.string()
        })
    })
}
