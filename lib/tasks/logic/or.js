var debug = require('debug')('acdc:tasks:logic:or')
var Joi = require('joi')
var schemas = require('../../schemas')
var run = require('../flow/run')
var async = require('async')

module.exports = {

    fn: function or(input, ctx, cb) {
        async.any(ctx.params.tasks, function(task, cb) {
            run.fn(input, { params: task }, function(err, result) {
                if (err) return cb(err)
                cb(null, !!result)
            })
        }, cb)
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            tasks: Joi.array()
        })
    })
}
