var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var selectors = require('../../../lib/tasks/selectors')

describe('Get JSON Pointer', function() {

    it('should require input to be selectable', function(done) {
        getJsonPointer(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be an array, "input" must be an object]')
            done()
        })
    })

    it('should require path to be a string', function(done) {
        getJsonPointer({}, { path: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "path" fails because ["path" must be a string]]')
            done()
        })
    })

    it('should get the value specified by the path', function(done) {
        getJsonPointer({ a: [
            { b: 2 }
        ]} , { path: '/a/0/b' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 2)
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        getJsonPointer({}, { path: '/foo/3/bar' }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function getJsonPointer(input, params, cb) {
        if (arguments.length === 1) return getJsonPointer(undefined, undefined, arguments[0])
        if (arguments.length === 2) return getJsonPointer(undefined, arguments[0], arguments[1])
        flow.run.fn({
            input: input || {},
            params: {
                task: selectors.getJsonPointer,
                params: params
            }
        }, cb)
    }
})