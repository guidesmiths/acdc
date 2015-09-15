var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var string = require('../../../lib/tasks/string')

describe('uppercase', function() {

    it('should require input to be a string', function(done) {
        uppercase(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a string]')
            done()
        })
    })

    it('should uppercase the input', function(done) {
        uppercase('hello world', {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, 'HELLO WORLD')
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        uppercase(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function uppercase(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: string.uppercase,
                params: params
            }
        }, cb)
    }
})