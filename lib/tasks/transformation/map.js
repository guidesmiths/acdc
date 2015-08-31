var async = require('async')
var Joi = require('joi')
var R = require('ramda')
var run = require('../flow/run')
var schemas = require('../../schemas')

module.exports = {
    fn: function map(ctx, cb) {
        var items = R.isArrayLike(ctx.input) ? ctx.input :  R.keys(ctx.input).map(function(key) {
            return { key: key, value: ctx.input[key] }
        })

        async.map(items, function(item, mcb) {
            run.fn({ input: item, params: { task: ctx.params.task } }, mcb)
        }, cb)
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()),
        params: Joi.object().keys({
            task: schemas.task
        })
    })
}
