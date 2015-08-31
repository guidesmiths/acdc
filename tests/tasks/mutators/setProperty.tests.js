var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var mutators = require('../../../lib/tasks/mutators')

describe('Set Property Pointer', function() {

    it('should require path to be a string', function(done) {
        setProperty({}, { path: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "path" fails because ["path" must be a string]]')
            done()
        })
    })

    it('should set the value specified by the path', function(done) {
        setProperty(2, { path: 'a[0].b' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.a[0].b, 2)
            done()
        })
    })

    function setProperty(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: mutators.setProperty,
                params: params
            }
        }, cb)
    }
})