var debug = require('debug')('acdc:tasks:logic:choose')
var Joi = require('joi')
var schemas = require('../../schemas')
var run = require('../flow/run')
var async = require('async')

module.exports = {
    fn: function choose(input, ctx, cb) {

        var q = async.queue(function(option, qcb) {
            run.fn(input, { params: option }, function(err, result) {
                if (err) return done(err)
                if (result.ran) return done(null, result.result)
                qcb()
            })
        }, 1)

        q.push(ctx.params.options)

        q.drain = function() {
            debug('All options exhausted')
            done()
        }

        function done(err, result) {
            q.kill()
            cb(err, result)
        }
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            options: Joi.array()
        })
    })
}
