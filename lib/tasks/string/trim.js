var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {
    fn: function trim(input, ctx, cb) {
        cb(null, input ? input.trim() : input)
    },
    schema: schemas.context.keys({
        input: Joi.string().allow('').optional()
    })
}
