var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var transformation = require('../../../lib/tasks/transformation')

describe('Map', function() {

    it('should require a task parameter', function(done) {
        map(function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "task" fails because ["task" is required]]')
            done()
        })
    })

    it('should require iterable input', function(done) {
        map(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be an array, "input" must be an object]')
            done()
        })
    })

    it('should require task param', function(done) {
        map([], {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "task" fails because ["task" is required]]')
            done()
        })
    })

    it('should map an array', function(done) {
        map(['a', 'b', 'c'], { task: {
                fn: function uppercase(ctx, cb) {
                    cb(null, ctx.input.toUpperCase())
                }
            }
        }, function(err, results) {
            assert.ifError(err)
            assert.equal(results.length, 3)
            assert.equal(results[0], 'A')
            assert.equal(results[1], 'B')
            assert.equal(results[2], 'C')
            done()
        })
    })

    it('should map an object', function(done) {
        map({ a: 'a', b: 'b', c: 'c'}, { task: {
                fn: function uppercase(ctx, cb) {
                    cb(null, ctx.input.value.toUpperCase())
                }
            }
        }, function(err, results) {
            assert.ifError(err)
            assert.equal(results.length, 3)
            assert.equal(results[0], 'A')
            assert.equal(results[1], 'B')
            assert.equal(results[2], 'C')
            done()
        })
    })

    it('should yield mapping errors', function(done) {
        map([1, 2, 3], {
            task: {
                fn: function(ctx, cb) {
                    cb(new Error('nothing to see here'))
                }
            }
        }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'nothing to see here')
            done()
        })
    })

    function map(input, params, cb) {
        if (arguments.length === 1) return map(undefined, undefined, arguments[0])
        if (arguments.length === 2) return map(undefined, arguments[0], arguments[1])
        flow.run.fn({
            input: input || {},
            params: {
                task: transformation.map,
                params: params
            }
        }, cb)
    }
})