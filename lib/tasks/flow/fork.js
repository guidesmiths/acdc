var debug = require('debug')('acdc:tasks:flow:fork')
var R = require('ramda')
var Joi = require('joi')
var async = require('async')
var run = require('./run')
var schemas = require('../../schemas')
var isArrayLike = require('../../utils/isArrayLike')

module.exports = {
    fn: function fork(input, ctx, cb) {
        var tasks = isArrayLike(ctx.params.tasks) ? ctx.params.tasks : R.values(ctx.params.tasks)
        var results = []

        var q = async.queue(function(task, qcb) {
            run.fn(input, { params: task }, function(err, result) {
                if (err) return cb(err)
                results.push(result)
                qcb()
            })
        }, 1)

        debug('Forking %d tasks', tasks.length)
        q.push(tasks, function(err) {
            if (err) return cb(err)
            debug('%d tasks remaining', q.length())
        })

        q.drain = function() {
            debug('Finished fork')
            cb(null, isArrayLike(ctx.params.tasks) ? results :  R.zipObj(R.keys(ctx.params.tasks), results))
        }
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            tasks: Joi.alternatives().try(Joi.array(), Joi.object())
        })
    }).meta({
        description: 'Forks the input',
        usage: 'fork({ uc: uppercase(), lc: lowercase(), cc: camelcase() })'
    })
}
