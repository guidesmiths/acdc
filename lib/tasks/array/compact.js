var Joi = require('joi')
var schemas = require('../../schemas')
var _ = require('lodash')

module.exports = {
    fn: function merge(input, ctx, cb) {
        cb(null, _.without(input, null, undefined))
    },
    schema: schemas.context.keys({
        input: Joi.array().sparse()
    }).meta({
        description: 'Compacts arrays of objects',
        usage: 'compact([{ name: "fred" }, { age: 41 }, { gender: "Male" }])'
    })
}
