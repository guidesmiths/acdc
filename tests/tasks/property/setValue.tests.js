var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var property = require('../../../lib/tasks/property')

describe('Property Set Value', function() {

    it('should require a value parameter', function(done) {
        setValue(undefined, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "value" fails because ["value" is required]]')
            done()
        })
    })

    it('should require the to path to be a string', function(done) {
        setValue(undefined, { value: 3, to: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "to" fails because ["to" must be a string]]')
            done()
        })
    })

    it('should set the value to the destination path', function(done) {
        setValue(undefined, { value: 3, to: 'x.y' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.x.y, 3)
            done()
        })
    })

    function setValue(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: property.setValue,
                params: params
            }
        }, cb)
    }
})