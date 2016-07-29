var Joi = require('joi')
var schemas = require('../../schemas')
var moment = require('moment-timezone')
var format = require('util').format

module.exports = {
    fn: function parseDate(input, ctx, cb) {
        if (input === undefined || input === null) return cb()
        if (!moment(input, ctx.params.format, true).isValid()) return cb(new Error(format('Error parsing date: %s', input)))
        var m = ctx.params.timezone ? moment.tz(input, ctx.params.format, ctx.params.timezone)
                                    : moment(input, ctx.params.format)
        cb(null, m.toDate())
    },
    schema: schemas.context.keys({
        input: Joi.string().optional(),
        params: Joi.object().keys({
            format: Joi.alternatives().try(Joi.string(), Joi.func()).default(function() {
                return moment.ISO_8601
            }, 'ISO_8601').optional(),
            timezone: Joi.string().optional()
        }).default()
    }).meta({
        description: 'Parses a string into a date',
        usage: 'parseDate()'
    })
}
