var debug = require('debug')('acdc:tasks:property:set')
var Joi = require('joi')
var _ = require('lodash')
var schemas = require('../../schemas')

module.exports = {
    fn: function set(input, ctx, cb) {
        debug('Setting %s to %s', ctx.params.path, input)
        var value = ctx.params.hasOwnProperty('value') ? ctx.params.value : input
        cb(null, _.set({}, ctx.params.path, value))
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            path: Joi.string(),
            value: Joi.any().optional()
        })
    }).meta({
        description: 'Sets a property in a new document using a property path',
        usage: 'set(truthy(), "customer.contact.name")'
    })
}
