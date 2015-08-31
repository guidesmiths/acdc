var Joi = require('joi')
var flow = require('../flow')
var selectors = require('../selectors')
var mutators = require('../mutators')
var schemas = require('../../schemas')

module.exports = {
    fn: function transformProperty(ctx, cb) {
        flow.run.fn({
            input: ctx.input,
            params: flow.sequence([
                selectors.getProperty(ctx.params.from),
                ctx.params.transformer,
                mutators.setProperty(ctx.params.to)
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
