var debug = require('debug')('acdc:tasks:logic:copyUnless')
var Joi = require('joi')
var schemas = require('../../schemas')
var run = require('../flow/run')
var shorthand = require('../../utils/shorthand')
var copyWhen = shorthand(require('../property/copyWhen'))
var not = shorthand(require('../logic/not'))

module.exports = {
    fn: function copyUnless(input, ctx, cb) {
        run.fn(input, { params: copyWhen(not(ctx.params.condition), ctx.params.from, ctx.params.to) }, cb)
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            condition: schemas.taskdef,
            from: Joi.string().allow(''),
            to: Joi.string()
        })
    })
}
