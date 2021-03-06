var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var date = require('../../../lib/tasks/date')

describe('Date Format', function() {

    it('should require input to be a date, number or date string', function(done) {
        formatDate('xxx', {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a number of milliseconds or valid date string]')
            done()
        })
    })

    it('should require format to be a string or function', function(done) {
        formatDate(1, { format: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "format" fails because ["format" must be a string]]')
            done()
        })
    })

    it('should format the input using the default format', function(done) {
        formatDate(new Date('2015-07-15T16:12:00.000Z'), {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, '2015-07-15T16:12:00.000Z')
            done()
        })
    })

    it('should format the input using the specified format', function(done) {
        formatDate(new Date('2015-02-15T16:12:00.000Z'), { format: 'YYYY-MM-DD HH:mm' }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, '2015-02-15 16:12')
            done()
        })
    })

    it('should format the input using the specified format and timezone', function(done) {
        formatDate(new Date('2015-07-15T16:12:00.000Z'), { format: 'YYYY-MM-DD HH:mm', 'timezone': 'America/Los_Angeles' }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, '2015-07-15 09:12')
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        formatDate(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    it('should yield errors on invalid formats', function(done) {
        formatDate('not a date', {}, function(err, result) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a number of milliseconds or valid date string]')
            done()
        })
    })

    function formatDate(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: date.formatDate,
                params: params
            }
        }, cb)
    }
})