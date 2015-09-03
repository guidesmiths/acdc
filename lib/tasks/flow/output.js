var debug = require('debug')('acdc:tasks:flow:output')
var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {

    fn: function output(___, ctx, cb) {
        cb(null, ctx.params.value)
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            value: Joi.any().optional()
        })
    })
}
