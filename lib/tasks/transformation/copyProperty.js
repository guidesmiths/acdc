var async = require('async')
var Joi = require('joi')
var R = require('ramda')
var flow = require('../flow')
var selectors = require('../selectors')
var mutators = require('../mutators')
var schemas = require('../../schemas')

module.exports = {
    fn: function copyProperty(ctx, cb) {
        flow.run.fn({
            input: ctx.input,
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
