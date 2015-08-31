var debug = require('debug')('acdc:tasks:selectors:setJsonPointer')
var Joi = require('joi')
var pointer = require('json-pointer')
var schemas = require('../../schemas')

module.exports = {
    fn: function setJsonPointer(ctx, cb) {
        debug('Setting %s to %s', ctx.params.path, ctx.input)
        var output = {}
        pointer.set(output, ctx.params.path, ctx.input)
        cb(null, output)
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            path: Joi.string()
        })
    })
}
