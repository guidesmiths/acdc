var debug = require('debug')('acdc:tasks:jsonPointer:get')
var Joi = require('joi')
var pointer = require('json-pointer')
var schemas = require('../../schemas')
var R = require('ramda')

module.exports = {
    fn: function get(input, ctx, cb) {
        debug('Getting value at %s', ctx.params.path)
        cb(null, pointer.has(input, ctx.params.path) ? R.clone(pointer.get(input, ctx.params.path)) : undefined)
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()),
        params: Joi.object().keys({
            path: Joi.string().allow('')
        })
    }).meta({
        description: 'Gets a property from a document using a json pointer',
        usage: 'get("/customer/contact/name")'
    })
}
