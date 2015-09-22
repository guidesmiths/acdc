var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var string = require('../../../lib/tasks/string')

describe('format', function() {

    it('should require input to be an array', function(done) {
        format('a', {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be an array]')
            done()
        })
    })

    it('should require pattern parameter', function(done) {
        format([], {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "pattern" fails because ["pattern" is required]]')
            done()
        })
    })

    it('should require pattern to be a string', function(done) {
        format([], { pattern: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "pattern" fails because ["pattern" must be a string]]')
            done()
        })
    })

    it('should format the input', function(done) {
        format(['a', 1], { pattern: '%s/%d' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 'a/1')
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        format(undefined, { pattern: '%s' }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function format(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: string.format,
                params: params
            }
        }, cb)
    }
})