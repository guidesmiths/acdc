var debug = require('debug')('acdc:tasks:selectors:setProperty')
var Joi = require('joi')
var _ = require('lodash')
var schemas = require('../../schemas')

module.exports = {
    fn: function getProperty(ctx, cb) {
        debug('Setting %s to %s', ctx.params.path, ctx.input)
        cb(null, _.set({}, ctx.params.path, ctx.input))
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            path: Joi.string()
        })
    })
}
