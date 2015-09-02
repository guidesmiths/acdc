var Joi = require('joi')
var task = require('./task')

module.exports = Joi.object().keys({
    task: task,
    params: Joi.object().optional()
})