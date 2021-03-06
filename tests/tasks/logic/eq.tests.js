var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var logic = require('../../../lib/tasks/logic')

describe('eq', function() {

    it('should require a value param', function(done) {
        eq(undefined, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "value" fails because ["value" is required]]')
            done()
        })
    })

    it('should yield true when input is strictly equal to value', function(done) {
        eq(1, { value: 1 }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, true)
            done()
        })
    })

    it('should yield false when input is not strictly equal to value', function(done) {
        eq(1, { value: '1' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, false)
            done()
        })
    })

    function eq(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: logic.eq,
                params: params
            }
        }, cb)
    }
})