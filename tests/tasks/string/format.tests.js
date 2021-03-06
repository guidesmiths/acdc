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

    it('should require template parameter', function(done) {
        format([], {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "template" fails because ["template" is required]]')
            done()
        })
    })

    it('should require template to be a string', function(done) {
        format([], { template: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "template" fails because ["template" must be a string]]')
            done()
        })
    })

    it('should format the input', function(done) {
        format(['a', 1], { template: '%s/%d' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 'a/1')
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        format(undefined, { template: '%s' }, function(err, result) {
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