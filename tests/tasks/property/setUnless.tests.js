var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var property = require('../../../lib/tasks/property')

describe('Property Set Unless', function() {

    it('should require condition param to be a task', function(done) {
        setUnless(undefined, { condition: {} }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "condition" fails because [child "task" fails because ["task" is required]]]')
            done()
        })
    })

    it('should require path to be a string', function(done) {
        setUnless(undefined, { condition: { task: { fn: function() {} } }, path: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "path" fails because ["path" must be a string]]')
            done()
        })
    })

    it('should set when the condition is false', function(done) {
        setUnless('oh yeah!', {
            condition: {
                task: {
                    fn: function condition(input, ctx, cb) {
                        cb(null, false)
                    }
                }
            },
            path: 'bar'
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result.bar, 'oh yeah!')
            done()
        })
    })

    it('should not set when condition is true', function(done) {
        setUnless('oh no!', {
            condition: {
                task: {
                    fn: function condition(input, ctx, cb) {
                        cb(null, true)
                    }
                }
            },
            path: 'bar'
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function setUnless(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: property.setUnless,
                params: params
            }
        }, cb)
    }
})