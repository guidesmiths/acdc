var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var numeric = require('../../../lib/tasks/numeric')

describe('Parse Float', function() {

    it('should require input to be a numerical string or numeric', function(done) {
        parseFloat('x', {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a number]')
            done()
        })
    })

    it('should parse the string input into a float', function(done) {
        parseFloat('100.99', {}, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 100.99)
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        parseFloat(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function parseFloat(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: numeric.parseFloat,
                params: params
            }
        }, cb)
    }
})