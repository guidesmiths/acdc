var Joi = require('joi')

module.exports = Joi.alternatives().try(
    Joi.object().keys({
        fn: Joi.func(),
        schema: Joi.object().optional(),
        defaults: Joi.object().optional()
    }),
    Joi.func()
)
