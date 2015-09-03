var Joi = require('joi')
var flow = require('../flow')
var shorthand = require('../../utils/shorthand')
var when = shorthand(require('./when'))
var always = shorthand(require('./always'))
var schemas = require('../../schemas')

module.exports = {
    fn: function otherwise(input, ctx, cb) {
        flow.run.fn(input, {
            params: flow.sequence([
                when(always(), ctx.params.task)
            ])
        }, cb)
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            task: schemas.taskdef
        })
    })
}
