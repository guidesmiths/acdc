var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var logic = require('../../../lib/tasks/logic')

describe('falsey', function() {

    it('should yield true when input is falsey', function(done) {
        falsey(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, true)
            done()
        })
    })

    it('should yield true when input is truthy', function(done) {
        falsey('ok', {}, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, false)
            done()
        })
    })

    function falsey(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: logic.falsey,
                params: params
            }
        }, cb)
    }
})