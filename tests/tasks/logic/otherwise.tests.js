var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var logic = require('../../../lib/tasks/logic')

describe('Otherwise', function() {

    it('should require task param to be a task', function(done) {
        otherwise(undefined, { condition: { task: { fn: function() {} } }, task: {} }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "task" fails because [child "task" fails because ["task" is required]]]')
            done()
        })
    })

    it('should run the task', function(done) {
        otherwise(undefined, {
            task: {
                task: {
                    fn: function task(input, ctx, cb) {
                        cb(null, 'oh yeah!')
                    }
                }
            }
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result.ran, true)
            assert.equal(result.result, 'oh yeah!')
            done()
        })
    })

    function otherwise(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: logic.otherwise,
                params: params
            }
        }, cb)
    }
})