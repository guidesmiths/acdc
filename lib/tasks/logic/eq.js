var debug = require('debug')('acdc:tasks:logic:eq')
var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {

    fn: function input(input, ctx, cb) {
        cb(null, input === ctx.params.value)
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            value: Joi.any().optional()
        })
    })
}
