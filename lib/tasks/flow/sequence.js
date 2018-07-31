var debug = require('debug')('acdc:tasks:flow:sequence')
var R = require('ramda')
var Joi = require('joi')
var async = require('async')
var run = require('./run')
var schemas = require('../../schemas')
var isArrayLike = require('../../utils/isArrayLike')

module.exports = {
    fn: function sequence(input, ctx, cb) {
        var tasks = isArrayLike(ctx.params.tasks) ? ctx.params.tasks :  R.values(ctx.params.tasks)
        var results = []
        var q = async.queue(function(task, qcb) {
            run.fn(input, { params: task }, function(err, result) {
                if (err) return cb(err)
                results.push(result)
                input = result
                qcb()
            })
        }, 1)

        debug('Sequencing %d tasks', tasks.length)
        q.push(tasks, function(err) {
            if (err) return cb(err)
            debug('%d tasks remaining', q.length())
        })

        q.drain = function() {
            debug('Finished sequence')
            cb(null, results.pop())
        }
    },
    schema: schemas.context.keys({
        params: Joi.object().keys({
            tasks: Joi.alternatives().try(Joi.array(), Joi.object())
        })
    }).meta({
        description: 'Composes a sequence of tasks',
        usage: 'sequence([task1(), task2(), task3()])'
    })
}
