var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {
    fn: function uppercase(input, ctx, cb) {
        cb(null, input ? input.toUpperCase() : input)
    },
    schema: schemas.context.keys({
        input: Joi.string().allow('').optional()
    })
}
