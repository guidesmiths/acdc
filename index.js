var R = require('ramda')
var flow = require('./lib/tasks/flow')

module.exports = function acdc(input, params, cb) {
    if (arguments.length === 2) return acdc(undefined, arguments[0], arguments[1])
    flow.domain.fn({ input: input, params: params }, cb)
}