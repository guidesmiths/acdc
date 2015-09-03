var assert = require('assert')
var flow = require('../../../lib/tasks/flow')

describe('Output', function() {

    it('should yield undefined when no value is set', function(done) {
        output(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, undefined)
            done()
        })
    })

    it('should yield value when set', function(done) {
        output(undefined, { value: 'oh yeah!' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 'oh yeah!')
            done()
        })
    })

    it('should ignore input', function(done) {
        output('oh no!', { value: 'oh yeah!' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 'oh yeah!')
            done()
        })
    })

    function output(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: flow.output,
                params: params
            }
        }, cb)
    }
})