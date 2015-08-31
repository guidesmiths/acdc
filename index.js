var R = require('ramda')
var flow = require('./lib/tasks/flow')

module.exports = function acdc(input, task, cb) {
    if (arguments.length === 2) return acdc(undefined, arguments[0], arguments[1])
    flow.domain.fn(input, { params: task }, cb)
}