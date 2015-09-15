var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {
    fn: function str(input, ctx, cb) {
        if (input === undefined || input === null) return cb()
        cb(null, '' + input)
    },
    schema: schemas.context.keys({
        input: Joi.any().optional()
    })
}
