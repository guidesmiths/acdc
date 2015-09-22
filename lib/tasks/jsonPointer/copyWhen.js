var debug = require('debug')('acdc:tasks:logic:copyWhen')
var Joi = require('joi')
var schemas = require('../../schemas')
var run = require('../flow/run')
var shorthand = require('../../utils/shorthand')
var copy = shorthand(require('./copy'))

module.exports = {
    fn: function copyWhen(input, ctx, cb) {
        run.fn(input, { params: ctx.params.condition }, function(err, passed) {
            if (err) return cb(err)
            if (!passed) return cb()
            run.fn(input, { params: copy(ctx.params.from, ctx.params.to) }, cb)
        })
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            condition: schemas.taskdef,
            from: Joi.string().allow(''),
            to: Joi.string()
        })
    })
}
