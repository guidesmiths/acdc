var debug = require('debug')('acdc:tasks:property:transformWhen')
var Joi = require('joi')
var schemas = require('../../schemas')
var run = require('../flow/run')
var shorthand = require('../../utils/shorthand')
var transform = shorthand(require('./transform'))

module.exports = {
    fn: function transformWhen(input, ctx, cb) {
        run.fn(input, { params: ctx.params.condition }, function(err, passed) {
            if (err) return cb(err)
            if (!passed) return cb()
            run.fn(input, { params: transform(ctx.params.from, ctx.params.transformer, ctx.params.to) }, cb)
        })
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            condition: schemas.taskdef,
            from: Joi.string().allow(''),
            transformer: schemas.taskdef,
            to: Joi.string().optional()
        })
    })
}
