var debug = require('debug')('acdc:tasks:property:setUnless')
var Joi = require('joi')
var _ = require('lodash')
var schemas = require('../../schemas')
var run = require('../flow/run')
var shorthand = require('../../utils/shorthand')
var setWhen = shorthand(require('./setWhen'))
var not = shorthand(require('../logic/not'))

module.exports = {
    fn: function setUnless(input, ctx, cb) {
        var args = [not(ctx.params.condition)]
        if (_.has(ctx.params, 'path')) args.push(ctx.params.path)
        if (_.has(ctx.params, 'value')) args.push(ctx.params.value)
        run.fn(input, { params: setWhen.apply(null, args) }, cb)
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            condition: schemas.taskdef,
            path: Joi.string().optional(),
            value: Joi.any().optional()
        })
    }).meta({
        description: 'Sets a property in a new document using a property path unless a condition is met',
        usage: 'setUnless(falsey(), "customer.contact.name")'
    })
}
