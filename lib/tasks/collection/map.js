var async = require('async')
var Joi = require('joi')
var R = require('ramda')
var run = require('../flow/run')
var schemas = require('../../schemas')

module.exports = {
    fn: function map(input, ctx, cb) {
        if (input === undefined || input === null) return cb(null, [])
        var items = R.isArrayLike(input) ? input :  R.keys(input).map(function(key) {
            return { key: key, value: input[key] }
        })

        async.map(items, function(item, mcb) {
            run.fn(item, { params: ctx.params.task }, mcb)
        }, cb)
    },
    schema: schemas.context.keys({
        input: Joi.alternatives().try(Joi.array(), Joi.object()).optional(),
        params: Joi.object().keys({
            task: schemas.taskdef
        })
    })
}
