var Joi = require('joi')
var flow = require('../flow')
var selectors = require('../selectors')
var mutators = require('../mutators')
var schemas = require('../../schemas')

module.exports = {
    fn: function copyProperty(input, ctx, cb) {
        flow.run.fn(input, {
            params: flow.sequence([
                selectors.getProperty(ctx.params.from),
                mutators.setProperty(ctx.params.to)
            ])
        }, cb)
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()),
        params: Joi.object().keys({
            from: Joi.string(),
            to: Joi.string()
        })
    })
}
