var _ = require('lodash')
var format = require('util').format

module.exports = function shorthand(task) {
    return _.extend(function() {
        var params = {}
        var fields = task.schema ? _.keys(task.schema.describe().children.params.children) : []
        if (arguments.length > fields.length) throw new Error(format('Task %s has %d arguments but only takes %d parameters', task.fn.name, arguments.length, fields.length))
        for (var i = 0; i < arguments.length; i++) {
            var key = fields[i]
            var value = arguments[i]
            params[fields[i]] = value
        }
        return {
            task: task,
            params: params
        }
    }, task)
}