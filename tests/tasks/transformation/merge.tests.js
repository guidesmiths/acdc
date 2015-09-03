var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var transformation = require('../../../lib/tasks/transformation')

describe('merge', function() {

    it('should require input to be an array of objects', function(done) {
        merge([1], {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" at position 0 fails because ["0" must be an object]]')
            done()
        })
    })

    it('should merge arrays of objects', function(done) {
        merge([{ a: 1, b: 2, c: 3 }, { b: 'x', c: 'x', d: 4 }, { c: 'xx', e: 5 }], {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result.a, 1)
            assert.equal(result.b, 'x')
            assert.equal(result.c, 'xx')
            assert.equal(result.d, 4)
            assert.equal(result.e, 5)
            done()
        })
    })

    function merge(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: transformation.merge,
                params: params
            }
        }, cb)
    }
})