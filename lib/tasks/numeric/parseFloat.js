var Joi = require('joi')
var schemas = require('../../schemas')
var _parseFloat = parseFloat

module.exports = {
    fn: function parseFloat(input, ctx, cb) {
        if (input === undefined || input === null) return cb()
        cb(null, _parseFloat(input))
    },
    schema: schemas.context.keys({
        input: Joi.number().optional()
    })
}

