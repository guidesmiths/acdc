var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var jsonPointer = require('../../../lib/tasks/jsonPointer')
var string = require('../../../lib/tasks/string')
var uppercase = string.uppercase

describe('JSON Pointer Transform', function() {

    it('should require from path to be a string', function(done) {
        transform({}, { from: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "from" fails because ["from" must be a string]]')
            done()
        })
    })

    it('should require transformation to be a task', function(done) {
        transform({}, { from: '/a/b/c', transformer: { } }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "transformer" fails because [child "task" fails because ["task" is required]]]')
            done()
        })
    })

    it('should require to path to be a string', function(done) {
        transform({}, { from: '/a/b/c' , transformer: uppercase(), to: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "to" fails because ["to" must be a string]]')
            done()
        })
    })

    it('should transform the value from the source path to the destination path', function(done) {
        transform({ a: { b: 'oh yeah!' } }, { from: '/a/b', transformer: uppercase(), to: '/x/y' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.x.y, 'OH YEAH!')
            done()
        })
    })

    it('should transform the value from the source path to the destination path', function(done) {
        transform({ a: { b: 'oh yeah!' } }, { from: '/a/b', transformer: uppercase() }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result.a.b, 'OH YEAH!')
            done()
        })
    })

    function transform(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: jsonPointer.transform,
                params: params
            }
        }, cb)
    }
})