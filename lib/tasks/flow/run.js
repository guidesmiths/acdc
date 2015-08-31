var debug = require('debug')('acdc:tasks:flow:run')
var _ = require('lodash').runInContext().mixin({ 'defaults': require('merge-defaults') })
var stringify = require('json-stringify-safe')
var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {
    fn: function run(ctx, cb) {

        setImmediate(function() {

            debug('Validating run context')

            validate(ctx, module.exports.schema, function(err) {

                if (err) return cb(err)

                var taskCtx = _.defaults(
                    {
                        name: ctx.name,
                        input: ctx.input,
                        params: ctx.params.params
                    },
                    {
                        name: ctx.params.task.fn.name,
                        params: ctx.params.task.defaults
                    },
                    {
                        name: 'anonymous',
                        params: {}
                    }
                )

                debug('Validating %s context', taskCtx.name)

                validate(taskCtx, ctx.params.task.schema || Joi.any(), function(err) {

                    if (err) return cb(err)

                    debug('Running %s', taskCtx.name)

                    try {
                        ctx.params.task.fn(taskCtx, function(err, result) {
                            err ? error(err) : ok(result)
                        })
                    } catch (err) {
                        process.emit('error', err, taskCtx.name)
                    }
                })

                function error(err) {
                    debug('Error running %s: %s', taskCtx.name, err.message)
                    cb(err)
                }

                function ok(result) {
                    debug('Successfully ran %s. Yielding: %s', taskCtx.name, stringify(result, null, 2))
                    cb(null, result)
                }
            })
        })

        function validate(value, schema, cb) {
            Joi.validate(value, schema, { allowUnknown: false, presence: 'required' }, cb)
        }
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            name: Joi.string().optional(),
            task: schemas.task,
            params: Joi.object().optional()
        })
    })
}