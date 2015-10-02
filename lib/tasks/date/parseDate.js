var Joi = require('joi')
var schemas = require('../../schemas')
var moment = require('moment')
var format = require('util').format

module.exports = {
    fn: function parseDate(input, ctx, cb) {
        if (input === undefined || input === null) return cb()
        var date = moment(input, ctx.params.format, true)
        if (!date.isValid()) return cb(new Error(format('Error parsing date: %s', input)))
        cb(null, moment(input, ctx.params.format).toDate())
    },
    schema: schemas.context.keys({
        input: Joi.string().optional(),
        params: Joi.object().keys({
            format: Joi.alternatives().try(Joi.string(), Joi.func()).default(function() {
                return moment.ISO_8601
            }, 'ISO_8601').optional()
        }).default()
    }).meta({
        description: 'Parses a string into a date',
        usage: 'parseDate()'
    })
}
