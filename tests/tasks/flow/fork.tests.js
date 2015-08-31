var assert = require('assert')
var flow = require('../../../lib/tasks/flow')

describe('Fork', function() {

    it('should require tasks', function(done) {
        fork(function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "tasks" fails because ["tasks" is required]]')
            done()
        })
    })

    it('should require iterable tasks', function(done) {
        fork({ tasks: 1 }, function(err) {
            assert.ok(err)
            assert.equal(err.message, 'child "params" fails because [child "tasks" fails because ["tasks" must be an array, "tasks" must be an object]]')
            done()
        })
    })

    it('should execute an array tasks in parallel', function(done) {
        var order = []
        fork({
            tasks: [
                {
                    task: {
                        fn: function one(ctx, cb) {
                            setImmediate(function() {
                                order.push(1)
                                cb()
                            })
                        }
                    }
                },
                {
                    task: {
                        fn: function two(ctx, cb) {
                            order.push(2)
                            cb()
                        }
                    }
                }
            ]
        }, function(err) {
            assert.ifError(err)
            assert.equal(order.length, 2)
            assert.equal(order[0], 2)
            assert.equal(order[1], 1)
            done()
        })
    })

    it('should execute a map tasks in parallel', function(done) {
        var order = []
        fork({
            tasks: {
                a: {
                    task: {
                        fn: function one(ctx, cb) {
                            setImmediate(function() {
                                order.push(1)
                                cb()
                            })
                        }
                    }
                },
                b: {
                    task: {
                        fn: function two(ctx, cb) {
                            order.push(2)
                            cb()
                        }
                    }
                }
            }
        }, function(err) {
            assert.ifError(err)
            assert.equal(order.length, 2)
            assert.equal(order[0], 2)
            assert.equal(order[1], 1)
            done()
        })
    })

    it('should pass the same input to each task', function(done) {
        fork(1, {
            tasks: {
                a: {
                    task: {
                        fn: function a(ctx, cb) {
                            cb(null, ctx.input + 1)
                        }
                    }
                },
                b: {
                    task: {
                        fn: function b(ctx, cb) {
                            cb(null, ctx.input + 2)
                        }
                    }
                }
            }
        }, function(err, result) {
            assert.ifError(err)
            assert.equal(result.a, 2)
            assert.equal(result.b, 3)
            done()
        })
    })

    it('should yield errors', function(done) {
        fork({
            tasks: [
                {
                    task: {
                        fn: function(ctx, cb) {
                            cb(new Error('nothing to see here'))
                        }
                    }
                }
            ]
        }, function(err, results) {
            assert.ok(err)
            assert.equal(err.message, 'nothing to see here')
            done()
        })
    })

    function fork(input, params, cb) {
        if (arguments.length === 1) return fork(undefined, undefined, arguments[0])
        if (arguments.length === 2) return fork(undefined, arguments[0], arguments[1])
        flow.run.fn({
            input: input || {},
            params: {
                task: flow.fork,
                params: params
            }
        }, cb)
    }
})