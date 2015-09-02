var debug = require('debug')('acdc:tasks:logic:not')
var Joi = require('joi')
var schemas = require('../../schemas')
var run = require('../flow/run')

module.exports = {

    fn: function not(input, ctx, cb) {
        run.fn(input, { params: ctx.params.task }, function(err, result) {
            if (err) return cb(err)
            cb(null, !result)
        })
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            task: schemas.taskdef
        })
    })
}
