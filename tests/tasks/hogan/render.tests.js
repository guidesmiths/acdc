var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var hogan = require('../../../lib/tasks/hogan')

describe.only('hogan render', function() {

    it('should require input to be an object', function(done) {
        render('a', {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "input" fails because ["input" must be an object]')
            done()
        })
    })

    it('should require template parameter', function(done) {
        render({}, {}, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "template" fails because ["template" is required]]')
            done()
        })
    })

    it('should require template to be a string', function(done) {
        render({}, { template: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "template" fails because ["template" must be a string]]')
            done()
        })
    })

    it('should render the input', function(done) {
        render({a: 1}, { template: '{{a}}' }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, '1')
            done()
        })
    })

    it('should tolerate missing values', function(done) {
        render(undefined, { template: '{{a}}' }, function(err, result) {
            assert.ifError(err)
            assert.equal(result, undefined)
            done()
        })
    })

    function render(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: hogan.render,
                params: params
            }
        }, cb)
    }
})