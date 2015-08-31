var debug = require('debug')('acdc:tasks:selectors:getProperty')
var Joi = require('joi')
var _ = require('lodash')
var schemas = require('../../schemas')

module.exports = {
    fn: function getProperty(ctx, cb) {
        debug('Getting value at %s', ctx.params.path)
        cb(null, _.has(ctx.input, ctx.params.path) ? _.get(ctx.input, ctx.params.path) : undefined)
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()),
        params: Joi.object().keys({
            path: Joi.string()
        })
    })
}
