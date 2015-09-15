var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var string = require('../../../lib/tasks/string')

describe('str', function() {

    it('should convert the input to a string', function(done) {
        str(1, {}, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, '1')
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        str(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function str(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: string.str,
                params: params
            }
        }, cb)
    }
})