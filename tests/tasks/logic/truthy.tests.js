var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var logic = require('../../../lib/tasks/logic')

describe('Truthy', function() {

    it('should yield true when input is truthy', function(done) {
        truthy('ok', {}, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, true)
            done()
        })
    })

    it('should yield true when input is truthy', function(done) {
        truthy(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, false)
            done()
        })
    })

    function truthy(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: logic.truthy,
                params: params
            }
        }, cb)
    }
})