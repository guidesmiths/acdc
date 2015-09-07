var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var property = require('../../../lib/tasks/property')

describe('Property Copy', function() {

    it('should require a from path', function(done) {
        copy({}, { from: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "from" fails because ["from" must be a string]]')
            done()
        })
    })

    it('should require a to path', function(done) {
        copy({}, { from: 'a.b.c', to: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "to" fails because ["to" must be a string]]')
            done()
        })
    })

    it('should copy the value from the source path to the destination path', function(done) {
        copy({ a: { b: 2 } }, { from: 'a.b', to: 'x.y' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.x.y, 2)
            done()
        })
    })

    it('should copy the whole document when the source path is empty', function(done) {
        copy({ a: { b: 2 } }, { from: '', to: 'x.y' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.x.y.a.b, 2)
            done()
        })
    })

    function copy(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: property.copy,
                params: params
            }
        }, cb)
    }
})