var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var string = require('../../../lib/tasks/string')

describe('lowercase', function() {

    it('should require input to be a string', function(done) {
        lowercase(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a string]')
            done()
        })
    })

    it('should lowercase the input', function(done) {
        lowercase('HELLO WORLD', {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, 'hello world')
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        lowercase(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function lowercase(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: string.lowercase,
                params: params
            }
        }, cb)
    }
})