var debug = require('debug')('acdc:tasks:property:get')
var Joi = require('joi')
var _ = require('lodash')
var schemas = require('../../schemas')
var R = require('ramda')

module.exports = {
    fn: function get(input, ctx, cb) {
        debug('Getting value at %s', ctx.params.path)
        if (ctx.params.path === '') return cb(null, R.clone(input))
        if (!_.has(input, ctx.params.path)) return cb()
        cb(null, R.clone(_.get(input, ctx.params.path)))
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()),
        params: Joi.object().keys({
            path: Joi.string().allow('')
        })
    })
}
