var debug = require('debug')('acdc:tasks:selectors:setJsonPointer')
var Joi = require('joi')
var pointer = require('json-pointer')
var schemas = require('../../schemas')

module.exports = {
    fn: function getJsonPointer(ctx, cb) {
        debug('Getting value at %s', ctx.params.path)
        cb(null, pointer.has(ctx.input, ctx.params.path) ? pointer.get(ctx.input, ctx.params.path) : undefined)
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()),
        params: Joi.object().keys({
            path: Joi.string()
        })
    })
}
