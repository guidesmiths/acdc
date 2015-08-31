var debug = require('debug')('acdc:tasks:flow:run')
var _ = require('lodash').runInContext().mixin({ 'defaults': require('merge-defaults') })
var stringify = require('json-stringify-safe')
var Joi = require('joi')
var schemas = require('../../schemas')

module.exports = {
    fn: function run(ctx, cb) {
        setImmediate(function() {
            validate(ctx, module.exports.schema, function(err) {
                if (err) return cb(err)

                var taskCtx = getTaskCtx(ctx)

                validate(taskCtx, ctx.params.task.schema || Joi.any(), function(err) {
                    if (err) return cb(err)
                    runTask(taskCtx)
                })
            })
        })

        function validate(value, schema, cb) {
            debug('Validating %s context', value.name || 'run')
            Joi.validate(value, schema, { allowUnknown: false, presence: 'required' }, cb)
        }

        function getTaskCtx(ctx) {
            return _.defaults(
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
        }

        function runTask(taskCtx) {
            debug('Running %s', taskCtx.name)
            try {
                ctx.params.task.fn(taskCtx, function(err, result) {
                    err ? error(taskCtx.name, err) : ok(taskCtx.name, result)
                })
            } catch (err) {
                process.emit('error', err, taskCtx.name)
            }
        }

        function error(name, err) {
            debug('Error running %s: %s', name, err.message)
            cb(err)
        }

        function ok(name, result) {
            debug('Successfully ran %s. Yielding: %s', name, stringify(result, null, 2))
            cb(null, result)
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