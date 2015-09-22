var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var jsonPointer = require('../../../lib/tasks/jsonPointer')

describe('JSON Pointer Set', function() {

    it('should require path to be a string', function(done) {
        set({}, { path: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "path" fails because ["path" must be a string]]')
            done()
        })
    })

    it('should write the input value to the property specified by the path', function(done) {
        set(2, { path: '/a/0/b' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.a[0].b, 2)
            done()
        })
    })

    it('should write the specified value to the property specified by the path', function(done) {
        set(2, { path: '/a/0/b', value: 'x' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.a[0].b, 'x')
            done()
        })
    })

    function set(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: jsonPointer.set,
                params: params
            }
        }, cb)
    }
})