var assert = require('assert')
var flow = require('../../../lib/tasks/flow')
var logic = require('../../../lib/tasks/logic')

describe('Or', function() {

    it('should require tasks param to be an array', function(done) {
        or(undefined, { tasks: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "tasks" fails because ["tasks" must be an array]]')
            done()
        })
    })

    it('should yield true if any task yield a truthy value', function(done) {
        or('foo', {
            tasks: [
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, false)
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, 0)
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, input === 'foo')
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, undefined)
                        }
                    }
                }
            ]
        }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, true)
            done()
        })
    })

    it('should yield false if no task yields a falsey value', function(done) {
        or('foo', {
            tasks: [
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, input === 'bar')
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, false)
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, 0)
                        }
                    }
                },
                {
                    task: {
                        fn: function task(input, ctx, cb) {
                            cb(null, undefined)
                        }
                    }
                }
            ]
        }, function(err, result) {
            assert.ifError(err)
            assert.strictEqual(result, false)
            done()
        })
    })

    function or(input, params, cb) {
        flow.run.fn(input, {
            params: {
                task: logic.or,
                params: params
            }
        }, cb)
    }
})
