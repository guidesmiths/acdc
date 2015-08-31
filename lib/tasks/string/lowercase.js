var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {
    fn: function lowercase(input, ctx, cb) {
        cb(null, input ? input.toLowerCase() : input)
    },
    schema: schemas.context.keys({
        input: Joi.string().allow('').optional()
    })
}
