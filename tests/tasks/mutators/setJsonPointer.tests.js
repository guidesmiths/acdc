var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var mutators = require('../../../lib/tasks/mutators')

describe('Set JSON Pointer', function() {

    it('should require path to be a string', function(done) {
        setJsonPointer({}, { path: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "path" fails because ["path" must be a string]]')
            done()
        })
    })

    it('should set the value specified by the path', function(done) {
        setJsonPointer(2, { path: '/a/0/b' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.a[0].b, 2)
            done()
        })
    })

    function setJsonPointer(input, params, cb) {
        if (arguments.length === 1) return setJsonPointer(undefined, undefined, arguments[0])
        if (arguments.length === 2) return setJsonPointer(undefined, arguments[0], arguments[1])
        flow.run.fn({
            input: input || {},
            params: {
                task: mutators.setJsonPointer,
                params: params
            }
        }, cb)
    }
})