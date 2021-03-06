var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var property = require('../../../lib/tasks/property')

describe('Property Copy When', function() {

    it('should require condition param to be a task', function(done) {
        copyWhen(undefined, { condition: {} }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "condition" fails because [child "task" fails because ["task" is required]]]')
            done()
        })
    })

    it('should require a from path', function(done) {
        copyWhen(undefined, { condition: { task: { fn: function() {} } }, from: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "from" fails because ["from" must be a string]]')
            done()
        })
    })

    it('should require a to path to be a string', function(done) {
        copyWhen(undefined, { condition: { task: { fn: function() {} } }, from: 'x', to: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "to" fails because ["to" must be a string]]')
            done()
        })
    })

    it('should copy when the condition is true', function(done) {
        copyWhen({ foo: 'oh yeah!' }, {
            condition: {
                task: {
                    fn: function condition(input, ctx, cb) {
                        cb(null, true)
                    }
                }
            },
            from: 'foo',
            to: 'bar'
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result.bar, 'oh yeah!')
            done()
        })
    })

    it('should not copy when condition is false', function(done) {
        copyWhen({ foo: 'oh no!' }, {
            condition: {
                task: {
                    fn: function condition(input, ctx, cb) {
                        cb(null, false)
                    }
                }
            },
            from: 'foo',
            to: 'bar'
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    it('should default the to path', function(done) {
        copyWhen({ foo: 'oh yeah!' }, {
            condition: {
                task: {
                    fn: function condition(input, ctx, cb) {
                        cb(null, true)
                    }
                }
            },
            from: 'foo'
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result.foo, 'oh yeah!')
            done()
        })
    })

    function copyWhen(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: property.copyWhen,
                params: params
            }
        }, cb)
    }
})