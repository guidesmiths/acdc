var debug = require('debug')('acdc:tasks:logic:when')
var Joi = require('joi')
var schemas = require('../../schemas')
var run = require('../flow/run')

module.exports = {
    fn: function when(input, ctx, cb) {
        run.fn(input, { params: ctx.params.condition }, function(err, passed) {
            if (err) return cb(err)
            if (!passed) return cb(null, { ran: false })
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
