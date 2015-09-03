var assert = require('assert')
var flow = require('../../../lib/tasks/flow')

describe('Yield', function() {

    it('should yield undefined when no value is set', function(done) {
        yield(undefined, {}, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, undefined)
            done()
        })
    })

    it('should yield value when set', function(done) {
        yield(undefined, { value: 'oh yeah!' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 'oh yeah!')
            done()
        })
    })

    it('should ignore input', function(done) {
        yield('oh no!', { value: 'oh yeah!' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 'oh yeah!')
            done()
        })
    })

    function yield(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: flow.yield,
                params: params
            }
        }, cb)
    }
})