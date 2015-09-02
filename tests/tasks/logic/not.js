var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var logic = require('../../../lib/tasks/logic')

describe('not', function() {

    it('should require task param to be a task', function(done) {
        not(undefined, { task: {} }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "task" fails because [child "task" fails because ["task" is required]]]')
            done()
        })
    })

    it('should invert truthy yielding tasks to false', function(done) {
        not(undefined, {
            task: {
                task: {
                    fn: function task(input, ctx, cb) {
                        cb(null, 'ok')
                    }
                }
            }
        }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, false)
            done()
        })
    })

    it('should invert falsey yielding tasks to true', function(done) {
        not(undefined, {
            task: {
                task: {
                    fn: function task(input, ctx, cb) {
                        cb(null, undefined)
                    }
                }
            }
        }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, true)
            done()
        })
    })

    function not(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: logic.not,
                params: params
            }
        }, cb)
    }
})