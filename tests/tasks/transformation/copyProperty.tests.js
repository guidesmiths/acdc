var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var transformation = require('../../../lib/tasks/transformation')

describe('CopyProperty', function() {

    it('should require a from path', function(done) {
        copyProperty({}, { from: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "from" fails because ["from" must be a string]]')
            done()
        })
    })

    it('should require a to parameter', function(done) {
        copyProperty({}, { from: 'a.b.c', to: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "to" fails because ["to" must be a string]]')
            done()
        })
    })

    it('should copy the value from the source path to the destination path', function(done) {
        copyProperty({ a: { b: 2 } }, { from: 'a.b', to: 'x.y' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.x.y, 2)
            done()
        })
    })

    function copyProperty(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: transformation.copyProperty,
                params: params
            }
        }, cb)
    }
})