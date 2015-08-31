var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var selectors = require('../../../lib/tasks/selectors')

describe('Get Property', function() {

    it('should require input to be selectable', function(done) {
        getProperty(1, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be an array, "input" must be an object]')
            done()
        })
    })

    it('should require path to be a string', function(done) {
        getProperty({}, { path: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "path" fails because ["path" must be a string]]')
            done()
        })
    })

    it('should get the value specified by the path', function(done) {
        getProperty({ a: [
            { b: 2 }
        ]} , { path: 'a[0].b' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, 2)
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        getProperty({}, { path: 'foo.3.bar' }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function getProperty(input, params, cb) {
        if (arguments.length === 1) return getProperty(undefined, undefined, arguments[0])
        if (arguments.length === 2) return getProperty(undefined, arguments[0], arguments[1])
        flow.run.fn({
            input: input || {},
            params: {
                task: selectors.getProperty,
                params: params
            }
        }, cb)
    }
})