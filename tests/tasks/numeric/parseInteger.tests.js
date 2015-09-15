var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var numeric = require('../../../lib/tasks/numeric')

describe('Parse Integer', function() {

    it('should require input to be a numerical string or numeric', function(done) {
        parseInteger('x', {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a number]')
            done()
        })
    })

    it('should require input to be a numerical string or numeric 2', function(done) {
        parseInteger('1.1', {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be an integer]')
            done()
        })
    })

    it('should require radix to be a numeric', function(done) {
        parseInteger('100', { radix: 'x' }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "radix" fails because ["radix" must be a number]]')
            done()
        })
    })

    it('should parse the string input into a numeric using the default radix', function(done) {
        parseInteger('100', {}, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 100)
            done()
        })
    })

    it('should parse the numeric input into a numeric using the default radix', function(done) {
        parseInteger(100, {}, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 100)
            done()
        })
    })


    it('should parse the string input into a numeric using a custom radix', function(done) {
        parseInteger('110', { radix: 2 }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 6)
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        parseInteger(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function parseInteger(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: numeric.parseInteger,
                params: params
            }
        }, cb)
    }
})