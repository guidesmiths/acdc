var debug = require('debug')('acdc:tasks:logic:unless')
var Joi = require('joi')
var schemas = require('../../schemas')
var run = require('../flow/run')

module.exports = {
    fn: function unless(input, ctx, cb) {
        run.fn(input, { params: ctx.params.condition }, function(err, truthy) {
            if (err) return cb(err)
            if (truthy) return cb(null, { ran: false })
            run.fn(input, { params: ctx.params.task }, function(err, result) {
                cb(err, { ran: true, result: result })
            })
        })
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            condition: schemas.taskdef,
            task: schemas.taskdef
        })
    })
}
