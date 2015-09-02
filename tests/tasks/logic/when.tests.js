var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var logic = require('../../../lib/tasks/logic')

describe('When', function() {

    it('should require condition param to be a task', function(done) {
        when(undefined, { condition: {} }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "condition" fails because [child "task" fails because ["task" is required]]]')
            done()
        })
    })

    it('should require task param to be a task', function(done) {
        when(undefined, { condition: { task: { fn: function() {} } }, task: {} }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "task" fails because [child "task" fails because ["task" is required]]]')
            done()
        })
    })

    it('should run the task when the condition is true', function(done) {
        when(undefined, {
            condition: {
                task: {
                    fn: function condition(input, ctx, cb) {
                        cb(null, true)
                    }
                }
            },
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

    it('should not run the task when condition is false', function(done) {
        when(undefined, {
            condition: {
                task: {
                    fn: function condition(input, ctx, cb) {
                        cb(null, false)
                    }
                }
            },
            task: {
                task: {
                    fn: function task(input, ctx, cb) {
                        cb(null, 'oh no!')
                    }
                }
            }
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result.ran, false)
            assert.equal(result.result, undefined)
            done()
        })
    })

    function when(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: logic.when,
                params: params
            }
        }, cb)
    }
})