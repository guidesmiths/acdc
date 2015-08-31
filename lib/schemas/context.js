var Joi = require('joi')
var taskSchema = require('./task')

module.exports = Joi.object().keys({
    name: Joi.string().optional(),
    input: Joi.any().optional(),
    params: Joi.object().optional()
})