var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var string = require('../../../lib/tasks/string')

describe('split', function() {

    it('should require input to be a string', function(done) {
        split(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be a string]')
            done()
        })
    })

    it('should require pattern parameter', function(done) {
        split('a', {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "pattern" fails because ["pattern" is required]]')
            done()
        })
    })

    it('should require pattern to be a string or regex', function(done) {
        split('a', { pattern: new Array() }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "pattern" fails because ["pattern" must be a string, "pattern" must be an object]]')
            done()
        })
    })

    it('should split the input', function(done) {
        split('one, two, three', { pattern: /\s*,\s*/ }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.length, 3)
            assert.strictEqual(result[0], 'one')
            assert.strictEqual(result[1], 'two')
            assert.strictEqual(result[2], 'three')
            done()
        })
    })

    it('should split empty string', function(done) {
        split('', { pattern: /\s*,\s*/ }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.length, 1)
            assert.strictEqual(result[0], '')
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        split(undefined, { pattern: /\s*,\s*/ }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function split(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: string.split,
                params: params
            }
        }, cb)
    }
})
