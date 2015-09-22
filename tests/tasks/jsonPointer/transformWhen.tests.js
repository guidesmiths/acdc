var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var jsonPointer = require('../../../lib/tasks/jsonPointer')

describe('JSON Pointer Transform When', function() {

    it('should require condition param to be a task', function(done) {
        transformWhen(undefined, { condition: {} }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "condition" fails because [child "task" fails because ["task" is required]]]')
            done()
        })
    })

    it('should require a from path', function(done) {
        transformWhen(undefined, { condition: { task: { fn: function() {} } }, from: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "from" fails because ["from" must be a string]]')
            done()
        })
    })

    it('should require transformer param to be a task', function(done) {
        transformWhen(undefined, { condition: { task: { fn: function() {} } }, from: 'x', transformer: {} }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "transformer" fails because [child "task" fails because ["task" is required]]]')
            done()
        })
    })

    it('should require a to path', function(done) {
        transformWhen(undefined, { condition: { task: { fn: function() {} } }, from: 'x', transformer: { task: { fn: function() {} } }, to: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "to" fails because ["to" must be a string]]')
            done()
        })
    })

    it('should copy when the condition is true', function(done) {
        transformWhen({ foo: 'oh yeah!' }, {
            condition: {
                task: {
                    fn: function condition(input, ctx, cb) {
                        cb(null, true)
                    }
                }
            },
            from: '/foo',
            transformer: {
                task: {
                    fn: function(input, ctx, cb) {
                        cb(null, input + '!!')
                    }
                }
            },
            to: '/bar'
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result.bar, 'oh yeah!!!')
            done()
        })
    })

    it('should not copy when condition is false', function(done) {
        transformWhen({ foo: 'oh yeah!' }, {
            condition: {
                task: {
                    fn: function condition(input, ctx, cb) {
                        cb(null, false)
                    }
                }
            },
            from: '/foo',
            transformer: {
                task: {
                    fn: function(input, ctx, cb) {
                        cb(null, input + '!!')
                    }
                }
            },
            to: '/bar'

        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function transformWhen(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: jsonPointer.transformWhen,
                params: params
            }
        }, cb)
    }
})