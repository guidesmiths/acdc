var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var property = require('../../../lib/tasks/property')

describe('Property Set', function() {

    it('should require path to be a string', function(done) {
        set({}, { path: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "path" fails because ["path" must be a string]]')
            done()
        })
    })

    it('should set the value specified by the path', function(done) {
        set(2, { path: 'a[0].b' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.a[0].b, 2)
            done()
        })
    })

    function set(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: property.set,
                params: params
            }
        }, cb)
    }
})