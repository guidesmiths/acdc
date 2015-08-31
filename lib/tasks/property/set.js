var debug = require('debug')('acdc:tasks:property:set')
var Joi = require('joi')
var _ = require('lodash')
var schemas = require('../../schemas')

module.exports = {
    fn: function setProperty(input, ctx, cb) {
        debug('Setting %s to %s', ctx.params.path, input)
        cb(null, _.set({}, ctx.params.path, input))
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            path: Joi.string()
        })
    })
}
