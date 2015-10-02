var async = require('async')
var Joi = require('joi')
var R = require('ramda')
var run = require('../flow/run')
var schemas = require('../../schemas')

module.exports = {
    fn: function map(input, ctx, cb) {
        if (input === undefined || input === null) return cb(null, [])
        var items = R.isArrayLike(input) ? input :  R.keys(input).map(function(key) {
            return R.merge(R.createMapEntry(ctx.params.key, key), R.createMapEntry(ctx.params.value, input[key]))
        })

        async.map(items, function(item, mcb) {
            run.fn(item, { params: ctx.params.task }, mcb)
        }, cb)
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()).optional(),
        params: Joi.object().keys({
            task: schemas.taskdef,
            key: Joi.string().default('key').optional(),
            value: Joi.string().default('value').optional()
        })
    }).meta({
        description: 'Iterates over the input, mapping each item to the supplied task.',
        usage: 'map([1, 2, 3], double())'
    })
}
