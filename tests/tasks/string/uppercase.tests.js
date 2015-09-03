var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var string = require('../../../lib/tasks/string')

describe('uppercase', function() {

    it('should require input to be a string', function(done) {
        parse(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a string]')
            done()
        })
    })

    it('should uppercase the input', function(done) {
        parse('hello world', {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, 'HELLO WORLD')
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        parse(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function parse(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: string.uppercase,
                params: params
            }
        }, cb)
    }
})