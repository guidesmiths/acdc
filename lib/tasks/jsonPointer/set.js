var debug = require('debug')('acdc:tasks:jsonPointer:set')
var Joi = require('joi')
var pointer = require('json-pointer')
var schemas = require('../../schemas')

module.exports = {
    fn: function set(input, ctx, cb) {
        debug('Setting %s to %s', ctx.params.path, input)
        var output = {}
        pointer.set(output, ctx.params.path, input)
        cb(null, output)
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            path: Joi.string()
        })
    })
}