var Joi = require('joi')

module.exports = Joi.object().keys({
    name: Joi.string().optional(),
    input: Joi.any().optional(),
    params: Joi.object().optional()
}).default()