var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var date = require('../../../lib/tasks/date')

describe('Date Format', function() {

    it('should require input to be a date, number or date string', function(done) {
        format('xxx', {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a number of milliseconds or valid date string]')
            done()
        })
    })

    it('should require format to be a string or function', function(done) {
        format(1, { format: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "format" fails because ["format" must be a string]]')
            done()
        })
    })

    it('should format the input using the default format', function(done) {
        format(new Date('2015-07-15T16:12:00.000Z'), {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, '2015-07-15T16:12:00.000Z')
            done()
        })
    })

    it('should format the input using the specified format', function(done) {
        format(new Date('2015-07-15T16:12:00.000Z'), { format: 'YYYY-MM-DD HH:mm' }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, '2015-07-15 17:12')
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        format(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    it('should yield errors on invalid formats', function(done) {
        format('not a date', {}, function(err, result) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a number of milliseconds or valid date string]')
            done()
        })
    })

    function format(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: date.format,
                params: params
            }
        }, cb)
    }
})