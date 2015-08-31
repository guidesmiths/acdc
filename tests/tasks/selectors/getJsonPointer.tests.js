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

    it('should get a copy of the value specified by the path', function(done) {
        var input = {
            a: [
                { b: 2 }
            ]
        }
        getJsonPointer(input , { path: '/a/0' }, function(err, result) {
            assert.ifError(err)
            assert.deepEqual(result, { b: 2 })
            assert.equal(result === input.a[0], false)
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
        flow.run.fn(input, {
            params: {
                task: selectors.getJsonPointer,
                params: params
            }
        }, cb)
    }
})