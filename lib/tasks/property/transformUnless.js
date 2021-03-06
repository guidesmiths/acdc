var debug = require('debug')('acdc:tasks:property:transformUnless')
var Joi = require('joi')
var schemas = require('../../schemas')
var run = require('../flow/run')
var shorthand = require('../../utils/shorthand')
var transformWhen = shorthand(require('./transformWhen'))
var not = shorthand(require('../logic/not'))

module.exports = {
    fn: function transformUnless(input, ctx, cb) {
        run.fn(input, { params: transformWhen(not(ctx.params.condition), ctx.params.from, ctx.params.transformer, ctx.params.to) }, cb)
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
