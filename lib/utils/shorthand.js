var _ = require('lodash')
var R = require('ramda')
var format = require('util').format

module.exports = function shorthand(task) {
    return _.extend(function() {
        var fields = task.schema ? _.keys(task.schema.describe().children.params.children) : []
        if (arguments.length > fields.length) throw new Error(format('Task %s has %d arguments but only takes %d parameters', task.fn.name, arguments.length, fields.length))

        return {
            task: task,
            params: R.reduce(function(params, argument) {
                return R.merge(params, R.objOf(fields.shift(),  argument))
            }, {}, arguments)
        }
    }, task)
}
