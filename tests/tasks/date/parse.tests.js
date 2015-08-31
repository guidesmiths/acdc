var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var date = require('../../../lib/tasks/date')

describe('Date Parse', function() {

    it('should require input to be a string', function(done) {
        parse(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a string]')
            done()
        })
    })

    it('should require format to be a string or function', function(done) {
        parse('x', { format: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "format" fails because ["format" must be a string, "format" must be a Function]]')
            done()
        })
    })

    it('should parse the input into a date using the default format', function(done) {
        parse('2015-07-15T16:12:00.000Z', {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result.toISOString(), '2015-07-15T16:12:00.000Z')
            done()
        })
    })

    it('should parse the input into a date using the specified format', function(done) {
        parse('2010-10-20 04:30', { format: 'YYYY-MM-DD HH:mm' }, function(err, result) {
            assert.ifError(err)
            assert.equal(result.toISOString(), '2010-10-20T03:30:00.000Z')
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

    it('should yield errors on invalid formats', function(done) {
        parse('not a date', {}, function(err, result) {
            assert.ok(err)
            assert.equal(err.message, 'Error parsing date: not a date')
            done()
        })
    })

    function parse(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: date.parse,
                params: params
            }
        }, cb)
    }
})