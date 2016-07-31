var Joi = require('joi')
var schemas = require('../../schemas')
var _ = require('lodash').runInContext().mixin({ 'defaults': require('merge-defaults') })

module.exports = {
    fn: function merge(input, ctx, cb) {
        cb(null, _.defaults.apply(_, _.compact(input.reverse())))
    },
    schema: schemas.context.keys({
        input: Joi.array().items(
            Joi.alternatives().try(
                Joi.object().allow(null)
            )).sparse()
    }).meta({
        description: 'Merges arrays of objects. Compacts null values.',
        usage: 'merge([{ name: "fred" }, { age: 41 }, { gender: "Male" }])'
    })
}
