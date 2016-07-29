var debug = require('debug')('acdc:tasks:property:setWhen')
var Joi = require('joi')
var schemas = require('../../schemas')
var run = require('../flow/run')
var shorthand = require('../../utils/shorthand')
var set = shorthand(require('./set'))
var _ = require('lodash')

module.exports = {
    fn: function setWhen(input, ctx, cb) {
        run.fn(input, { params: ctx.params.condition }, function(err, passed) {
            if (err) return cb(err)
            if (!passed) return cb()
            var args = []
            if (_.has(ctx.params, 'path')) args.push(ctx.params.path)
            if (_.has(ctx.params, 'value')) args.push(ctx.params.value)
            run.fn(input, { params: set.apply(null, args) }, cb)
        })
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            condition: schemas.taskdef,
            path: Joi.string().optional(),
            value: Joi.any().optional()
        })
    }).meta({
        description: 'Sets a property in a new document using a property path when a condition is met',
        usage: 'setWhen(truthy(), "customer.contact.name")'
    })
}
