var debug = require('debug')('acdc:tasks:property:get')
var Joi = require('joi')
var _ = require('lodash')
var schemas = require('../../schemas')
var format = require('util').format

module.exports = {
    fn: function get(input, ctx, cb) {
        var value = ctx.params.path === '' ? input : _.get(input, ctx.params.path)
        var message = format(ctx.params.template, value)
        console.log(message)
        cb(null, input)
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            path: Joi.string().allow('').optional(),
            template: Joi.string().optional()
        })
    }),
    defaults: {
        path: '',
        template: '%s'
    }
}
