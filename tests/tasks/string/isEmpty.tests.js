var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var string = require('../../../lib/tasks/string')

describe('isEmpty', function() {

    it('should require input to be a string', function(done) {
        isEmpty(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a string]')
            done()
        })
    })

    it('should return true when input is empty', function(done) {
        isEmpty('', {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, true)
            done()
        })
    })

    it('should return false when input is not empty', function(done) {
        isEmpty(' ', {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, false)
            done()
        })
    })

    function isEmpty(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: string.isEmpty,
                params: params
            }
        }, cb)
    }
})