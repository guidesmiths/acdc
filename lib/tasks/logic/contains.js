var debug = require('debug')('acdc:tasks:logic:contains')
var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {

    fn: function contains(input, ctx, cb) {
        cb(null, input.indexOf(ctx.params.value) >= 0)
    },
    schema: schemas.context.keys({
        input: Joi.array(),
        params: Joi.object().keys({
            value: Joi.any()
        })
    })
}
