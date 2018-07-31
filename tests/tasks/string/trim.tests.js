var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var string = require('../../../lib/tasks/string')

describe('trim', function() {

    it('should require input to be a string', function(done) {
        trim(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a string]')
            done()
        })
    })

    it('should trim the input', function(done) {
        trim(' hello world ', {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, 'hello world')
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        trim(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function trim(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: string.trim,
                params: params
            }
        }, cb)
    }
})
