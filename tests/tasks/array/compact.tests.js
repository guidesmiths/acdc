var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var array = require('../../../lib/tasks/array')

describe('compact', function() {

    it('should require input to be an array', function(done) {
        compact(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be an array]')
            done()
        })
    })

    it('should compact arrays', function(done) {
        compact([0, 1, null, 'foo', undefined], {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result.length, 3)
            assert.equal(result[0], 0)
            assert.equal(result[1], 1)
            assert.equal(result[2], 'foo')
            done()
        })
    })

    function compact(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: array.compact,
                params: params
            }
        }, cb)
    }
})