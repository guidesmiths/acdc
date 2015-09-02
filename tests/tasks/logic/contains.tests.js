var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var logic = require('../../../lib/tasks/logic')

describe('contains', function() {

    it('should require input to be an array param', function(done) {
        contains(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be an array]')
            done()
        })
    })

    it('should require a value param', function(done) {
        contains([], {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "value" fails because ["value" is required]]')
            done()
        })
    })

    it('should yield true when input contains value', function(done) {
        contains([0, 1, 3], { value: 1 }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, true)
            done()
        })
    })

    it('should yield false when input does not contain value', function(done) {
        contains([0, 2, 3], { value: 4 }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, false)
            done()
        })
    })

    function contains(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: logic.contains,
                params: params
            }
        }, cb)
    }
})