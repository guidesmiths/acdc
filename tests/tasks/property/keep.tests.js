var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var property = require('../../../lib/tasks/property')

describe('Property Keep', function() {

    it('should require path to be a string', function(done) {
        keep({}, { path: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "path" fails because ["path" must be a string]]')
            done()
        })
    })

    it('should keep the value specified by the path', function(done) {
        keep({ a: { b: 2 } }, { path: 'a.b' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.a.b, 2)
            done()
        })
    })

    it('should keep the whole document when the path is empty', function(done) {
        keep({ a: { b: 2 } }, { path: '' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.a.b, 2)
            done()
        })
    })

    function keep(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: property.keep,
                params: params
            }
        }, cb)
    }
})