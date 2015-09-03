var debug = require('debug')('acdc:tasks:flow:run')
var _ = require('lodash').runInContext().mixin({ 'defaults': require('merge-defaults') })
var stringify = require('json-stringify-safe')
var Joi = require('joi')
var schemas = require('../../schemas')
var R = require('ramda')

module.exports = {
    fn: function run(input, ctx, cb) {
        setImmediate(function() {
            validate(input, 'run', ctx, module.exports.schema, function(err) {
                if (err) return cb(err)

                var taskCtx = getTaskCtx(ctx)

                validate(input, taskCtx.name, taskCtx, ctx.params.task.schema || Joi.any(), function(err) {
                    if (err) return cb(err)
                    runTask(taskCtx)
                })
            })
        })

        function validate(input, name, ctx, schema, cb) {
            debug('Validating %s context', name)
            Joi.validate(R.merge({ input : input}, ctx), schema, { allowUnknown: false, presence: 'required' }, cb)
        }

        function getTaskCtx(ctx) {
            return _.defaults(
                {
                    name: ctx.name,
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
            debug('Running %s with input', taskCtx.name, input)
            try {
                ctx.params.task.fn(input, taskCtx, function(err, result) {
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